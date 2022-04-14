const router = require('express').Router();
const Category = require('../models/Category');

// CREATE NEW CATEGORY
router.post('/', async (req, res) => {
	let newCat = new Category(req.body);
	newCat.name = newCat.name.toLowerCase();
	try {
		const getCats = await Category.find();
		const filterCats = getCats.filter(
			(g) => g.name.toLowerCase() === newCat.name.toLowerCase()
		);

		if (!filterCats.length) {
			const savedCat = await newCat.save();
			res.status(200).json(savedCat);
		} else {
			res.status(200).json({ msg: 'category exists!' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET ALL CATEGORIES
router.get('/', async (req, res) => {
	try {
		const cats = await Category.find();
		res.status(200).json(cats);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
