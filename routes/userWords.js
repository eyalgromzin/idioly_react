var express = require("express")
var router = express.Router()

// readingText  Model
const userWord = require('../models/userWord');


// @route   GET texts/:language/:level/:type
// @desc    search with more
router.get('/getUserWords/:userID', (req, res) => {
    console.log(`in   userWords/getUserWords/${req.params.userID}`)  
  
    var query = {userID: req.params.userID}
  
    readingText.find(query).then((userWords) => { 
      res.send(userWords)
    })
})