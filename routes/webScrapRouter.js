const express = require('express');
const router = express.Router();
const webScrapController = require('../controllers/webScrapController');

router.get('/saveTmToken', webScrapController.saveTmToken);
router.get(
  '/getEventUnlockOfferToken',
  webScrapController.getEventUnlockOfferToken
);

module.exports = router;
