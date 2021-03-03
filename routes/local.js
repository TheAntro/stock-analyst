const express = require('express');
const local = require('../controllers/local');

const router = express.Router({ mergeParams: true });

router.route('/:filename').get(local.getAllData);
router.route('/:filename/:from/:to').get(local.getDataBetweenDates);
router.route('/bull/:filename/:from/:to').get(local.longestBullBetweenDates);
router.route('/sort/:filename/:from/:to').get(local.descendingVolumeAndPriceChange);
router.route('/sma5/:filename/:from/:to').get(local.bestOpeningPrice);

module.exports = router;