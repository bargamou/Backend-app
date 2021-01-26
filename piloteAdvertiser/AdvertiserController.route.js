// advertiser.route.js

const express = require('express');
const app = express();
const advertiserController = express.Router();
var MongoClient = require('mongodb').MongoClient;
// Require advertiser model in our routes module
let Advertiser = require('../siloAdvert/advertiser');
 
// Defined store route
advertiserController.route('/add').post(function (req, res) {
    
    let advertiser = new Advertiser(req.body);
    console.log(">> " + advertiser);

    advertiser.save()
    .then(advertiser => {
      res.status(200).json({'advertiser': 'advertiser is added successfully'});
      console.log("success");
    })
    .catch(err => {
        console.log("error");
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
advertiserController.route('/:user').get(function (req, res) {
    
  let nom = req.params.user;
  console.log("get() " + nom);
  const query = { username: nom };

  Advertiser.find(query, function (err, annonces){
  if(err){
    console.log(err);
  }
  else {
    res.json(annonces);
  }
});
});

advertiserController.route('/').get(function (req, res) {
  Advertiser.find(function (err, annonces){
  if(err){
    console.log(err);
  }
  else {
    res.json(annonces);
  }
});
});

// Defined edit route
advertiserController.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Advertiser.findById(id, function (err, advertiser){
      res.json(advertiser);
  });
});

// Defined delete | remove | destroy route
advertiserController.route('/delete/:id').get(function (req, res) {
    Advertiser.findByIdAndRemove({_id: req.params.id}, function(err, id){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = advertiserController;