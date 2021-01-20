var express = require("express")
var router = express.Router()

const fetch = require('node-fetch');

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

router.post('/getHtml', (req, res) => {
  if(typeof req.body.url !== undefined){
    fetch(req.body.url)
      .then(res => res.text())
      .then(text => res.send(text))
  }
  
})

// @route   POST texts/create/
// @desc    create text
router.post('/create', (req, res) => {
  console.log("in texts/create/")

  //without body parse -  req.body is undefined :/
  const newText = new readingText({
    language: req.body.language,
    title: req.body.title,
    author: req.body.author,
    text: req.body.text,
    source: req.body.source,
    level: req.body.level,
    type: req.body.type,
    youtubeLink: req.body.youtubeLink,
    wordCount: req.body.wordCount,
    createdOn: req.body.createdOn,
    createdBy: req.body.createdBy,
  })

  console.log("created new text")

  newText.save()
  .then(
      newUser => {
          console.log("saved new text")
          return res.json(newText)
      }
  ).catch(function(error){
      console.log(error);
      console.log("failed to save text: " + error)
  });
})


module.exports = router