const app = require('../index');
const request = require('supertest');
const { item } = require('../models');
const jwt = require('jsonwebtoken');
const { servers } = require('../api-docs');
require('dotenv').config()
const server = require('../index');
const testImage = './filetest/TEST.jpg';

const loginCust = {
    email: 'cust10@mail.com',
    password: 'Cust10'
}

const testItem = {
    item_id: 'b7b80b84-1e98-4349-b118-b52e990290bc',
    qty: 2
}

afterAll(() => {
    server.close()
});

let validToken = '';
let testOrderId = '';

describe('Order Endpoint',()=>{
    it('POST /customers/login with valid email and pass, res should be 200', async () => {
        const res = await request(app)
          .post('/customers/login')
          .set('Accept', 'application/json')
          .send({
            email: loginCust.email,
            password: loginCust.password
          });
    
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(typeof res.body.token).toMatch('string');
        validToken = res.body.token;
      })

    it('POST /orders/ with valid email and pass, res should be 200', async () => {
        const res = await request(app)
          .post('/orders/')
          .set('Accept', 'application/json')
          .set('authorization', validToken)
          .send(testItem);
    
        expect(res.status).toBe(201);
        testOrderId = res.body.id
      })

    it('POST /orders/ with invalid input, res should be 500', async () => {
        const res = await request(app)
          .post('/orders/')
          .set('Accept', 'application/json')
          .set('authorization', validToken)
          .field('item_id', 'asdcasx12')
          .field('qty','ascaqwe')
    
        expect(res.status).toBe(500);
      })
    
    it('GET /orders/ own by customer, res should be 200', async () => {
        const res = await request(app)
          .get('/orders/')
          .set('Accept', 'application/json')
          .set('authorization', validToken)
    
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
      })
    
    it('GET /orders/id with valid values, res should be 200', async () => {
        const res = await request(app)
          .get('/orders/' + testOrderId)
          .set('Accept', 'application/json')
          .set('authorization', validToken)
    
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
      })

      it('GET /orders/id with invalid uuid, res should be 404', async () => {
        const res = await request(app)
          .get('/orders/' + '92967d39-0ba7-44f7-98ed-1ad649cd62a6')
          .set('Accept', 'application/json')
          .set('authorization', validToken)
    
        expect(res.status).toBe(404);
      })

      it('GET /orders/id with invalid input, res should be 500', async () => {
        const res = await request(app)
          .get('/orders/' + 'dsacasd13122')
          .set('Accept', 'application/json')
          .set('authorization', validToken)
    
        expect(res.status).toBe(500);
      })

    it('PUT /orders/id with valid values, res should be 200', async () => {
        const res = await request(app)
          .put('/orders/' + testOrderId)
          .set('Accept', 'application/json')
          .set('authorization', validToken)
          .field('status', 'Terkirim')
    
        expect(res.status).toBe(201);
      })
    
    it('Delete /orders/id with valid values, res should be 200', async () => {
        const res = await request(app)
          .delete('/orders/' + testOrderId)
          .set('Accept', 'application/json')
          .set('authorization', validToken)
    
        expect(res.status).toBe(200);
      })

      it('Delete /orders/id with invalid values, res should be 500', async () => {
        const res = await request(app)
          .delete('/orders/' + 'asdzxc123')
          .set('Accept', 'application/json')
          .set('authorization', validToken)
    
        expect(res.status).toBe(500);
      })
})