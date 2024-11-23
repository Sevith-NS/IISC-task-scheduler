const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  scheduleTime: { type: Date, required: true },
  isCompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', taskSchema);
