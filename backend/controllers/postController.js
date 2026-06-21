const FacebookPage = require('../models/FacebookPage');
const PostHistory = require('../models/PostHistory');
const ScheduledPost = require('../models/ScheduledPost');
const facebookService = require('../services/facebookService');
const cryptoService = require('../services/cryptoService');
const path = require('path');

/**
 * Publish a post to multiple pages
 * POST /api/posts/publish
 */
const publishPost = async (req, res) => {
  try {
    const { content } = req.body;
    let { pageIds } = req.body;

    // Handle multipart form parsing for pageIds which might be a JSON string
    if (typeof pageIds === 'string') {
      try {
        pageIds = JSON.parse(pageIds);
      } catch (err) {
        return res.status(400).json({ message: 'Invalid pageIds format. Expected JSON array.' });
      }
    }

    if (!pageIds || !Array.isArray(pageIds) || pageIds.length === 0) {
      return res.status(400).json({ message: 'At least one Facebook Page must be selected.' });
    }

    // Determine media parameters
    let mediaType = 'text';
    let mediaUrl = null;
    let filePath = null;

    if (req.file) {
      const mimetype = req.file.mimetype;
      filePath = req.file.path;
      // Statically accessible URL path
      mediaUrl = `/uploads/${req.file.filename}`;

      if (mimetype.startsWith('image/')) {
        mediaType = 'image';
      } else if (mimetype.startsWith('video/')) {
        mediaType = 'video';
      } else {
        return res.status(400).json({ message: 'Unsupported file type. Only images and videos are allowed.' });
      }
    }

    if (mediaType === 'text' && (!content || content.trim() === '')) {
      return res.status(400).json({ message: 'Post content cannot be empty for text posts.' });
    }

    // 1. Fetch the selected pages from DB to get their access tokens
    const pages = await FacebookPage.find({
      pageId: { $in: pageIds },
      ownerUserId: req.user._id,
    });

    if (pages.length === 0) {
      return res.status(400).json({ message: 'Selected pages not found in database.' });
    }

    const selectedPagesList = pages.map(p => ({ pageId: p.pageId, pageName: p.pageName }));

    // 2. Publish to each page concurrently
    const publishPromises = pages.map(async (page) => {
      const decryptedToken = cryptoService.decrypt(page.pageAccessToken);
      
      try {
        let postId = null;

        if (mediaType === 'image') {
          postId = await facebookService.publishImagePost(
            page.pageId,
            decryptedToken,
            content,
            filePath
          );
        } else if (mediaType === 'video') {
          postId = await facebookService.publishVideoPost(
            page.pageId,
            decryptedToken,
            content,
            filePath
          );
        } else {
          // Text-only
          postId = await facebookService.publishTextPost(
            page.pageId,
            decryptedToken,
            content
          );
        }

        return {
          pageId: page.pageId,
          pageName: page.pageName,
          status: 'success',
          postId: postId,
        };
      } catch (err) {
        console.error(`Failed to publish to page ${page.pageName}:`, err.message);
        return {
          pageId: page.pageId,
          pageName: page.pageName,
          status: 'failed',
          error: err.message,
        };
      }
    });

    const publishResults = await Promise.all(publishPromises);

    // 3. Save to database history
    const history = new PostHistory({
      ownerUserId: req.user._id,
      content: content || '',
      mediaUrl: mediaUrl,
      mediaType: mediaType,
      selectedPages: selectedPagesList,
      publishStatus: publishResults,
    });

    await history.save();

    res.status(201).json({
      message: 'Publishing process completed',
      post: history,
    });
  } catch (err) {
    console.error('Publish Post General Error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get posting history
 * GET /api/posts/history
 */
const getHistory = async (req, res) => {
  try {
    const history = await PostHistory.find({ ownerUserId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error('Get History Error:', err.message);
    res.status(500).json({ message: err.message });
  }
};
/**
 * Schedule a post for later
 * POST /api/posts/schedule
 */
const schedulePost = async (req, res) => {
  try {
    const { content, scheduledAt } = req.body;
    let { pageIds } = req.body;

    if (!scheduledAt) {
      return res.status(400).json({ message: 'Scheduled date and time is required.' });
    }

    const scheduledDate = new Date(scheduledAt);
    if (scheduledDate <= new Date()) {
      return res.status(400).json({ message: 'Scheduled time must be in the future.' });
    }

    if (typeof pageIds === 'string') {
      try {
        pageIds = JSON.parse(pageIds);
      } catch (err) {
        return res.status(400).json({ message: 'Invalid pageIds format. Expected JSON array.' });
      }
    }

    if (!pageIds || !Array.isArray(pageIds) || pageIds.length === 0) {
      return res.status(400).json({ message: 'At least one Facebook Page must be selected.' });
    }

    let mediaType = 'text';
    let mediaUrl = null;
    let fileName = null;

    if (req.file) {
      const mimetype = req.file.mimetype;
      fileName = req.file.filename;
      mediaUrl = `/uploads/${req.file.filename}`;

      if (mimetype.startsWith('image/')) {
        mediaType = 'image';
      } else if (mimetype.startsWith('video/')) {
        mediaType = 'video';
      } else {
        return res.status(400).json({ message: 'Unsupported file type. Only images and videos are allowed.' });
      }
    }

    if (mediaType === 'text' && (!content || content.trim() === '')) {
      return res.status(400).json({ message: 'Post content cannot be empty for text posts.' });
    }

    const pages = await FacebookPage.find({
      pageId: { $in: pageIds },
      ownerUserId: req.user._id,
    });

    if (pages.length === 0) {
      return res.status(400).json({ message: 'Selected pages not found in database.' });
    }

    const selectedPagesList = pages.map(p => ({ pageId: p.pageId, pageName: p.pageName }));

    const scheduledPost = new ScheduledPost({
      ownerUserId: req.user._id,
      content: content || '',
      mediaUrl: mediaUrl,
      mediaType: mediaType,
      fileName: fileName,
      selectedPages: selectedPagesList,
      scheduledAt: scheduledDate,
      status: 'pending'
    });

    await scheduledPost.save();

    res.status(201).json({
      message: 'Post scheduled successfully',
      post: scheduledPost,
    });
  } catch (err) {
    console.error('Schedule Post Error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get upcoming scheduled posts
 * GET /api/posts/scheduled
 */
const getScheduledPosts = async (req, res) => {
  try {
    const scheduledPosts = await ScheduledPost.find({ 
      ownerUserId: req.user._id,
      status: { $in: ['pending', 'processing'] }
    }).sort({ scheduledAt: 1 });
    
    res.json(scheduledPosts);
  } catch (err) {
    console.error('Get Scheduled Posts Error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Cancel a scheduled post
 * DELETE /api/posts/scheduled/:id
 */
const cancelScheduledPost = async (req, res) => {
  try {
    const post = await ScheduledPost.findOne({ 
      _id: req.params.id, 
      ownerUserId: req.user._id 
    });

    if (!post) {
      return res.status(404).json({ message: 'Scheduled post not found.' });
    }

    if (post.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot cancel a post that is already processing or completed.' });
    }

    if (post.fileName) {
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(__dirname, '../uploads', post.fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await ScheduledPost.deleteOne({ _id: post._id });

    res.json({ message: 'Scheduled post cancelled successfully.' });
  } catch (err) {
    console.error('Cancel Scheduled Post Error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  publishPost,
  getHistory,
  schedulePost,
  getScheduledPosts,
  cancelScheduledPost,
};
