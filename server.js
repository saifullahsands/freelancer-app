const app = require("./app");
const { ConnectionDatabase } = require("./config/db.config");
const { PORT } = require("./config/env.config");
const prisma = require("./prismaClient");

(async function () {
  try {
    await ConnectionDatabase();
    app.listen(PORT, () => console.log(`server is running on Port :: ${PORT}`));
  } catch (error) {
    console.log(`error in server connect with database :: ${error.message}`);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
