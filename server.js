const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const app = express();
require('./app/routes/note.routes.js')(app);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.json({
		"message": "Welcome."
	})
});

app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
	console.log("Successfully connected to the database");
}).catch(err => {
	console.log('Can\'t connect to the database', err);
	process.exit();
});