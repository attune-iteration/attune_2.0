//uses unit tests to test the DB

import pool, { createUserHabit } from '../server/models/aTuneModels';
import { checkTableExists } from '../server/controllers/initializeDatabase';

//creates a mock of the supabase client and the from method for inserting data

describe('submits to supabase to check DB functions', () => {
  const inputInfo = {
    genres: 'rock,classic,acoustic',
    target_danceability: '0.6',
    target_energy: '0.3',
    target_valence: '0.5',
    habit_name: 'TESTING new habit',
    name: 'default_user',
  };

  // beforeAll(async (done) => {});
  // let server;

  // beforeAll(() => {
  //   // Setup the server or some async resource
  //   server = require('http').createServer((req, res) => res.end('Hello World'));
  //   server.listen(3000);
  // });

  afterAll(async () => {
    const queryString = `DELETE FROM habit_preference
    WHERE habit_name = '$1'`;
    const values = [inputInfo.habit_name];
    const result = await pool.query(queryString, values);
  });
  xit('tests for response upon successful creation of habit', async () => {
    const result = await createUserHabit(inputInfo);
    await expect(result).not.toBeInstanceOf(Error);
    await expect(result).toBe('habit creation succesfull');
  });
  xit('checks DB for seeing whether habit called TESTING new habit created', async () => {
    const queryString = `SELECT * FROM habit_preference WHERE habit_name=$1`;
    const value = [inputInfo.habit_name];
    const {
      data: insertData,
      error: insertError,
      status: insertStatus,
    } = await pool.query(queryString, value);
    await expect(insertError).toBe(undefined);
    // inputInfo.habit_name);
    await expect(insertStatus).not.toBeInstanceOf(Error);
    console.log(insertData);
    // await expect(insertData.rows[0].genres).toBe(inputInfo.genres);
  });
});

describe('unit DB tests for initializing the database', () => {
  it('check whether a table exists in the DB', async () => {
    const badresult = await checkTableExists('nonexistent_table');
    await expect(badresult).toEqual(false);
  });
});
