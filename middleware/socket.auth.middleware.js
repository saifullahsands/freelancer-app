const JWT=require("jsonwebtoken")
const { TOKEN_SECRET_KEY } = require("../config/env.config");
const prisma = require("../prismaClient");
const socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.headers?.token;
    if (
      !token ||
      typeof token !== "string" ||
      !token.startsWith("Bearer ")
    ) {
      return next(new Error("Socket Auth Error: Token not found or malformed"));
    }
    const jwtToken = token.split(" ")[1];
    const decoded = JWT.verify(jwtToken, TOKEN_SECRET_KEY);
  
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(decoded.id),
      },
    });
    if (!user) {
      return next(new Error("UnAuthorized Error"));
    }
    socket.user = user;
    socket.userId = user.id;
    next()
  } catch (error) {
    if (error instanceof JWT.TokenExpiredError) {
      return next(new Error("Socket Auth Error: Token expired"));
    } else if (error instanceof JWT.JsonWebTokenError) {
      return next(new Error("Socket Auth Error: Invalid token"));
    } else {
      console.log(`Socket auth error: ${error.message}`);
      return next(new Error("Socket Auth Error: Internal server error"));
    }
  }
};


module.exports={socketAuth}