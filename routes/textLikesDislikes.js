var express = require("express")
var router = express.Router()

// readingText  Model
const textLikesDislikes = require('../models/textLikesDislikes');

//localhost:9000/texts
router.get("/", function(req, res, next){
  // using mongoose 
    console.log("getting text likes / dislikes")    
    textLikesDislikes.find({type: "story"}).then((items) => { 
      console.log("got from db: " + items)   
      res.send(items)
    })
    // res.send("api is working 2")  //works
});


module.exports = router