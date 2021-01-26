const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let Video = new Schema({
  videoId: {
    type: String
  },
  videoUrl: {
    type: String
  },
  channelId: {
    type: String
  },
  channelUrl: {
    type: String
  },
  channelTitle: {
    type: String
  },
  title: {
    type: String
  },
  publishedAt: {
    type: Date
  },
  description: {
    type: String
  },
  description: {
    thumbnail: String
  }
},{
    collection: 'video'
});

module.exports = mongoose.model('video', Video);
