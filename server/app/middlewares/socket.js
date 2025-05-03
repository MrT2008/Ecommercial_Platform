const { Server } = require('socket.io');
const server = app.listen(process.env.PORT)
const io = new Server(server, {
  cors: {
    origin: '*', // adjust for your frontend origin
    methods: ['GET', 'POST']
  }
});

// Create namespace for user
const userNamespace = io.of('/user');

userNamespace.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle message event
  socket.on('message', (data) => {
    console.log(`Message from ${socket.id}:`, data);
    // Broadcast to all other clients in the namespace
    socket.broadcast.emit('chat-message', data);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
