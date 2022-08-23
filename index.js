const express = require ('express');
const app = express();
const cookieParser = require ("cookie-parser");
const path = require('path');
const logger = require ('morgan');
const swaggerUI = require('swagger-ui-express');
const server = require('http').Server(app);
const cors = require ('cors');
const io = require ('socket.io')(server,{
  cors:{origin:"*"},
})
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

//////////

const rooms = { }
app.get('/chat',(req,res)=>{
  res.render('chat', {rooms:rooms})
})


app.post('/room', (req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect('/chat')
  }
  rooms[req.body.room] = { users: {} }
  res.redirect(req.body.room)
  io.emit('room-created', req.body.room)
})

app.get('/:room', (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect('/chat')
  }
  res.render('room', { roomName: req.params.room })
})

///////////

app.use('/users', userRoutes);
app.use('/sellers', sellerRoutes);
app.use('/customers', customerRoutes);
app.use('/items', itemRoutes);
app.use('/orders', orderRoutes);

app.use(errHandler)

server.listen(process.env.PORT, ()=>{
    console.log("Server is running on port", process.env.PORT);
})

io.on('connection', socket => {
  socket.on('new-user', (room, name) => {
    socket.join(room)
    rooms[room].users[socket.id] = name
    socket.to(room).emit('user-connected', name)
  })
  socket.on('send-chat-message', (room, message) => {
    socket.to(room).emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
  })
  socket.on('disconnect', () => {
    getUserRooms(socket).forEach(room => {
      socket.to(room).emit('user-disconnected', rooms[room].users[socket.id])
      delete rooms[room].users[socket.id]
    })
  })
})

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name)
    return names
  }, [])
}

module.exports = app;
module.exports = server;