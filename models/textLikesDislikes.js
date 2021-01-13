const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const textLikesDislikesSchema = new Schema({
    level: {
        type: String,
        required: true,
        default: "",
    },
    likeOrDislike: {
        type: String,
        required: true,
        default: "",
    },
    textID: {
        type: String,
        required: true,
        default: "",
    },    
    title: {
        type: String,
        required: true,
        default: "",
    },
    type: {
        type: String,
        required: true,
        default: "",
    },
    userID: {
        type: String,
        required: false,
        default: "",
    }    
  });
  
  module.exports = textLikesDislikes = mongoose.model('textLikesDislikes', textLikesDislikesSchema, "textLikesDislikes");
  