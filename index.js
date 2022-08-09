const express = require ('express');
const app = express();
const cookieParser = require ("cookie-parser");
const path = require('path');
const logger = require ('morgan');
const swaggerUI = require('swagger-ui-express');
const server = require('http').Server(app);
const cors = require ('cors');
const io = require ('socket.io')(server,{cors:{origin:"*"}})
const errHandler = require ('./middlewares/errHandler')

require('dotenv').config();

const userRoutes= require ('./routes/user-routes');
const sellerRoutes= require ('./routes/seller-routes');
const customerRoutes= require ('./routes/customer-routes');
const itemRoutes= require ('./routes/item-routes');
const orderRoutes= require ('./routes/order-routes');

app.set('views','./views')
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const swaggerDoc = require ('./api-docs')
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc, {
    swaggerOptions: {
      docExpansion: "none"
    }
  }));

app.get('/chat',(req,res)=>{
  res.render('chat')
})

app.use('/users', userRoutes);
app.use('/sellers', sellerRoutes);
app.use('/customers', customerRoutes);
app.use('/items', itemRoutes);
app.use('/orders', orderRoutes);

app.use(errHandler)

server.listen(process.env.PORT, ()=>{
    console.log("Server is running on port", process.env.PORT);
})

const users = {}
io.on('connection', (socket) => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

module.exports = app;
module.exports = server;