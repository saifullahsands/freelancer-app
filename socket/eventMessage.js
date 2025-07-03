const prisma = require("../prismaClient");

async function sendMessage(socket, io) {
  const senderId = socket.userId;

socket.on("join-chat", (data) => {
  const receiverId = parseInt(typeof data === 'object' ? data?.receiverId : data);

  console.log("Sender:", senderId, "| Receiver:", receiverId);

  if (!receiverId || senderId === receiverId) {
    console.log("❌ Invalid join attempt (self or empty)");
    return;
  }

  const room = getRoomName(senderId, receiverId);
  socket.join(room);
  console.log(`${senderId} joined room ${room}`);
});


  socket.on("send-message", async ({ receiverId, content }) => {
    try {
      receiverId = parseInt(receiverId);
      if (!receiverId) throw new Error("Invalid receiverId");

      const room = getRoomName(senderId, receiverId);
      if (!room) throw new Error("Invalid room");

      const message = await prisma.message.create({
        data: {
          senderId,
          receiverId,
          content,
        },
      });

      io.to(room).emit("receive-message", message);
    } catch (err) {
      console.error(err);
      socket.emit("error", "Could not send message");
    }
  });
}

function getRoomName(user1, user2) {
  // dono ko number bana do
  const id1 = Number(user1);
  const id2 = Number(user2);

  if (!id1 || !id2) {
    console.error("Invalid user IDs:", id1, id2);
    return null;
  }

  // chhota id pehle ayega hamesha, taake dono same room join kar sakein
  return id1 < id2 ? `direct_${id1}_${id2}` : `direct_${id2}_${id1}`;
}

module.exports = { sendMessage };
