const cron = require('node-cron');
const ScheduledPost = require('../models/ScheduledPost');
const PostHistory = require('../models/PostHistory');
const facebookService = require('../services/facebookService');
const cryptoService = require('../services/cryptoService');
const FacebookPage = require('../models/FacebookPage');
const path = require('path');
const fs = require('fs');

// Run every minute
cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    
    // Find posts that are due to be published
    const duePosts = await ScheduledPost.find({
      status: 'pending',
      scheduledAt: { $lte: now }
    });

    if (duePosts.length === 0) return;
    
    console.log(`[Scheduler] Found ${duePosts.length} post(s) to publish...`);

    for (const post of duePosts) {
      // Mark as processing
      post.status = 'processing';
      await post.save();

      try {
        const publishResults = [];
        const pageIds = post.selectedPages.map(p => p.pageId);

        // Fetch pages to get access tokens
        const pages = await FacebookPage.find({
          pageId: { $in: pageIds },
          ownerUserId: post.ownerUserId
        });

        // Resolve absolute path for the file if it exists
        let filePath = null;
        if (post.fileName) {
          filePath = path.join(__dirname, '../uploads', post.fileName);
        }

        // Publish to each page concurrently
        const publishPromises = pages.map(async (page) => {
          const decryptedToken = cryptoService.decrypt(page.pageAccessToken);
          
          try {
            let postId = null;

            if (post.mediaType === 'image' && filePath) {
              postId = await facebookService.publishImagePost(
                page.pageId,
                decryptedToken,
                post.content,
                filePath
              );
            } else if (post.mediaType === 'video' && filePath) {
              postId = await facebookService.publishVideoPost(
                page.pageId,
                decryptedToken,
                post.content,
                filePath
              );
            } else {
              postId = await facebookService.publishTextPost(
                page.pageId,
                decryptedToken,
                post.content
              );
            }

            return {
              pageId: page.pageId,
              pageName: page.pageName,
              status: 'success',
              postId: postId,
            };
          } catch (err) {
            console.error(`[Scheduler] Failed to publish to page ${page.pageName}:`, err.message);
            return {
              pageId: page.pageId,
              pageName: page.pageName,
              status: 'failed',
              error: err.message,
            };
          }
        });

        const results = await Promise.all(publishPromises);

        // Create a PostHistory record
        const history = new PostHistory({
          ownerUserId: post.ownerUserId,
          content: post.content,
          mediaUrl: post.mediaUrl,
          mediaType: post.mediaType,
          selectedPages: post.selectedPages,
          publishStatus: results,
        });

        await history.save();

        // Mark as completed
        post.status = 'completed';
        await post.save();

        console.log(`[Scheduler] Post ${post._id} published successfully.`);

        // Optionally, delete the uploaded file after successful publish
        if (filePath && fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }

      } catch (err) {
        console.error(`[Scheduler] Error processing post ${post._id}:`, err.message);
        post.status = 'failed';
        post.error = err.message;
        await post.save();
      }
    }

  } catch (error) {
    console.error('[Scheduler] Cron job error:', error.message);
  }
});
