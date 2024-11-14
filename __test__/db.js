//uses unit tests to test the DB
const path = require('path');
const db = require('../server/routes/aTuneModes');
const initdb = require('../server/controllers/initializeDatabase');
//need to create a test file / mockDB to write to

describe('database unit tests', () => {
  //create mock seed data that we will try to write to the database
  //create a beforeEach that clears the test database file
  //create an Afterall that clears the test database file
  //test createUserHabit in db file
  //create a testing suite for the initialize database functions
  //testing suite A: test 1: checkTableExists
  //testing suite A: test 2: createHabitPreferenceTable
  //testing suite A: test 3: createUserTable
  //testing suite A: test 4: initializeTables
});
