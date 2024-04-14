const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

// TODO: Extend later

const USER_SCHEMA = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

USER_SCHEMA.index(
  {
    email: 1,
  },
  { unique: true, collation: { locale: 'en', strength: 2 } }
);

module.exports = model('User', USER_SCHEMA);
