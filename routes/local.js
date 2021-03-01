const express = require('express');
const { getAllData, getDataBetweenDates } = require('../controllers/local');

const router = express.Router({ mergeParams: true });

router.route('/:fileName').get(getAllData);
router.route('/:fileName/:from/:to').get(getDataBetweenDates);

module.exports = router;