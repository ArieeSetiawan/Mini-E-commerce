const app = require('../index');
const request = require('supertest');
const { user } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const server = require('../index')


const testUser = {
  username: 'Tester',
  email: 'test@mail.com',
  password: 'Test1234'
}

const testUser1 = {
  username: 'Delete1',
  email: 'delete1@mail.com',
  password: 'Test1234'
}

let validToken = '';
let invalidToken = 'Invalid-token';
let tokenforDelete = '';

afterAll(() => {
  server.close()
});

describe('User Delete Endpoints',()=>{
  it('POST /users/register with valid values, response should be 201', async () => {
    const res = await request(app)
      .post('/users/register')
      .send(testUser1)
      .set('Accept', 'application/json');

    expect(res.status).toBe(201);
    // expect(typeof res.body.message).toMatch('string');
  })

  it('POST /users/login with valid email and pass, response should be 200', async () => {
    const res = await request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send({
        email: testUser1.email,
        password: testUser1.password
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toMatch('string');
    tokenforDelete = res.body.token;
  })

  it('Delete /users/id with valid token, response should be 200.', async () => {
    const user = jwt.verify(tokenforDelete,process.env.SECRET_KEY);
    const parameter = user.id
    const response = await request(app)
      .delete('/users/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', tokenforDelete)

    expect(response.status).toEqual(200);
  })

  it('Delete /users/id with invalid token, response should be 200.', async () => {
    const user = jwt.verify(tokenforDelete,process.env.SECRET_KEY);
    const parameter = user.id
    const response = await request(app)
      .delete('/users/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', "invalidtoken")

    expect(response.status).toEqual(401);
  })
})

afterAll(() => {
  user.destroy({
    where: {
      email: testUser.email
    }
  })
});

describe('User Endpoints', () => {
  it('POST /users/register with valid values, response should be 201', async () => {
    const res = await request(app)
      .post('/users/register')
      .send(testUser)
      .set('Accept', 'application/json');

    expect(res.status).toBe(201);
    // expect(typeof res.body.message).toMatch('string');
  })

    it('POST /users/register with invalid values, response should be 422', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({
        username: "asal",
        email: "asad123@mail.com"
      })
      .set('Accept', 'application/json');

    expect(res.status).toBe(422);
    // expect(typeof res.body.message).toMatch('string');
  })

  it('POST /users/register with same Value, response should be 400', async () => {
    const res = await request(app)
      .post('/users/register')
      .send(testUser)
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
  })

  it('POST /users/login with valid email and pass, response should be 200', async () => {
    const res = await request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send({
        email: testUser.email,
        password: testUser.password
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toMatch('string');
    validToken = res.body.token;
  })

  it('POST /users/login with invalid pass, response should be 200', async () => {
    const res = await request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send({
        email: testUser.email,
        password: "Random123"
      });
    expect(res.status).toBe(401);
  })

  it('POST /users/login with invalid email, response should be 200', async () => {
    const res = await request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send({
        email: "aintnothin88@mail.com",
        password: "Random123"
      });
    expect(res.status).toBe(401);
  })

  it('GET /users with valid token, response should be 200.', async () => {
    const response = await request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .set('authorization', validToken);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
  })

  it('GET /users/id with valid token, response should be 200.', async () => {
    const user = jwt.verify(validToken,process.env.SECRET_KEY);
    const parameter = user.id
    const response = await request(app)
      .get('/users/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', validToken)

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
  })

  it('GET /users/id with valid token but uuid is invalid, response should be 404.', async () => {
    const user = jwt.verify(validToken,process.env.SECRET_KEY);
    const parameter = "WronguserID"
    const response = await request(app)
      .get('/users/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', validToken)

    expect(response.status).toEqual(500);
  })

  it('PUT /users/id with valid token, response should be 200.', async () => {
    const user = jwt.verify(validToken,process.env.SECRET_KEY);
    const parameter = user.id
    const response = await request(app)
      .put('/users/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', validToken)
      .send({
        username: 'changeusername'
      })

    expect(response.status).toEqual(200);
  })

  it('PUT /users/id with valid token but with invalid uuid, response should be 500.', async () => {
    const user = jwt.verify(validToken,process.env.SECRET_KEY);
    const parameter = "WrongUSerID"
    const response = await request(app)
      .put('/users/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', validToken)
      .send({
        username: 'changeusername'
      })

    expect(response.status).toEqual(500);
  })
  
})