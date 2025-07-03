const { socketAuth } = require("../middleware/socket.auth.middleware");
const { sendMessage } = require("./eventMessage");


function initSocket(io) {
  io.use(socketAuth);
  io.on("connection", (socket) => {
    console.log(
      `authenticated Socket :: ${socket.userId} :: ${JSON.stringify(
        socket.userId
      )}`
    );
    socket.emit("connected", `🎉 You are connected as ${socket.user.username}`);

    sendMessage(socket, io);

    socket.on("disconnect", (socket) => {
      console.log(`❌ User ${socket.userId} disconnected`);
    });
  });
}

module.exports = initSocket;
