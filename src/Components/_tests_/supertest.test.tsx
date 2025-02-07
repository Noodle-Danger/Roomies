// * Route Integration
import request from 'supertest';
import express from 'express';

const app = express();

describe('GET /api', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/api')
      .expect('Content-Type', /text\/html/)
      .expect(404, done);
  });
});

describe('/chores', () => {
  describe('GET', () => {
    it('responds with 200 status and application/json content type', async () => {
      await request(app)
        .get('/chores')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
});
