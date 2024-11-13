import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv'; // for loading environment variables

dotenv.config(); // ensure the environment variables are loaded

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and key are required');
}

const supabase = createClient(supabaseUrl, supabaseKey); // create Supabase client instance to interact with Supabase proj

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
 * A function to create a new habit and update habit list via Supabase
 */
export const makeDailyHabits = async (user_id, newHabit) => {
  // fetch daily habits from Supabase
  try {
    const { data: existingData, error: fetchError } = await supabase // query Supabase, </user_id> Replace <user_id> with the actual user's ID
      .from('Users') // from Users table
      .select('habits') // selecting the habits column
      .eq('id', user_id) // filtered by user_id
      .single(); //gets one object -- don't know if we need

    if (fetchError) throw fetchError;

    const currentHabits = existingData.habits || []; //get existing habits
    const updatedHabits = currentHabits.concat(newHabit);

    //update data
    const { data, error } = await supabase
      .from('Users') // from Users table
      .update({ habits: updatedHabits }) // selecting the habits column to new updated array
      .eq('id', user_id); // filtered by user_id

    if (error) throw error;
    return data; // return fetched data
  } catch (error) {
    console.error('Error updating daily habits: ', error);
    throw error;
  }
};

