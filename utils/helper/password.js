const bcrypt = require("bcrypt");

async function passwordHash(password) {
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);
  return hashpassword;
}

async function comparePassword(password, userPassword) {
  return await bcrypt.compare(password, userPassword);
}

module.exports = {
  passwordHash,
  comparePassword,
};
