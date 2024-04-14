const mongoose = require('mongoose');
require('dotenv').config();

const dbLink =
  process.env.NODE_ENV === 'production'
    ? process.env.PROD_URL
    : process.env.DEV_URL;

module.exports = async function () {
  console.log(dbLink);
  try {
    await mongoose.connect(dbLink);
    console.log('***DB CONNECTED***');
  } catch (error) {
    console.log(`***DB ERROR*** ${error.message}`);
  }
};
