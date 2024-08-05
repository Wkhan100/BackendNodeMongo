const jwt = require("jsonwebtoken");

const createSecretToken = (userId) => {
  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined");
  }
  return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "1h" });
};

module.exports = { createSecretToken };
