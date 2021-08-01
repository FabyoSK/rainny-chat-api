const request = require('supertest');
const app = require('../src/server');

const { default: removeAllCollections } = require('./__helpers__/clearDatabase');

describe('User test', () => {
  beforeEach(async () => {
    jest.setTimeout(20000);
  });

  afterEach(async () => {
    await removeAllCollections();
  });

  it('should return 201 when creating an user successfully ', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        username: 'fabyosk',
        password: 'fabyosk1234'
      });

    expect(response.status).toBe(201);
  });

  it('should be able to logging in a existent account', async () => {
    await request(app)
      .post('/users')
      .send({
        username: 'fabyosk',
        password: 'fabyosk1234'
      });

    const loggedUser = await request(app)
      .post('/sessions')
      .send({
        username: 'fabyosk',
        password: 'fabyosk1234'
      });

    expect(loggedUser.status).toBe(201);
  });

  it('should not be able to logging in a existent account with invalid credentials', async () => {
    const user = await request(app)
      .post('/users')
      .send({
        username: 'fabyosk',
        password: 'fabyosk1234'
      });

    const loggedUser = await request(app)
      .post('/sessions')
      .send({
        username: 'fabyosk',
        password: 'aaaaaaaa'
      });

    expect(loggedUser.status).toBe(404);
  });
});
