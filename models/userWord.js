const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserWordSchema = new Schema({
    userID:{
      type: String,
      required: true,
    },
    fromLanguage: {
      type: String,
      required: true,
    },
    toLanguage: {
      type: String,
      required: true,
    },
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
      },
    multipleTranslationsCorrectAnswers: {
        type: Number,
        required: false,
        default: 0,
    },
    multipleWordsCorrectAnswers: {
      type: Number,
      required: false,
      default: 0,
    },
    missingLettersCorrectAnswers: {
      type: Number,
      required: false,
      default: 0,
    }
});

module.exports = UserWord = mongoose.model('userWord', UserWordSchema, "userWords");