const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const USER = require('../models/User');

async function register(data) {
  const { email, password } = data;
  const existingEntry = await USER.find({ email }).length;
  if (existingEntry) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userPayload = { ...data, password: hashedPassword };

  const newUser = new USER(userPayload);
  newUser.save();

  const accessToken = generateAccessToken(userPayload);
  const refreshToken = jwt.sign(userPayload, process.env.REFRESH_TOKEN_SECRET);

  return {
    accessToken,
    refreshToken,
  };
}

async function login(data) {
  const { email, password } = data;
  const user = await authenticateUser(email, password);
  console.log(user);

  if (user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    return {
      accessToken,
      refreshToken,
    };
  } else {
    throw new Error('Invalid username or password');
  }
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

async function authenticateUser(email, password) {
  const user = await USER.findOne({ email }).exec();
  if (!user) return null;
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  return isCorrectPassword ? user.toObject() : null;
}

module.exports = {
  login,
  register,
};
