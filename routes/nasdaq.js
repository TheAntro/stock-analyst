const express = require('express');
const nasdaq = require('../controllers/nasdaq');

const router = express.Router({ mergeParams: true });

router.route('/:stockTicker/:from/:to').get(nasdaq.getAllData);

module.exports = router;