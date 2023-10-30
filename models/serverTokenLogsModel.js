const mongoose = require('mongoose');

const serverTokenLogsSchema = new mongoose.Schema(
  {
    aws_instanceId: {
      type: String,
      default: null
    },
    token: {
      type: String,
      default: null
    },
    isExpired: {
      type: Boolean,
      default: false
    },
    expiredDate: {
      type: Date,
      default: null
    },
    proxyType: {
      type: String,
      default: null
    },
    proxyPort: {
      type: Number,
      default: null
    },
    platform: {
      type: String,
      default: "node"
    },
    tokenUsedcounter: {
      type: Number,
      default: 0
    }
  },
  { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } }
);

serverTokenLogsSchema.index({
  aws_instanceId: 1,
  isExpired: 1,
  created_date: -1
});

serverTokenLogsSchema.index({
  token: 1
});

serverTokenLogsSchema.index({
  created_date: 1
});

serverTokenLogsSchema.index({
  aws_instanceId: 1,
  proxyType: 1,
  isExpired: 1,
  created_date: -1
});

const serverTokenLogsModel = mongoose.model(
  'serverTokenLogsModel',
  serverTokenLogsSchema,
  'serverTokenLogs'
);
module.exports = {
  serverTokenLogsModel
};
