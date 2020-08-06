const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
	landis_id: {
		type: String,
	},
	balance: {
		type: String,
		default: '0',
	},
	credit: {
		type: Number,
	},
	picture: {
		type: String,
	},
	name_first: {
		type: String,
		required: true,
	},
	name_last: {
		type: String,
		required: true,
	},
	employer: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	comments: {
		type: String,
	},
	created: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	tags: {
		type: Array,
	},
});

module.exports = mongoose.model('Account', accountSchema);
