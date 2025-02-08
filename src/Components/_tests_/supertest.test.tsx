// * Route Integration
import request from 'supertest';
import express from 'express';
import choresRouter from '../../../server/routes/chores.js';
import pool from '../../../server/models/roomiesModels.js';

const app = express();
app.use(express.json());
app.use('/api/chores', choresRouter);

afterAll(async () => {
  await pool.end();  // Close connection after each test
});


describe('GET /api', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/api')
      .expect('Content-Type', /text\/html/)
      .expect(404, done);
  });
});

describe('/api/chores', () => {
  describe('PUT', () => {
    it('responds with 200 status and application/json content type', async () => {
      const completed = [{
        "user_id": 1,
        "chore_id": 2
      }
      ];
      await request(app)
        .put('/api/chores')
        .send(completed)
        .expect('Content-Type', /json/)
        .expect(200)
    });
    it('responds with the updated completed value', () => {
      const completed = [{
        "user_id": 1,
        "chore_id": 2
      }
      ];
      return request(app)
        .put('/markets')
        .send(completed)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual({ choreId: 1, completed: true });
        });
    });
  });
});
