//uses unit tests to test the DB
const path = require('path');
const db = require('../server/routes/aTuneModes');
const initdb = require('../server/controllers/initializeDatabase');
//need to create a test file / mockDB to write to

describe('database unit tests', () => {

//mock input info
  const inputInfo = {
    genres: 'rock,classic,acoustic'
    target_danceability: '0.6',
    target_valence: '0.5',
    habit_name: 'TESTING new habit',
    name: 'default_user'
}
  
it('createUserHabit returns response upon successful creation of habit', async () => {

const result = await db.createUserHabit(inputInfo);
expect(result).not.toBeInstanceOf(Error);
expect(result).toBe('habit creation succesfull');
const table = JSON.parse()

const result2 = await pool.query()
});

// it('checks DB for seeing whether users new habit created', async () => {
// const queryString = `SELECT EXISTS (SELECT $1 FROM users  
// })
  //create a beforeEach that clears the test database file
  //create an Afterall that clears the test database file
  //test createUserHabit in db file
  //create a testing suite for the initialize database functions
  //testing suite A: test 1: checkTableExists
  //testing suite A: test 2: createHabitPreferenceTable
  //testing suite A: test 3: createUserTable
  //testing suite A: test 4: create
});
