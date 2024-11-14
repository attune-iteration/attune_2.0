// eslint-disable-next-line
const { describe } = require('node:test');
const request = require('supertest');

/*
 * this file is for integration testing on the routes,
 * it does not check that routes actually do what they say they do, only that they
 *
 */

const server = 'http://localhost:5001';

describe('no-drawbacks (always run)', () => {
  describe('Route integration', () => {
    describe('/', () => {
      describe('GET', () => {
        it('responds with 404 status', () => {
          return request(server).get('/').expect(404);
        });
      });
    });

    describe('/api', () => {
      describe('GET', () => {
        it('responds with 404 status', () => {
          return request(server).get('/api').expect(404);
        });
      });
    });

    describe('/api/habits', () => {
      describe('GET', () => {
        it('responds with 404 status', () => {
          return request(server).get('/api/habits').expect(404);
        });
      });
      describe('POST', () => {
        describe('incorrect query parameters', () => {
          it('responds with 400 status', () => {
            return request(server).post('/api/habits?is_human=false').expect(400);
          });
        });
        describe('correct query params but user is not in db so no entry is likely added', () => {
          it('responds with 200 status', () => {
            return request(server)
              .post(`/api/habits?seed_genres='classical,FROM,TESTING'&target_valence=0.9&target_energy=0.9&habit_name=TeStInGHABiT&target_danceability=0.999&name=Alien${Math.random() * 10000}`)
              .expect(200);
          });
        });
      });
    });

    describe('/api/habits/all', () => {
      describe('GET', () => {
        describe('no query parameters', () => {
          it('responds with 400 status', () => {
            return request(server).get('/api/habits/all').expect(400);
          });
        });
        describe('invalid query parameters (no name param)', () => {
          it('responds with 400 status', () => {
            return request(server).get('/api/habits/all?user_likes_pineapples_on_pizza=0.5').expect(400);
          });
        });
        describe('query parameters name provided', () => {
          it('responds with 200 status and aplication/json data type', () => {
            return request(server)
              .get('/api/habits/all?name=default_user') // assuming this is in there, but if the below works this should work
              .expect('Content-Type', /application\/json/)
              .expect(200);
          });
          it('responds with 200 status and aplication/json Content-Typeif name is not in db', () => {
            return request(server)
              .get(`/api/habits/all?name=fasbguirabds${Math.random() * 10000}afdsegtgddseradstrty`)
              .expect('Content-Type', /application\/json/)
              .expect(200);
          });
        });
      });
    });
    describe('/api/spotify_recommendations', () => {
      describe('GET', () => {
        describe('no query parameters', () => {
          it('responds with 400 status', () => {
            return request(server).get('/api/spotify_recommendations').expect(400);
          });
        });
        describe('correct parameters but no limit', () => {
          it('responds with 400 status for now', () => {
            return request(server).get("/api/spotify_recommendations?seed_genres='classical,ambient,acoustic'&target_valence=0.9&target_energy=0.9&target_danceability=0.999").expect(400);
          });
        });
        describe('correct parameters', () => {
          it('responds with 200 status and application/json Content-Type', () => {
            return request(server).get("/api/spotify_recommendations?seed_genres='classical,ambient,acoustic'&target_valence=0.9&target_energy=0.9&target_danceability=0.999&limit=2").expect(200);
          });

          it('the response should have a body', () => {
            return request(server)
              .get("/api/spotify_recommendations?seed_genres='classical,ambient,acoustic'&target_valence=0.9&target_energy=0.9&target_danceability=0.999&limit=2")
              .then((response) => {
                expect(response.body).not.toEqual(undefined);
              });
          });

          it('the response body should be an object with a key, recommendations', () => {
            return request(server)
              .get("/api/spotify_recommendations?seed_genres='classical,ambient,acoustic'&target_valence=0.9&target_energy=0.9&target_danceability=0.999&limit=2")
              .expect(200)
              .then((response) => {
                expect(response.body).toHaveProperty('recommendations');
              });
          });
          it('recommendations should be an Array of objects with at least one object.', () => {
            return request(server)
              .get("/api/spotify_recommendations?seed_genres='classical,ambient,acoustic'&target_valence=0.9&target_energy=0.9&target_danceability=0.999&limit=2")
              .expect(200)
              .then((response) => {
                expect(Array.isArray(response.body.recommendations)).toEqual(true);
                expect(response.body.recommendations.length).toBeGreaterThan(0);
              });
          });
          it('each reccomendation should have the properties name, artist, uri, and artwork and they should not be undefined', () => {
            return request(server)
              .get("/api/spotify_recommendations?seed_genres='classical,ambient,acoustic'&target_valence=0.9&target_energy=0.9&target_danceability=0.999&limit=2")
              .expect(200)
              .then((response) => {
                for (let i = 0; i < response.body.recommendations.length; i++) {
                  expect(response.body.recommendations[i].name).not.toBeUndefined();
                  expect(response.body.recommendations[i].artist).not.toBeUndefined();
                  expect(response.body.recommendations[i].uri).not.toBeUndefined();
                  expect(response.body.recommendations[i].artwork).not.toBeUndefined();
                }
              });
          });
        });
      });
    });
  });
});
xdescribe('has drawbacks such as cost/db clutter', () => {
  describe('/api/ask_ai', () => {
    describe('POST', () => {
      describe('correct body', () => {
        it('responds with 200 status and application/json data type with an object with properties.', () => {
          return request(server)
            .post('/api/ask_ai')
            .send({ prompt: 'i am feeling happy and would like to rest.' })
            .expect('Content-Type', /application\/json/)
            .expect(200)
            .then((resp) => {
              console.log(resp.body);
              expect(resp.body).not.toBeUndefined();
              expect(resp.body.seed_genres).not.toBeUndefined();
              expect(resp.body.target_valence).not.toBeUndefined();
              expect(resp.body.target_danceability).not.toBeUndefined();
              expect(resp.body.target_energy).not.toBeUndefined();
            });
        });
      });
      describe('missing body', () => {
        it('should return 400 with application/json and we hope that no ai call was made', () => {
          return request(server)
            .post('/api/ask_ai')
            .expect('Content-Type', /application\/json/)
            .expect(400);
        });
      });
    });
  });

  describe('/api/habits', () => {
    describe('POST', () => {
      describe('correct query params', () => {
        it('responds with 200 status (may have mutated)', () => {
          return request(server).post(`/api/habits?seed_genres='classical,FROM,TESTING,WITH,DRAWBACKS'&target_valence=0.9&target_energy=0.9&habit_name=TeStInGHABiT&target_danceability=0.999&name=test_user`).expect(200);
        });
      });
    });
  });
});
