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

// @route   POST userWords/addUserWord
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

    console.log("created new user word")

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

// @route   POST userWords/addUserWord
// @desc    search with more
router.post('/add1tocorrectanswer', (req, res) => {
    console.log("in add1tocorrectanswer")
    
    var fieldName = req.body.fieldName

    var incrementObject = {}
    incrementObject[fieldName] = 1
    var obj = {$inc: incrementObject}

    UserWord.findByIdAndUpdate(req.body.id, obj)
    .then(() => {
        console.log("added 1 to " + fieldName)
        res.send("success")
    }).catch(function(error){
        console.log(error);
        console.log("failed to update correct answers: " + error)        
    });
})

// @route   GET userWords/deleteUserWord
// @desc    search with more
router.get('/deleteUserWord/:wordID', (req, res) => {
    console.log(`in   userWords/getUserWords/${req.params.wordID}`)  
  
    var query = {_id: req.params.wordID}
  
    UserWord.deleteOne(query).then(() => { 
      res.send("")
    })
})


module.exports = router;