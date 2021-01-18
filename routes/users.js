var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('users get response');
});

// @route   POST api/user/create
// @desc    Create An Item
// @access  Public
//for first log in - upsert
router.post('/create', (req, res) => {
  console.log(req.body.firstName);
  console.log(req.body.lastName);
  console.log(req.body.email);
  console.log(req.body.id);

  const newUser = new User({
    firstName: req.body.firstName,     
    lastName: req.body.lastName,
    id: req.body.id
  })

  newUser.save()
  .then(
    newUser => res.json(newUser)
  )
  .catch(function(error){
    console.log(error);
  });
});

module.exports = router;
