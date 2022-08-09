const app = require('../index');
const request = require('supertest');
const { item } = require('../models');
const jwt = require('jsonwebtoken');
const { servers } = require('../api-docs');
require('dotenv').config()
const server = require('../index');
const testImage = './filetest/TEST.jpg';
const fs = require ('fs')




const loginSeller = {
    email: 'seller123@mail.com',
    password: 'Seller123'
}

const loginfakeseller= {
  email: 'eddie123@mail.com',
  password: 'Eddie123'
}

let validToken = '';
let itemidbody = '';
let fakeToken = '';

afterAll(() => {
    server.close()
});

describe('Login Fake Seller',()=>{
  it('POST /sellers/login with valid email and pass, res should be 200', async () => {
    const res = await request(app)
      .post('/sellers/login')
      .set('Accept', 'application/json')
      .send({
        email: loginfakeseller.email,
        password: loginfakeseller.password
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toMatch('string');
    fakeToken = res.body.token;
  })
})


describe('Item Endpoints',()=>{
  it('POST /sellers/login with valid email and pass, res should be 200', async () => {
    const res = await request(app)
      .post('/sellers/login')
      .set('Accept', 'application/json')
      .send({
        email: loginSeller.email,
        password: loginSeller.password
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toMatch('string');
    validToken = res.body.token;
  })

  it('POST /items/create with valid values, res should be 201', async () => {
    const res = await request(app)
      .post('/items/create')
      .set('Accept', 'application/json')
      .set('authorization', validToken)
      .field('title', 'TestDelet456')
      .field('price', 90001)
      .field('stock', 10)
      .attach('image', testImage)
    expect(res.status).toBe(201);
    itemidbody = res.body.id
  })

  it('POST /items/create with invalid values, res should be 422', async () => {
    const res = await request(app)
      .post('/items/create')
      .set('Accept', 'application/json')
      .set('authorization', validToken)
      .field('title', 'TestDelet456')
      .field('price', "zxczxc")
      .field('stock', "zxczxc")
      .attach('image', testImage)
    expect(res.status).toBe(422);
  })

  it('POST /items/create with invalid token, res should be 500', async () => {
    const res = await request(app)
      .post('/items/create')
      .set('Accept', 'application/json')
      .set('authorization', "kacauzxc")
      .field('title', 'TestDelet456')
      .field('price', 90001)
      .field('stock', 10)
      .attach('image', testImage)
    expect(res.status).toBe(401);
  })

  it('GET /items/ with valid values, res should be 200', async () => {
    const res = await request(app)
      .get('/items/')
      .set('Accept', 'application/json')
      .set('authorization', validToken)

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
  })

  it('GET /items/seller/id with valid values, res should be 200', async () => {
    const user = jwt.verify(validToken,process.env.SECRET_KEY);
    const res = await request(app)
      .get('/items/seller/' + user.id)
      .set('Accept', 'application/json')
      .set('authorization', validToken)

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
  })

  it('GET /items/seller/id with invalid user id, res should be 404', async () => {
    const res = await request(app)
      .get('/items/seller/' + "64ad07c1-b23a-41f4-bb45-21bc5b6d0257")
      .set('Accept', 'application/json')
      .set('authorization', validToken)

    expect(res.status).toBe(404);
  })

  it('GET /items/id with valid values, res should be 200', async () => {
    const res = await request(app)
      .get('/items/' + itemidbody)
      .set('Accept', 'application/json')
      .set('authorization', validToken)

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
  })

  it('GET /items/id with valid values, res should be 404', async () => {
    const res = await request(app)
      .get('/items/' + "64ad07c1-b23a-41f4-bb45-21bc5b6d0257")
      .set('Accept', 'application/json')
      .set('authorization', validToken)

    expect(res.status).toBe(404);
  })

  it('PUT /items/id with valid values, res should be 200', async () => {
    const user = jwt.verify(validToken,process.env.SECRET_KEY);
    const res = await request(app)
      .put('/items/' + itemidbody)
      .set('Accept', 'application/json')
      .set('authorization', validToken)
      .field('title', 'ChangeName')
      .field('price', 100800)
      .field('stock', 88)

    expect(res.status).toBe(200);
  })

  it('PUT /items/id with wrong seller id, res should be 401', async () => {
    const user = jwt.verify(validToken,process.env.SECRET_KEY);
    const res = await request(app)
      .put('/items/' + itemidbody)
      .set('Accept', 'application/json')
      .set('authorization', "invalidToken")
      .field('title', 'ChangeName')
      .field('price', 100800)
      .field('stock', 88)

    expect(res.status).toBe(401);
  })

  it('PUT /items/id with , res should be 401', async () => {
    const user = jwt.verify(validToken,process.env.SECRET_KEY);
    const res = await request(app)
      .put('/items/' + itemidbody)
      .set('Accept', 'application/json')
      .set('authorization', fakeToken)
      .field('title', 'ChangeName')
      .field('price', 100800)
      .field('stock', 88)

    expect(res.status).toBe(401);
  })  
  
  it('Delete /item/id with valid token, res should be 200.', async () => {
    const parameter = itemidbody
    const res = await request(app)
      .delete('/items/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', validToken)

    expect(res.status).toEqual(200);
  })

  it('Delete /item/id with wrong user, res should be 500.', async () => {
    const parameter = itemidbody
    const res = await request(app)
      .delete('/items/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', fakeToken)

    expect(res.status).toEqual(500);
  })
},30000)