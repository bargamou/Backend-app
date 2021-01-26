const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let Advertiser = new Schema({
  content: {
    type: String
  },
  username:{
    type: String
  },
  video: {
    type: String
  }
  
},{
    collection: 'advertiser'
});

module.exports = mongoose.model('advertiser', Advertiser);