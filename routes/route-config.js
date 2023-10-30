const express = require('express');
const router = express.Router();
const webScrapRouter = require('./webScrapRouter');

router.use('/web', webScrapRouter);

module.exports = router;
