const express = require('express');
const local = require('../controllers/local');

const router = express.Router({ mergeParams: true });

router.route('/:fileName').get(local.getAllData);
router.route('/:fileName/:from/:to').get(local.getDataBetweenDates);

module.exports = router;