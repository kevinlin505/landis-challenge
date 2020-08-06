const express = require('express');
const router = express.Router();
const Account = require('../models/account');

// GET all accounts
router.get('/', async (req, res) => {
	try {
		const accounts = await Account.find();

		res.json(accounts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
	res.send('test');
});

// GET an accounts
router.get('/:id', getAccount, async (req, res) => {
	res.send(res.account);
});

// Create an account
router.post('/', async (req, res) => {
	const account = new Account(req.body);

	try {
		const newAccount = await account.save();
		res.status(201).json(newAccount);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Update an account
router.patch('/:id', getAccount, async (req, res) => {
	const ALLOWED_FIELDS = [
		'tags',
		'picture',
		'employer',
		'email',
		'phone',
		'address',
		'comments',
	];
	try {
		Object.keys(req.body).map((key) => {
			// Should only update fields that are allowed to update
			if (req.body[key] !== null && ALLOWED_FIELDS.includes(key)) {
				res.account[key] = req.body[key];
			}
		});

		const updatedAccount = await res.account.save();
		res.json(updatedAccount);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// DELETE an account
router.delete('/:id', getAccount, async (req, res) => {
	try {
		await res.account.remove();
		res.json({ message: 'Account deleted' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// middleware to grab account by request id
async function getAccount(req, res, next) {
	try {
		const account = await Account.findById(req.params.id);
		res.account = account;

		if (account == null) {
			res.status(404).json({ message: 'Account cannot be found!' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}

	next();
}

module.exports = router;
