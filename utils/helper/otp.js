function generateOtp() {
  const timestamp = Date.now();
  const shortInt = timestamp.toString().slice(-6);
  return shortInt;
}

module.exports = {
  generateOtp,
};
