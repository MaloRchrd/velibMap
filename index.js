const express = require('express');
const MongoClient = require('mongodb').MongoClient
const pug = require('pug');
var app = express();
const db = require('./db');

// var ip = 192.168.104.217
var URL = 'mongodb://localhost:27017/velibs' // distant

// var URL = 'mongodb://192.168.104.217:27017/paris' // distant
var connectDB;

app.locals.pretty = true;

app.use('/img',express.static(__dirname+'/img'))
app.use('/css',express.static(__dirname+'/css'))
app.use('/vendor',express.static(__dirname+'/vendor'))

app.get('/',function (req,res) {
  res.render('home');
});


app.get('/liste',function (req,res) {
  db.get().collection('velibloc').find().toArray(function(err,data) {
    if (err) {
      return err
    }
    // console.log(data);
      res.render('liste',{velibs: data});

  });

});

app.get('/carte',function (req,res) {
  db.get().collection('velibloc').find().toArray(function(err,data) {
    if (err) {
      return err
    }
    console.log(data);
      res.render('map',{velibs: data});

  });

});




var apiKey = "1c08813a2a299eb5e7104fe0ebddcf9ec73e2cc4";

app.set('view engine','pug');
app.set('views', __dirname + '/views');



db.connect(URL, function (err,db) {
  if (err) {
    return err
  }
  console.log('velib db connected');
  connectDB = db;

});

var serveur = app.listen(8080,function () {
  console.log('serveur open on port 8080');
});
