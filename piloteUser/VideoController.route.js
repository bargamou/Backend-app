// user.route.js

const express = require('express');
const app = express();
const videoController = express.Router();
var MongoClient = require('mongodb').MongoClient;
// Require user model in our routes module
let Video = require('../siloPlaylist/video');
 
// Defined store route
videoController.route('/add').post(function (req, res) {
    
    let video = new Video(req.body);
    console.log(">> " + video);

    video.save()
    .then(user => {
      res.status(200).json({'video': 'video is added successfully'});
      console.log("success");
    })
    .catch(err => {
        console.log("error");
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
videoController.route('/').get(function (req, res) {
    console.log("get() ici");
    Video.find(function (err, videos){
    if(err){
      console.log(err);
    }
    else {
      res.json(videos);
      console.log(videos);
    }
  });
});


module.exports = videoController;