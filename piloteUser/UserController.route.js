// user.route.js

const express = require('express');
const app = express();
const userController = express.Router();
var MongoClient = require('mongodb').MongoClient;
// Require user model in our routes module
let User = require('../siloAccount/user');
 
// Defined store route
userController.route('/add').post(function (req, res) {
    
    let user = new User(req.body);
    console.log(">> " + user);

    user.save()
    .then(user => {
      res.status(200).json({'user': 'user is added successfully'});
      console.log("success");
    })
    .catch(err => {
        console.log("error");
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
userController.route('/').get(function (req, res) {
    console.log("get()");
    User.find(function (err, users){
    if(err){
      console.log(err);
    }
    else {
      res.json(users);
    }
  });
});

// Defined edit route
userController.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user){
      res.json(user);
  });
});
//  Defined update route
userController.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function(err, user) {
    if (!user)
      return next(new Error('Could not load Document'));
    else {
        console.log("username : " + req.body.username);
        user.username = req.body.username;
        user.password = req.body.password;
        user.age = req.body.age;
        user.sexe = req.body.sexe;
        user.nom = req.body.nom;
        user.prenom = req.body.prenom;
        user.email = req.body.email;

        user.save().then(user => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});
// Defined delete | remove | destroy route
userController.route('/delete/:id').delete(function (req, res) {
    console.log("delete" + req.params.id);
    User.findOneAndRemove({_id: req.params.id}, function(err, id){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = userController;