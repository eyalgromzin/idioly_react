const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const readingTextSchema = new Schema({   
    language: {
        type: String,
        required: true,
        default: "",
    },
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
    source: {
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
    wordCount: {
        type: Number,
        required: true,
        default: 0,
    },
    likesCount: {
        type: Number,
        required: false,
        default: 0,
    },
    dislikesCount: {
        type: Number,
        required: false,
        default: 0,
    },
    createdOn: {
        type: Number,
        required: false,
        default: Date.now(),
    },
    createdBy: {
        type: String,
        required: true
    }
  });
  
  module.exports = readingText = mongoose.model('readingTexts', readingTextSchema, 'readingTexts');
  