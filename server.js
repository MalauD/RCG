var express = require('express');
const RCGTitle = require('./Server/RCGTitle');
var app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');

var key = fs.readFileSync('Encryption/key.pem');
var cert = fs.readFileSync('Encryption/cert.pem');

var options = {
	key: key,
	cert: cert,
	passphrase: 'rcgestlemeilleurdessitesweb'
};

RCGTitle.Say();
// var Queries = new sqlquery();

app.use(require('./Server/Routes/index'));

//! For demo purpose (http)
https.createServer(options, app).listen(8080);
