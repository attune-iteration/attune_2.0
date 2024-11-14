import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';
dotenv.config();

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

const fetchSong = async (req, res, next) => {
  // Read parameters from request query
  const { seed_genres, target_energy, target_danceability, target_valence, limit } = req.query;

  // Validate that required parameters are provided
  if (!seed_genres || !target_energy || !target_valence || !target_danceability || !limit) {
    return next({
      log: 'Missing required parameters: seed_genres, target_energy, target_valence, target_danceability',
      status: 400,
      message: { err: 'Missing required parameters: seed_genres, target_energy, target_valence, target_danceability' },
    });
  }

  // convert the seed_genres to a comma-separated string
  const genres = typeof seed_genres === 'string' ? seed_genres.split(',') : seed_genres;

  try {
    // Fetch a single song recommendation
    const response = await spotifyApi.getRecommendations({
      seed_genres: genres, // Pass the array of genres
      target_valence: parseFloat(target_valence), // Parse valence to a number
      target_danceability: parseFloat(target_danceability), // Parse danceability to a number
      limit: limit, // Limit the number of recommendations!
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

    // res.json({ recommendations });
    res.locals.recommendations = recommendations;
    return next();
  } catch (err) {
    console.error('Error fetching recommendations:', err);
    return next({
      log: 'Error fetching recommendations',
      status: 500,
      message: { err: 'Failed to fetch song recommendations' },
    });
  }
};

export { getAccessToken, fetchSong };
