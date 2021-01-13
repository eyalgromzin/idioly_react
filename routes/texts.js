var express = require("express")
var router = express.Router()

// readingText  Model
const readingText = require('../models/readingText');

//localhost:9000/texts
router.get("/", function(req, res, next){
  // using mongoose 
    console.log("getting reading texts")
    var query = {createdOn: 1609063880301}  //suppose to return "EL CRIMENDE LA CALLE DE LA PERSEGUIDA"
    readingText.find().then((items) => { 
      res.send(items)
    })
    // res.send("api is working 2")  //works
});


module.exports = router