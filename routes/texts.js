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

// @route   GET texts/:language/:level/:type
// @desc    search with more
router.get('/criterias/:language/:level/:type', (req, res) => {
  console.log(`in server, in texts/:language/:level/:type,  language: ${req.params.language}, level: ${req.params.level}, type: ${req.params.type}`)  
  let $and = []
  if(req.params.language !== undefined && req.params.language != "" && req.params.language != "all"){
    $and.push({language: req.params.language})
  }
  if(req.params.level !== undefined && req.params.level != "" && req.params.level != "all"){
    $and.push({level: req.params.level})
  }
  if(req.params.type !== undefined && req.params.type != "" && req.params.type != "all"){
    $and.push({type: req.params.type})
  }

  var query = {$and}

  readingText.find(query).then((items) => { 
    res.send(items)
  })
})


module.exports = router