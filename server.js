const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB'); 

    const userController = require('./piloteUser/UserController.route');
    const playlistController = require('./piloteUser/PlaylistController.route');
    const advertiserController = require('./piloteAdvertiser/AdvertiserController.route');
    const videoController = require('./piloteUser/VideoController.route');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/user', userController); 
    app.use('/playlist', playlistController); 
    app.use('/advertiser', advertiserController); 
    app.use('/video', videoController); 
    const port = process.env.PORT || 4000;

    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });