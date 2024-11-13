import { getUserId, getDailyHabits, makeDailyHabits } from '../models/aTuneModels.js';


/*
* Middleware to get userId via Supabase using the name query parameter
*/
export const userId = async (req, res, next) => {
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
export const getDaily = async (req, res, next) => {
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
  try {
    const newHabit = await makeDailyHabits(); // call model to fetch dailyHabits from Supabase
    req.newHabit = newHabit;
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

