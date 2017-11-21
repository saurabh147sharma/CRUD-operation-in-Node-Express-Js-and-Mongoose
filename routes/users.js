var express = require('express');
var router = express.Router();

var User = require('../schema/user');

/* GET home page. */
router.get('/', function(req, res) {
  User.find({role: { $ne: 1 }}, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.render('users', { successMsg: req.flash('successMsg'),errorMsg: req.flash('errorMsg'), users: users });
    }
}); 
});


/* GET register page. */
router.get('/register', function(req, res) {
    res.render('register', { title: 'Register' });
});

/* REGISTER USER. */
router.post('/register', function(req, res) {
  var data = new User(req.body);
  data.save(function(err){
   if(err){
    res.render('register', { message: 'Invalid request!' });
   }else{
    res.render('register', { message: 'User registered successfully!'});
   } 
  })
 });



  /* GET SINGLE User BY ID */
router.get('/edit/:id', function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.render('edit-user', { errorMsg: req.flash('errorMsg'),successMsg: req.flash('successMsg'), userDetail: user });
    }
  });
});

/* UPDATE User */
router.post('/edit/:id', function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err) {
    if(err){
      req.flash('errorMsg', 'Something went wrong! User could not updated.');
      res.redirect('/users/edit/'+req.params.id);
  } else {
    req.flash('successMsg', 'User updated successfully.');
    res.redirect('/users/edit/'+req.params.id);
  }
  });
});


 /* DELETE User BY ID */
router.get('/destroy/:id', function(req, res) {
  User.findByIdAndRemove(req.params.id, function (err, project) {
    if (err) {
      req.flash('errorMsg', 'User not deleted successfully.');
      res.redirect('/users');
    } else {
      req.flash('successMsg', 'User deleted successfully.');
      res.redirect('/users');
    }
  });
});

module.exports = router;