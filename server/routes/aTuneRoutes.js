import { Router } from 'express';
import { getHabits, addNewHabit } from '../controllers/aTuneController.js';
import { getAccessToken, fetchSong } from '../controllers/spotifyController.js';
import { createAccount, logInUser } from '../controllers/authentificationController.js';
import { createSessionFromLocals, setLocalsFromCookieSession } from '../controllers/sessionController.js';
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
router.get('/habits/all', setLocalsFromCookieSession, getHabits, (_req, res) => {
  console.log('got right back to get');
  return res.status(200).json(res.locals.habitlist);
});

/*
 * A route for getting a single song from the database
 */
// required, query params with the seperate formula values that are associated witht this habit
router.get('/spotify_recommendations', setLocalsFromCookieSession, getAccessToken, fetchSong, (_req, res) => {
  const recommendations = res.locals.recommendations;
  return res.status(200).json({ recommendations });
});

/*
 * A route for creating a new habit to db
 * expects all the correct parameters form the user as query params, such as
 * user_id
 */

router.post('/habits', setLocalsFromCookieSession, addNewHabit, (req, res) => {
  return res.status(200).json({ message: 'ok, your habit was created, (if you need to debug, ask the devs if the db has a user entry for your username?)' });
});

router.post('/ask_ai', setLocalsFromCookieSession, askAIForSongParameters);

router.post('/signup', createAccount, createSessionFromLocals, (req, res, next) => {
  //  res.cookie('ssidATTUNE', 'hi', { httpOnly: true, sameSite: 'None' });

  res.status(200).json({ message: 'ok, account was created', succesful: true });
});
router.post('/login', logInUser, createSessionFromLocals, (req, res, next) => {
  res.status(200).json({ message: 'ok, you logged in', succesful: true, username: res.locals.username });
});

router.get('/', (req, res) => {
  return res.status(404).json({ message: 'This route is not legal', err: 'illegal route specified' });
});

export default router;
