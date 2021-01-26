// playlist.route.js

const express = require('express');
const app = express();
const playlistController = express.Router();
var MongoClient = require('mongodb').MongoClient;
// Require playlist model in our routes module
let Playlist = require('../siloPlaylist/playlist');
 
// Defined store route
playlistController.route('/add').post(function (req, res) {
    
    let playlist = new Playlist(req.body);
    console.log(">> " + playlist);

    playlist.save()
    .then(playlist => {
      res.status(200).json({'playlist': 'playlist is added successfully'});
      console.log("success");
    })
    .catch(err => {
        console.log("error");
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
playlistController.route('/:user').get(function (req, res) {
    
    
    let nom = req.params.user;
    console.log("get() " + nom);
    const query = { username: nom };

    Playlist.find(query, function (err, playlists){
    if(err){
      console.log(err);
    }
    else {
      res.json(playlists);
    }
  });
});

// Defined edit route
playlistController.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Playlist.findById(id, function (err, playlist){
      res.json(playlist);
  });
});
//  Defined update route
playlistController.route('/update/:id').post(function (req, res) {
    Playlist.findById(req.params.id, function(err, playlist) {
    if (!playlist)
      return next(new Error('Could not load Document'));
    else {
        playlist.nom = req.body.nom;
        playlist.videos = req.body.videos;

        playlist.save().then(playlist => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});
// Defined delete | remove | destroy route
playlistController.route('/delete/:id').delete(function (req, res) {
    console.log("ici" + req.params.id);
    Playlist.findOneAndRemove({_id: req.params.id}, function(err, id){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

playlistController.route('/addVideo/:name').post(function (req, res) {
  let nom = req.params.name;
  const query = {nom: nom}

  Playlist.findOneAndUpdate(query,
    {$push: {videos: req.body}},
    function(err, doc) {
        if(err){
        console.log(err);
        }else{
        //do stuff
        }
    }
);


});


module.exports = playlistController;