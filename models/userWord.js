const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userWordSchema = new Schema({
    word: {
      type: String,
      required: true,
    },   
    translation: {
      type: String,
      required: true,
    },
    sentence: {
        type: String,
        required: false,
      }   
});

module.exports = User = mongoose.model('user', userWordSchema, 'users');