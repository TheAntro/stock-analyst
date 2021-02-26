const express = require('express');
const { getNasdaqData } = require('../controllers/nasdaq');

const router = express.Router({ mergeParams: true });

router.route('/:stockTicker/:from/:to').get(getNasdaqData);

module.exports = router;