const app = require('../index');
const request = require('supertest');
const { seller } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const server = require('../index')

const testUser = {
    firstName: 'tester123',
    lastName: 'tester123',
    email: 'tester123@mail.com',
    password: 'Tester123',
    address: "Jakarta",
}

const testUser1 = {
    firstName: 'tester1234',
    lastName: 'tester1234',
    email: 'tester1234@mail.com',
    password: 'Tester1234',
    address: "Jakarta",
}

let validToken = '';
let invalidToken = 'Invalid-token';
let tokenforDelete = '';

afterAll(() => {
  server.close()
});

describe('Seller Delete Endpoints',()=>{
  it('POST /sellers/register with valid values, response should be 201', async () => {
    const res = await request(app)
      .post('/sellers/register')
      .send(testUser1)
      .set('Accept', 'application/json');

    expect(res.status).toBe(201);
    // expect(typeof res.body.message).toMatch('string');
  })

  it('POST /sellers/login with valid email and pass, response should be 200', async () => {
    const res = await request(app)
      .post('/sellers/login')
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

  it('Delete /sellers/id with valid token, response should be 200.', async () => {
    const user = jwt.verify(tokenforDelete,process.env.SECRET_KEY);
    const parameter = user.id
    const response = await request(app)
      .delete('/sellers/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', tokenforDelete)

    expect(response.status).toEqual(200);
  })

  it('Delete /sellers/id with invalid token, response should be 200.', async () => {
    const user = jwt.verify(tokenforDelete,process.env.SECRET_KEY);
    const parameter = user.id
    const response = await request(app)
      .delete('/sellers/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', "invalidtoken")

    expect(response.status).toEqual(401);
  })
})

afterAll(() => {
  seller.destroy({
    where: {
      email: testUser.email
    }
  })
});

describe('Seller Endpoints', () => {
  it('POST /sellers/register with valid values, response should be 201', async () => {
    const res = await request(app)
      .post('/sellers/register')
      .send(testUser)
      .set('Accept', 'application/json');

    expect(res.status).toBe(201);
    // expect(typeof res.body.message).toMatch('string');
  })

    it('POST /sellers/register with invalid values, response should be 422', async () => {
    const res = await request(app)
      .post('/sellers/register')
      .send({
        username: "asal",
        email: "asad123@mail.com"
      })
      .set('Accept', 'application/json');

    expect(res.status).toBe(422);
    // expect(typeof res.body.message).toMatch('string');
  })

  it('POST /sellers/register with same Value, response should be 400', async () => {
    const res = await request(app)
      .post('/sellers/register')
      .send(testUser)
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
  })

  it('POST /sellers/login with valid email and pass, response should be 200', async () => {
    const res = await request(app)
      .post('/sellers/login')
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

  it('POST /sellers/login with invalid pass, response should be 401', async () => {
    const res = await request(app)
      .post('/sellers/login')
      .set('Accept', 'application/json')
      .send({
        email: testUser.email,
        password: "Wrong123"
      });
    expect(res.status).toBe(403);
  })

  it('POST /sellers/login with invalid email, response should be 401', async () => {
    const res = await request(app)
      .post('/sellers/login')
      .set('Accept', 'application/json')
      .send({
        email: "aintnothin88@mail.com",
        password: "Random123"
      });
    expect(res.status).toBe(401);
  })

  it('GET /sellers with valid token, response should be 200.', async () => {
    const response = await request(app)
      .get('/sellers')
      .set('Accept', 'application/json')
      .set('authorization', validToken);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
  })

  it('GET /sellers/id with valid token, response should be 200.', async () => {
    const user = jwt.verify(validToken,process.env.SECRET_KEY);
    const parameter = user.id
    const response = await request(app)
      .get('/sellers/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', validToken)

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
  })

  it('GET /sellers/id with valid token but uuid is invalid, response should be 500.', async () => {
    const user = jwt.verify(validToken,process.env.SECRET_KEY);
    const parameter = "WronguserID"
    const response = await request(app)
      .get('/sellers/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', validToken)

    expect(response.status).toEqual(500);
  })

  it('PUT /users/id with valid token, response should be 200.', async () => {
    const user = jwt.verify(validToken,process.env.SECRET_KEY);
    const parameter = user.id
    const response = await request(app)
      .put('/sellers/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', validToken)
      .send({
        firstName: "eddie",
        lastName: "ganti",
        address: "Batam"
      })

    expect(response.status).toEqual(200);
  })

  it('PUT /users/id with valid token but with invalid uuid, response should be 500.', async () => {
    const user = jwt.verify(validToken,process.env.SECRET_KEY);
    const parameter = 123
    const response = await request(app)
      .put('/sellers/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', validToken)
      .send({
        firstName: "eddie",
        lastName: "ganti",
        address: "Batam"
      })

    expect(response.status).toEqual(500);
  })
  
})