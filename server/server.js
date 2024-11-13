// server.js
import express, { json } from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import cors from 'cors';
import aTuneRoutes from './routes/aTuneRoutes.js';
const app = express();
app.use(cors());
app.use(json());

// Initialize Spotify API with credentials
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  //redirectUri: 'http://localhost:3000/api/callback', // Adjust to your frontend URL
});

let cachedToken = null;
let tokenExpiryTime = null;

// Endpoint to get access token using client credentials flow
const getAccessToken = async (req, res, next) => {
  if (cachedToken && Date.now() < tokenExpiryTime) {
    spotifyApi.setAccessToken(cachedToken);
    return next();
  }

  try {
    const data = await spotifyApi.clientCredentialsGrant();
    cachedToken = data.body['access_token'];
    tokenExpiryTime = Date.now() + data.body['expires_in'] * 1000;
    spotifyApi.setAccessToken(cachedToken);
    next();
  } catch (err) {
    console.error('Error retrieving access token:', err);
    res.status(500).json({ error: 'Failed to authenticate with Spotify API' });
  }
};

app.use('/api', aTuneRoutes); // /api/dayview will be routed to the associated handler in aTuneRoutes

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err); // Merge default error with provided error
  console.log(errorObj.log); // Log the error
  return res.status(errorObj.status).json(errorObj.message); // Return the error to the client
});

// Route to get a single song recommendation without default values
app.get('/recommendations', getAccessToken, async (req, res) => {
  // Read parameters from request query
  const { seed_genres, target_valence, target_danceability } = req.query;

  // Validate that required parameters are provided
  if (!seed_genres || !target_valence || !target_danceability) {
    return res.status(400).json({
      error:
        'Missing required parameters: seed_genres, target_valence, target_danceability',
    });
  }

  const genres =
    typeof seed_genres === 'string' ? seed_genres.split(',') : seed_genres;

  try {
    // Fetch a single song recommendation
    const response = await spotifyApi.getRecommendations({
      seed_genres: genres, // Pass the array of genres
      target_valence: parseFloat(target_valence), // Parse valence to a number
      target_danceability: parseFloat(target_danceability), // Parse danceability to a number
      limit: 1, // Limit to 1 recommendation
    });

    console.log(response);

    // Send the recommended track as JSON response
    // we are grabbing the smallest image, but could grab a bigger one, biggest being at images[0]
    const recommendations = response.body.tracks.map((track) => ({
      name: track.name,
      artist: track.artists[0].name,
      uri: track.uri,
      artwork: track.album.images[track.album.images.length - 1]?.url, // Gets the smallest image URL
    }));

    res.json({ recommendations });
  } catch (err) {
    console.error('Error fetching recommendations:', err);
    res.status(500).json({ error: 'Failed to fetch song recommendations' });
  }
});

const PORT = 5001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
