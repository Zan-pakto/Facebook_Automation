const mongoose = require('mongoose');

const publishStatusSchema = new mongoose.Schema({
  pageId: { type: String, required: true },
  pageName: { type: String, required: true },
  status: { type: String, enum: ['success', 'failed'], required: true },
  postId: { type: String },
  error: { type: String }
}, { _id: false });

const postHistorySchema = new mongoose.Schema({
  ownerUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String
  },
  mediaUrl: {
    type: String
  },
  mediaType: {
    type: String,
    enum: ['text', 'image', 'video'],
    required: true
  },
  selectedPages: [
    {
      pageId: { type: String, required: true },
      pageName: { type: String, required: true }
    }
  ],
  publishStatus: [publishStatusSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PostHistory', postHistorySchema);
