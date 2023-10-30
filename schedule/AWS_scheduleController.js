const webScrapService = require('../service/webScrapService');

class AWS_scheduleController {
  async scheduleAddTMTokenInAllInstance() {
    await webScrapService.saveTmToken();
  }
}

const scheduleExport = new AWS_scheduleController();
module.exports = scheduleExport;
