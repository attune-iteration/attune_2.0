/* eslint-disable no-undef */
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv'; // for loading environment variables
import pg from 'pg';
const { Pool } = pg;

dotenv.config(); // ensure the environment variables are loaded

const supabaseUrl = process.env.SUPABASE_URL; // eslint-disable-line no-undef
const supabaseKey = process.env.SUPABASE_API_ANON_KEY; // eslint-disable-line no-undef
const supabaseUri = process.env.SUPABASE_URI; // eslint-disable-line no-undef

if (!supabaseUrl || !supabaseKey || !supabaseUri) {
  throw new Error('Supabase URL and key are required and supabase uri (in .env)');
}

const supabase = createClient(supabaseUrl, supabaseKey); // create Supabase client instance to interact with Supabase proj
const pool = new Pool({
  connectionString: supabaseUri,
});

// module.exports = {
//   query: (text, params, callback) => {
//     return pool.query(text, params, callback);
//   },
// };

export default pool;
// pool.query everywhere

/*
 * A function to get users via querying Supabase and select a user by ID
 */
export const getUserId = async (userName) => {
  // fetch daily mood from Supabase
  console.log({ userName });
  try {
    const users = await supabase.from('Users').select('*');
    console.log({ users });
    const { data, error } = await supabase // query Supabase, </user_id> Replace <user_id> with the actual user's ID
      .from('Users') // from Users table
      .select('id') // selecting the habits column
      .eq('name', userName); // filtered by user_id
    console.log({ data });
    if (error) throw error;
    return data; // return fetched data
  } catch (error) {
    console.error('Error fetching daily habits: ', error);
    throw error;
  }
};

/*
 * A function to get users via querying supabase and get habits by user ID
 */
export const getDailyHabits = async (user_id) => {
  // fetch daily habits from Supabase
  try {
    const { data, error } = await supabase // query Supabase, </user_id> Replace <user_id> with the actual user's ID
      .from('Users') // from Users table
      .select('habits') // selecting the habits column
      .eq('id', user_id); // filtered by user_id
    if (error) throw error;
    return data; // return fetched data
  } catch (error) {
    console.error('Error fetching daily habits: ', error);
    throw error;
  }
};

/*
 * A function to create a new habit
 */
export const createUserHabit = async (inputInfo) => {
  // fetch daily habits from Supabase
  try {
    // const { data: existingData, error: fetchError } = await supabase // query Supabase, </user_id> Replace <user_id> with the actual user's ID
    //   .from('Users') // from Users table
    //   .select('habits') // selecting the habits column
    //   .eq('id', user_id) // filtered by user_id
    //   .single(); //gets one object -- don't know if we need

    // if (fetchError) throw fetchError;

    // const currentHabits = existingData.habits || []; //get existing habits
    // const updatedHabits = currentHabits.concat(newHabit);

    //update data
    console.log('Creating a new habit in our server...');
    let queryString1 = `
              BEGIN;
      `;
    pool.query(queryString1);

    let queryString2 = `
     WITH newGenres AS (
                                  INSERT INTO public.genres_of_habit (genre_names)
                                  VALUES ($1)    -- '["rock", "classical"]'::json
                                  RETURNING _id
    )
    -- the above happens even if a user is not present because it does not error out if no user present...


    INSERT INTO public.habit_preference (
    target_danceability,
    target_energy,
    target_valence,
    habit_name,
    user_id,
    genres_of_habit_id
    )
    -- now we need the values, but instead we should select 

    -- the below are working as the dollars turn into literal values

    SELECT $2, $3, $4, $5, nu._id AS user_id, ng._id AS genres_of_habit_id FROM public._user nu 
     --OUTER JOIN newGenres ng;
     LEFT JOIN newGenres ng ON true WHERE nu.name=$6 
     AND nu._id IS NOT NULL;

-- SELECT * from public._user;
-- SELECT * from public.genres_of_habit;
-- SELECT * FROM public.habit_preference;

    `;
    let queryVariables = [JSON.stringify(inputInfo.genres), inputInfo.target_danceability, inputInfo.target_energy, inputInfo.target_valence, inputInfo.habit_name, inputInfo.name];
    pool.query(queryString2, queryVariables);

    let queryString3 = `
    COMMIT;
    `;

    console.log('Habit created...');
    pool.query(queryString3);

    // if (error) throw error;
    //return data; // return fetched data
    return 'habit creation succesfull';
  } catch (error) {
    console.error('Error updating daily habits: ', error);
    throw error;
  }
};
