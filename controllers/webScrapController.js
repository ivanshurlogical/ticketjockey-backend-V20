const webScrapService = require('../service/webScrapService');

exports.saveTmToken = async (req, res) => {
  try {
    const reese84Cookie = await webScrapService.saveTmToken();
    if (reese84Cookie) {
      res.json({
        message: 'Tm Token saved successfully!',
        data: reese84Cookie,
      });
    } else {
      res.json({
        message: 'Unable to save TM token!',
        data: null,
      });
    }
  } catch (error) {
    res.json({
      message: 'Something went wrong!',
      data: null,
    });
  }
};

exports.getEventUnlockOfferToken = async (req, res) => {
  try {
    await webScrapService.getEventUnlockOfferToken();
    res.json({
      message: 'Offer tokens saved successfully!',
      data: null,
    });
  } catch (error) {
    res.json({
      message: 'Something went wrong!',
      data: null,
    });
  }
};
