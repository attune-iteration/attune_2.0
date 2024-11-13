import { Router } from 'express';
import { getHabits, addNewHabit } from '../controllers/aTuneController.js';
import { getAccessToken, fetchSong } from '../controllers/spotifyController.js';
import askAIForSongParameters from '../controllers/aiController.js';
const router = Router();

/*
 * A route for getting userId
 */
// router.get('/userId', userId, (req, res) => {
//   return res.status(200).json({ userId: req.userId });
// });

/*
 * A route for getting all habits, NOT-songs
 */
//create middleware for grabbing the user id from the query parameters
//and grabbing a list of habits associated with that id
//return the response as a json object: "habits": [{habit_name, seed_genres, target_energy,
//target_danceability, target_valence }]
//middleware: aTuneController.getHabits
router.get('/habits/all', getHabits, (req, res) => {
  console.log('got right back to get');
  return res.status(200).send(res.locals.habitlist);
});

/*
 * A route for getting a single song from the database
 */
// required, query params with the seperate formula values that are associated witht this habit
router.get('/spotify_recommendations', getAccessToken, fetchSong, (req, res) => {
  const recommendations = res.locals.recommendations;
  return res.status(200).json({ recommendations });
});

/*
 * A route for creating a new habit to db
 * expects all the correct parameters form the user as query params, such as
 * user_id
 */
router.post('/habits', addNewHabit, (req, res) => {
  return res.status(200).send('ok, your habit was created.');
});

router.post('/ask_ai', askAIForSongParameters);

router.get('/', (req, res) => {
  return res.status(200).send('hi, this is the api endpoint for aTune');
});

export default router;
