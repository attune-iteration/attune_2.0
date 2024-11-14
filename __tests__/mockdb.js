import pool, { createUserHabit } from '../server/models/aTuneModels';
import { checkTableExists } from '../server/controllers/initializeDatabase';
import { it } from 'node:test';

jest.mock('../server/models/aTuneModels');
//) => {
//   const mQuery = jest.fn();
//   const mPool = jest.fn(() => ({
//     query: mQuery,
//     end: jest.fn(),
//   }));
//   return { Pool: mPool };
// });

describe('creates mock database to unit test functions', () => {
  beforeEach(() => {
    pool.query.mockReset();
  });

  it('checktable exists should return true when the table exists', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ exists: true }] });
    const result = await checkTableExists('table_name');
    expect(result).toBe(true);
  });

  //current code in createHabitPreferenceTable doesn't yield a success response upon success
  it('checkhabitpreference check to see if table is created', async () => {
    const checkTableExists = jest.fn();
    const result = createHabitPreferenceTable();
    expect(result).toBe(200);
    expect(checkTableExists).toHaveBeenCalled();
  });

  it('createusertable: check to see if tableexists returns console message when table exists', async () => {
    const result = await createUserTable();
    expect(response).toHave(ok);
  });
});
//   xit('check createusertable to see if table for new user is created', async () => {
//     pool.query.mockResolvedValueOnce(response.status(200));
//     const result = createUserTable();
//     expect(result).toBe(200 | `_user already exists`);
//   });

//   xit('check to see if tableexists returns console message when table exists');
//   xit('check creategenretable to see if genre table is created', async () => {
//     pool.query.mockResolvedValueOnce(response.status(200));
//     const result = createGenreTable();
//     expect(result).toBe(200 | `_user already exists`);
//   });
//   xit('call the query method of pg.Pool in aTuneModels.js', async () => {
//     pool.query.mockResolvedValue({ rows: [{ exists: true }] });
//     const result = await pool.query('SELECT * FROM _user');
//     expect(pool.query).toHaveBeenCalledWith('SELECT * FROM _user');
//     expect(result).toEqual(mockQueryResult);
//   });

//   xit('check gethabits to make sure habit list for specified user is retrieved', async () => {});

//   xit('error handling in the query', async () => {
//     const mockError = new Error('query failed');
//     pool.query.mockRejectedValue(mockError);
//     await expect(pool.query('SELECT * FROM _user')).rejects.toThrow(
//       'query failed'
//     );
//   });
it('it should find the habit after creation', async () => {
  const mockBeginResult = { rows: [] };
  const mockInsertResult = { rows: [{ _id: 1 }] };
  const mockCommitResult = { rows: [] };
  pool.query.mockResolvedValueOnce(mockBeginResult);
  pool.query.mockResolvedValueOnce(mockInsertResult);
  pool.query.mockResolvedValueOnce(mockCommitResult);

  const inputInfo = {
    genres: ['rock', 'classical'],
    target_danceability: 0.5,
    target_energy: 0.8,
    target_valence: 0.9,
    habit_name: 'Morning Yoga',
    name: 'John Doe',
  };
  const {
    data: insertData,
    error: insertError,
    status: insertStatus,
  } = await pool.query(
    `INSERT INTO habit_preference (habit_name)
    VALUES $1 RETURNING *1`,
    inputInfo.habit_name
  );
  await expect(insertData).toBe(mockBeginResult);
  await expect(insertError).toBeNull();
  await expect(insertStatus).toBe(201);
});

// //   mockInsert = createClient().from().insert;
// // });
// describe('creates mock database to test functionality', () => {
//   jest.mock('pg'); //creates a mock of hte PG module

//   let poolMock;
//   beforeEach(() => {
//     poolMock = {
//       query: jest.fn(),
//     };

//     Pool.mockImplementation(() => poolMock);
//   });
//   afterEach(() => {
//     jest.clearAllMocks(); //clear all mocks to make sure there are no leaks
//   });

//   it('createUserHabit creates a new habit in mock DB', async () => {
//     const mockInsertResult = { data: insertData }; //mock result for the insert
//     poolMock.query.mockResolvedValueOnce(mockInsertResult);
//     poolMock.query.mockResolvedValueOnce(mockInsertResult);
//     poolMock.query.mockResolvedValueOnce(mockInsertResult);
//     const inputInfo = {
//       genres: ['rock', 'classical'],
//       target_danceability: 0.5,
//       target_energy: 0.8,
//       target_valence: 0.9,
//       habit_name: 'Morning Yoga',
//       name: 'John Doe',
//     };
//     const result = await createUserHabit(inputInfo);
//     expect(poolMock.query).toHaveBeenCalledTimes(3); // BEGIN, INSERT, COMMIT
//     expect(poolMock.query).toHaveBeenCalledWith('BEGIN;');
//     expect(poolMock.query).toHaveBeenCalledWith(
//       expect.stringContaining('WITH newGenres AS ('),
//       expect.arrayContaining([
//         JSON.stringify(inputInfo.genres),
//         inputInfo.target_danceability,
//         inputInfo.target_energy,
//         inputInfo.target_valence,
//         inputInfo.habit_name,
//         inputInfo.name,
//       ])
//     );
//     expect(poolMock.query).toHaveBeenCalledWith('COMMIT;');
//     expect(result).toBe('habit creation succesfull');
//   });

//   describe('database unit tests: createUserHabit', () => {
//     jest.mock('pg'); //creates a mock of hte PG module

//     let poolMock;

//     beforeEach(() => {
//       poolMock = {
//         query: jest.fn(),
//       };

//       Pool.mockImplementation(() => poolMock);
//     });
//     afterEach(() => {
//       jest.clearAllMocks(); //clear all mocks to make sure there are no leaks
//     });

//     it('should create a new habit in mock DB', async () => {
//       const mockInsertResult = { data: insertData }; //mock result for the insert
//       poolMock.query.mockResolvedValueOnce(mockInsertResult);
//       poolMock.query.mockResolvedValueOnce(mockInsertResult);
//       poolMock.query.mockResolvedValueOnce(mockInsertResult);
//       const inputInfo = {
//         genres: ['rock', 'classical'],
//         target_danceability: 0.5,
//         target_energy: 0.8,
//         target_valence: 0.9,
//         habit_name: 'Morning Yoga',
//         name: 'John Doe',
//       };
//       const result = await createUserHabit(inputInfo);
//       expect(poolMock.query).toHaveBeenCalledTimes(3); // BEGIN, INSERT, COMMIT
//       expect(poolMock.query).toHaveBeenCalledWith('BEGIN;');
//       expect(poolMock.query).toHaveBeenCalledWith(
//         expect.stringContaining('WITH newGenres AS ('),
//         expect.arrayContaining([
//           JSON.stringify(inputInfo.genres),
//           inputInfo.target_danceability,
//           inputInfo.target_energy,
//           inputInfo.target_valence,
//           inputInfo.habit_name,
//           inputInfo.name,
//         ])
//       );
//       expect(poolMock.query).toHaveBeenCalledWith('COMMIT;');
//       expect(result).toBe('habit creation succesfull');
//     });

// });
//create a beforeEach that clears the test database file
//create an Afterall that clears the test database file
//test createUserHabit in db file
//create a testing suite for the initialize database functions
//testing suite A: test 1: checkTableExists
//testing suite A: test 2: createHabitPreferenceTable
//testing suite A: test 3: createUserTable
//testing suite A: test 4: create
