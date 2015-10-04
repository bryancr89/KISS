/**
 * Created by Fabricio Salazar on 10/3/2015.
 */

var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/settings', function (req, res) {
  fs.writeFile('./settings.json', JSON.stringify(req.body), function(err) {
    if(err) {
      return console.log(err);
    }
  });
  res.send('Changed');
});

app.get('/settings', function (req, res) {
  fs.readFile('./settings.json', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    res.send(data);
  });
});

var port = process.env.PORT || 8080;

app.listen(port);
console.log('Server running');
