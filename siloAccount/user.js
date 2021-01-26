
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let User = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  age: {
    type: Number,
    min: 18,
    max: 65
  },
  sexe: {
    type: String
  },
  nom: {
    type: String
  },
  prenom: {
      type: String
  },
  email: {
    type: String
  },
  role: {
    type: String
  }
},{
    collection: 'user'
});

module.exports = mongoose.model('User', User);