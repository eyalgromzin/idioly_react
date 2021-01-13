const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const readingTextSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: "",
    },
    author: {
        type: String,
        required: true,
        default: "",
    },
    text: {
        type: String,
        required: true,
        default: "",
    },    
    level: {
        type: String,
        required: true,
        default: "",
    },
    type: {
        type: String,
        required: true,
        default: "",
    },
    youtubeLink: {
        type: String,
        required: false,
        default: "",
    },
    language: {
        type: String,
        required: true,
        default: "",
    },
    wordCount: {
        type: Number,
        required: true,
        default: 0,
    },
    likesCount: {
        type: Number,
        required: true,
        default: 0,
    },
    dislikesCount: {
        type: Number,
        required: true,
        default: 0,
    },
    createdOn: {
        type: Number,
        required: true,
        default: 0,
    }
  });
  
  module.exports = readingText = mongoose.model('readingTexts', readingTextSchema, 'readingTexts');
  