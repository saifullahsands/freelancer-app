const prisma = require("../prismaClient");

async function ConnectionDatabase() {
  try {
    await prisma.$connect();
    console.log(`database connected successfully !!`);
  } catch (error) {
    console.log(`error in connection Database :: ${error.message}`);
    await prisma.$disconnect();
    process.exit(1);
  }
}

module.exports = {
  ConnectionDatabase,
};
