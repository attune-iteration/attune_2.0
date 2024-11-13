// import pg from 'pg';
// const { Pool } = pg;

// const PG_URI = 'postgresql://postgres.rqihlgfvcoiicmlmkkrx:greatappetite22oats@aws-0-us-east-1.pooler.supabase.com:6543/postgres';

// const pool = new Pool({
//   connectionString: PG_URI,
// });

import pool from '../models/aTuneModels.js';

const checkTableExists = async (tableName) => {
  const query = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = $1
    );
  `;
  const result = await pool.query(query, [tableName]);
  return result.rows[0].exists;
};

const createHabitPreferenceTable = async () => {
  const tableName = 'habit_preference';
  const tableExists = await checkTableExists(tableName);

  if (!tableExists) {
    const createTableQuery = `
        CREATE TABLE ${tableName} (
          _id SERIAL PRIMARY KEY,
          target_energy NUMERIC,
          target_danceability NUMERIC,
          target_valence NUMERIC,
          habit_name VARCHAR(255),
          user_id INTEGER REFERENCES _user(_id),
          genres_of_habit_id INTEGER REFERENCES genres_of_habit(_id)
        );
      `;
    const insertDataQuery = `
      INSERT INTO ${tableName}
        (_id, target_energy, target_danceability, target_valence, habit_name, user_id, genres_of_habit_id)
      VALUES 
        (1, 0.5, 0.5, 0.5, 'nature walk', 1, 1),
        (2, 0.1, 0.5, 0.2, 'at gym', 1, 2);
    `;
    await pool.query(createTableQuery);
    await pool.query(insertDataQuery);
  } else {
    console.log(`${tableName} table already exists`);
  }
};

const createUserTable = async () => {
  const tableName = '_user';
  const tableExists = await checkTableExists(tableName);

  if (!tableExists) {
    const createTableQuery = `
          CREATE TABLE ${tableName} (
            _id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE,
            password VARCHAR(255)
          );
        `;
    const insertDataQuery = `
        INSERT INTO ${tableName}
          (_id, name, password)
        VALUES 
          (1, 'default_user', 'fake_password_1'),
          (2, 'spotify_user', 'fake_password_2');
      `;
    await pool.query(createTableQuery);
    await pool.query(insertDataQuery);
  } else {
    console.log(`${tableName} table already exists`);
  }
};

const createGenreTable = async () => {
  const tableName = 'genres_of_habit';
  const tableExists = await checkTableExists(tableName);

  if (!tableExists) {
    const createTableQuery = `
            CREATE TABLE ${tableName} (
              _id SERIAL PRIMARY KEY,
              genre_names JSON
            );
          `;
    const insertDataQuery = `
          INSERT INTO ${tableName}
            (_id, genre_names)
          VALUES 
            (1, '["rock", "pop", "jazz"]'),
            (2, '["classical", "hip-hop", "electronic"]');
        `;
    await pool.query(createTableQuery);
    await pool.query(insertDataQuery);
  } else {
    console.log(`${tableName} table already exists`);
  }
};

// Initialize all tables
const initializeTables = async () => {
  await createUserTable();
  await createGenreTable();
  await createHabitPreferenceTable();
};

export default initializeTables;
