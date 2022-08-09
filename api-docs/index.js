const userPaths = require("./paths/userPaths");
const customerPaths = require("./paths/customerPaths");
const sellerPaths = require("./paths/sellerPaths");
const itemPaths = require ("./paths/itemPaths");
const orderPaths = require ("./paths/orderPaths")
require('dotenv').config();

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Arie Ecommerce System',
    description: 'How to Arie API',
    version: '1.0',
    contact:{
        name: "Arie",
        url:'https://google.com',
        email: 'test123@mail.com',
      },
      license:{
        name: process.env.HEROKU_HOST,
        url: "https://google.com",
      }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Dev server'
    },
    {
      url: 'http://localhost:3000',
      description: 'Heroku server' 
    }
  ],
  components: {
    securitySchemes: {
      token: {
        type: 'apiKey',
        description: 'Login as User/Seller to get token.',
        in: 'header',
        name: 'authorization'
      }
    }
  },
  paths: {
    ...userPaths,
    ...customerPaths,
    ...sellerPaths,
    ...itemPaths,
    ...orderPaths
  }
}