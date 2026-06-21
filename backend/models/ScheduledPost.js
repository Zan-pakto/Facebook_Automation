const mongoose = require('mongoose');

const scheduledPostSchema = new mongoose.Schema({
  ownerUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  mediaType: {
    type: String,
    enum: ['text', 'image', 'video'],
    default: 'text'
  },
  fileName: {
    type: String,
    default: null
  },
  selectedPages: [{
    pageId: String,
    pageName: String
  }],
  scheduledAt: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  error: {
    type: String,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('ScheduledPost', scheduledPostSchema);
