console.log('May node be with you ');

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();
var db;

/* to extract data from <form> element & add them to the `body` property in the
`req` object */

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

MongoClient.connect(`mongodb://${process.env.DB_user}:${process.env.DB_paswd}@${process.env.DB_host}.mlab.com:35352/${process.env.DB_name}`, (err, client) => {

	if (err) return console.log('Connection error : ', err);
	db = client.db('lotza');
	app.listen(3030, function() {
		console.log('May sever be with you .. ');
		return ({status: 'true'});
	});

});

/* CRUD handlers */

app.get('/', (req, res) => {
	var cursor = db.collection('quotes').find().toArray((err, result) => {
		console.log('db results : ', result);
		res.render('index.ejs', {quotes: result});
	})
	//res.sendFile(__dirname + '/index.html');
});

app.post('/add_quote', (req, res) => {
	console.log("POST Req.");
	console.log("req.body : ", req.body);
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log('error : ', err);

		console.log('Quote saved to database');
		res.redirect('/');
	})
});
