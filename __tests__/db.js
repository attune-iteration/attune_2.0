//uses unit tests to test the DB

import pool, { createUserHabit } from '../server/models/aTuneModels';
import { createClient } from '@supabase/supabase-js';
// import { checkTableExists, createHabitPreferenceTable } from '../server/controllers/initializeDatabase';

//creates a mock of the supabase client and the from method for inserting data
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn().mockReturnValue({
    from: jest.fn().mockReturnThis(),
    insert: jest.fn(),
  }),
}));

describe('database unit tests', () => {
  //mock input info
  const inputInfo = {
    genres: 'rock,classic,acoustic',
    target_danceability: '0.6',
    target_energy: '0.3',
    target_valence: '0.5',
    habit_name: 'TESTING new habit',
    name: 'default_user',
  };

  // beforeEach(() => {
  //   mockInsert = createClient().from().insert;
  // });

  it('createUserHabit returns response upon successful creation of habit', async () => {
    const result = await createUserHabit(inputInfo);
    console.log(result);
    expect(result).not.toBeInstanceOf(Error);
    expect(result).toBe('habit creation succesfull');
  });

  it('checks DB for seeing whether a new habit created', async () => {
    const queryString = `SELECT EXISTS (SELECT habit_name FROM habit_preference WHERE habit_name=$1)`;
    const value = [inputInfo.habit_name];
    const result = await pool.query(queryString, value);
    const data = await result.json();
    expect(data).toHave(inputInfo.habit_name);
    expect(data).not.toBeInstanceOf(Error);
    //create a beforeEach that clears the test database file
    //create an Afterall that clears the test database file
    //test createUserHabit in db file
    //create a testing suite for the initialize database functions
    //testing suite A: test 1: checkTableExists
    //testing suite A: test 2: createHabitPreferenceTable
    //testing suite A: test 3: createUserTable
    //testing suite A: test 4: create
  });
});
