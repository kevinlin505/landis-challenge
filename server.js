require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.log('DB connection error:', error));
db.once('open', (error) => console.log('DB connected'));

app.use(express.json());

const accountsRouter = require('./routes/accounts');
app.use('/accounts', accountsRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`http://localhost:${3000}`);
});
