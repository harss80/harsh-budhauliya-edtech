const { Schema, model, Types } = require('mongoose');

const NotificationSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  readBy: { type: [Types.ObjectId], default: [] },
}, { timestamps: true });

module.exports = model('Notification', NotificationSchema);
