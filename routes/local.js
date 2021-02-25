const express = require('express');
const { getAllData } = require('../controllers/local');

const router = express.Router({ mergeParams: true });

router.route('/:fileName').get(getAllData);

module.exports = router;