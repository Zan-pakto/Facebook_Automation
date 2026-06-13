const mongoose = require('mongoose');

const facebookPageSchema = new mongoose.Schema({
  pageId: {
    type: String,
    required: true
  },
  pageName: {
    type: String,
    required: true
  },
  pageAccessToken: {
    type: String,
    required: true
  },
  ownerUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String
  },
  picture: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure uniqueness of pages per user
facebookPageSchema.index({ pageId: 1, ownerUserId: 1 }, { unique: true });

module.exports = mongoose.model('FacebookPage', facebookPageSchema);
