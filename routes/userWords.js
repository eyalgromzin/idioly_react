var express = require("express")
var router = express.Router()

// readingText  Model
const UserWord = require('../models/userWord');

// @route   GET texts/:language/:level/:type
// @desc    search with more
router.get('/getuserwords/:userID', (req, res) => {
    console.log(`in   userWords/getUserWords/${req.params.userID}`)  
  
    var query = {userID: req.params.userID}
  
    UserWord.find(query).then((userWords) => { 
      res.send(userWords)
    })
})

// @route   POST texts/:language/:level/:type
// @desc    search with more
router.post('/adduserword', (req, res) => {
    console.log("in addUserWord")

    //without body parse -  req.body is undefined :/
    const newWord = new UserWord({
        userID: req.body.userID,
        fromLanguage: req.body.fromLanguage,
        toLanguage: req.body.toLanguage,
        word: req.body.word,     
        translation: req.body.translation,
        sentence: req.body.sentence
    })

    console.log("created new user word: " + newWord)

    newWord.save()
    .then(
        newUser => {
            console.log("saved new word")
            return res.json(newUser)
        }
    ).catch(function(error){
        console.log(error);
        console.log("failed to save word: " + error)
    });
})

module.exports = router;