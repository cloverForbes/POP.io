require('dotenv').config();

const express  = require('express'),
      app      = express(),
      port     = process.env.PORT || 8080,
      mongoose = require('mongoose');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials","true");
    next();
});


app.use(require('./app/routes'));


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI);

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
   console.log('Connection successful');
   app.listen(port, () =>{
       console.log(`App is listening on ${port}`)
   })
});

