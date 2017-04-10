var express = require('express');
const http = require('http');
var bodyParser = require('body-parser')
var app = express();
var cors = require('cors')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('./users.js')(mongoose);

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mydb');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

});

const corsOption = {
  origin: "*",
  credentials: true
}

app.use('/', cors(corsOption));

app.post('/user', function (req, res) {
  User.insertUser(req.body, () => res.end('Inserted'))
})

app.get('/users', function (req, res) {
  User.getAllUsers((err, users) => err ? res.status(500).end() : res.json(users))
});

app.get('/user/:userid', (req, res) => {
  User.get(req.params.userid, (err, user) => err ? res.status(500).end() : res.json(user))
})

app.put('/update/:userid', (req, res) => {
  User.updateUser(req.params.userid, req.body, (err) => err ? res.status(500).end() : res.end('Changed'))
})

app.delete('/delete/:userid', (req, res) => {
  User.removeUser(req.params.userid, (err) => err ? res.status(500).end() : res.end("Removed"))
})

const SERVER = http.createServer(app);
SERVER.listen(3000, function () {
  console.log('SERVER listening on port 3000!')
})


