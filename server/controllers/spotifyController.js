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
  const {
    seed_genres,
    target_energy,
    target_danceability,
    target_valence,
    limit,
  } = req.query;

  console.log('Received parameters:', {
    seed_genres,
    target_energy,
    target_danceability,
    target_valence,
    limit,
  });

  if (
    !seed_genres ||
    !target_energy ||
    !target_valence ||
    !target_danceability ||
    !limit
  ) {
    return next({
      log: `Missing required parameters. Received: ${JSON.stringify(req.query)}`,
      status: 400,
      message: { err: 'Missing required parameters' },
    });
  }

  try {
    const genres =
      typeof seed_genres === 'string' ? seed_genres.split(',') : seed_genres;
    console.log('Processed genres:', genres);

    try {
      const recommendations = await spotifyApi.getRecommendations({
        seed_genres: genres,
        target_valence: parseFloat(target_valence),
        target_energy: parseFloat(target_energy),
        target_danceability: parseFloat(target_danceability),
        limit: 1,
      });

      if (
        !recommendations.body.tracks ||
        recommendations.body.tracks.length === 0
      ) {
        throw new Error('No tracks found for the given parameters');
      }

      // Send the recommended track as JSON response
      // we are grabbing the smallest image, but could grab a bigger one, biggest being at images[0]
      const recommendationsList = recommendations.body.tracks.map((track) => ({
        name: track.name,
        artist: track.artists[0].name,
        uri: track.uri,
        artwork: track.album.images[track.album.images.length - 1]?.url, // Gets the smallest image URL
      }));

      res.locals.recommendations = recommendationsList;
      return next();
    } catch (spotifyError) {
      if (spotifyError.statusCode === 429) {
        const retryAfter = parseInt(spotifyError.headers['retry-after']) || 10;
        console.log(`Rate limited. Retry after ${retryAfter} seconds`);
        return next({
          log: 'Rate limit exceeded',
          status: 429,
          message: {
            err: 'Too many requests to Spotify API',
            retryAfter: retryAfter,
          },
        });
      }

      throw spotifyError;
    }
  } catch (err) {
    return next({
      log: `Error fetching recommendations: ${err.message}`,
      status: err.statusCode || 500,
      message: {
        err: 'Failed to fetch song recommendations',
        details: err.message,
      },
    });
  }
};

export { getAccessToken, fetchSong };
