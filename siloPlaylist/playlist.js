const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let Playlist = new Schema({
  nom: {
    type: String
  },
  videos: {
    type: Array
  },
  username: {
    type: String
  }
},{
    collection: 'playlist'
});

module.exports = mongoose.model('playlist', Playlist);