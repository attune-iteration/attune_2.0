// eslint-disable-next-line
const request = require('supertest');

const server = 'http://localhost:5001';

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

    describe('/habits', () => {
      describe('GET', () => {
        it('responds with 404 status', () => {
          return request(server).get('/api/habits').expect(404);
        });
      });

      describe('/all', () => {
        describe('GET', () => {
          it('responds with 200 status and the application/json datatype', () => {
            return request(server).get('/api/habits/all').expect(200);
          });
        });
      });
    });
  });
});
