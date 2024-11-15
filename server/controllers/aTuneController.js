import { /*getUserId,*/ getDailyHabits, createUserHabit } from '../models/aTuneModels.js';
import pool from '../models/aTuneModels.js';

//middleware to get habit list after passing user id in query parameters
export const getHabits = async (req, res, next) => {
  try {
    //console.log('getHabits middleware executing');
    // console.log(req.query, 'gethabits middleware');

    // unused as of 11/14/2024, 13:43
    /****  const { name } = req.query; ****/

    // -v-v-
    const name = res.locals.username;
    console.log(`user logged in as ${name}`);
    if (!name) {
      return next({
        log: 'server error, somehow we got to aTuneController.getHabits but we had not called setLocalsFromSSID',
        status: 500,
        message: 'Internal server error, code :9016',
      });
    }
    //console.log(id);
    const sqlString = `SELECT hp.*, u.name, gh.genre_names AS seed_genres FROM habit_preference hp
    JOIN _user as u ON hp.user_id=u._id
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

// commented-out as of 11/14/2024 13:54
// reason: this code is unused
// export const userId = async (req, _res, next) => {
//   // console.log({ req });
//   try {
//     // const dailyHabits = await aTuneModels.getDailyHabits(); // call model to fetch dailyHabits from Supabase
//     // req.dailyHabits = dailyHabits;
//     const name = req.query.userName;
//     console.log({ name });
//     const getUserIdResult = await getUserId(name);
//     console.log({ getUserIdResult });
//     req.userId = getUserIdResult;
//     return next();
//   } catch (error) {
//     console.error('Error with aTuneController.userId:', error);
//     return next({
//       log: `Error in aTuneController.userId middleware. Error: ${error.message}`,
//       status: 500,
//       message: {
//         err: 'An error occurred while fetching user id from Supabase',
//       },
//     });
//   }
// };

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
  let { /*name,*/ habit_name, seed_genres, target_energy, target_danceability, target_valence } = req.query;
  //console.log(req.query);

  // as of 11-14-2024 14:07 name is no longer a query param and instead is infered from ssidATTUNE coookie
  if (/*!name ||*/ !habit_name || !seed_genres || !target_energy || !target_danceability || !target_valence) {
    return next({
      log: `user error, user did not specify all of the needed query params.`,
      status: 400,
      message: {
        err: `you must specify all the query params: habit_name, seed_genres, target_energy, target_danceability, target_valence 
        you specified ${habit_name} & ${seed_genres} & ${target_energy} & ${target_danceability} & ${target_valence}`,
      },
    });
  }

  // now we set name based off of res.locals.username
  let name = res.locals.username;
  if (!name) {
    return next({
      log: `dev error, somehow we got to atunecontroler.addNewHabit withought setting res.locals.username`,
      status: 500,
      message: {
        err: `Internal server error, tell the devs, code: 9116`,
      },
    });
  }

  try {
    let genres = seed_genres.split(',');
    console.log(name);
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
