import { getUserId, getDailyHabits, createUserHabit } from '../models/aTuneModels.js';
import pool from '../models/aTuneModels.js';

//middleware to get habit list after passing user id in query parameters
export const getHabits = async (req, res, next) => {
  try {
    //console.log('getHabits middleware executing');
    // console.log(req.query, 'gethabits middleware');
    const { name } = req.query;
    if (!name) {
      return next({
        log: 'user error, id was not sp[ecified',
        status: 400,
        message: 'you must specify the user_id param',
      });
    }
    //console.log(id);
    const sqlString = `SELECT hp.*, u.name, gh.genre_names FROM habit_preference hp
    JOIN _user u ON hp.user_id=u._id
    JOIN genres_of_habit gh ON gh._id=hp.genres_of_habit_id
    WHERE u.name=$1`;
    const values = [name];
    //console.log('starting pool query');
    const data = await pool.query(sqlString, values);
    //console.log('finished pool query');
    // console.log(data);
    // console.log(data.rows);
    res.locals.habitlist = { habits: data.rows };
    return next();
  } catch {
    (error) =>
      next({
        log: 'error in getHabits middleware' + error,
        message: 'unable to retrieve habits',
        status: 500,
      });
  }
};
export const userId = async (req, _res, next) => {
  // console.log({ req });
  try {
    // const dailyHabits = await aTuneModels.getDailyHabits(); // call model to fetch dailyHabits from Supabase
    // req.dailyHabits = dailyHabits;
    const name = req.query.userName;
    console.log({ name });
    const getUserIdResult = await getUserId(name);
    console.log({ getUserIdResult });
    req.userId = getUserIdResult;
    return next();
  } catch (error) {
    console.error('Error with aTuneController.userId:', error);
    return next({
      log: `Error in aTuneController.userId middleware. Error: ${error.message}`,
      status: 500,
      message: {
        err: 'An error occurred while fetching user id from Supabase',
      },
    });
  }
};

/*
 * Middleware to get daily habits via Supabase using the userId query parameter
 */
export const getDaily = async (req, _res, next) => {
  try {
    const id = req.query.userId;
    const dailyHabits = await getDailyHabits(id); // call model to fetch dailyHabits from Supabase

    req.dailyHabits = dailyHabits;
    return next();
  } catch (error) {
    console.error('Error with aTuneController.getDaily:', error);
    return next({
      log: `Error in aTuneController.getDaily middleware. Error: ${error.message}`,
      status: 500,
      message: {
        err: 'An error occurred while fetching daily habits from Supabase',
      },
    });
  }
};

/*
 * Middleware to create a daily habit via Supabase
 */
export const addNewHabit = async (req, res, next) => {
  let { name, habit_name, seed_genres, target_energy, target_danceability, target_valence } = req.query;
  //console.log(req.query);

  if (!name || !habit_name || !seed_genres || !target_energy || !target_danceability || !target_valence) {
    return next({
      log: `user error, user did not specify all of the needed query params.`,
      status: 400,
      message: {
        err: `you must specify all the query params: name, habit_name, seed_genres, target_energy, target_danceability, target_valence 
        you specified ${name} & ${habit_name} & ${seed_genres} & ${target_energy} & ${target_danceability} & ${target_valence}`,
      },
    });
  }

  try {
    let genres = seed_genres.split(',');

    const createdHabit = await createUserHabit({ name, habit_name, genres, target_energy, target_danceability, target_valence }); // give it to them as an object
    res.locals.queryResults = createdHabit;
    next();
  } catch (error) {
    console.error('Error with aTuneController.addNewHabit:', error);
    return next({
      log: `Error in aTuneController.getDaily middleware. Error: ${error.message}`,
      status: 500,
      message: {
        err: 'An error occurred while posting daily habits to Supabase',
      },
    });
  }
};
