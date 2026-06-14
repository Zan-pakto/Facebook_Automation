'use client';

import { FacebookPage } from '@/types';
import { Globe, ThumbsUp, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

interface PostPreviewProps {
  selectedPages: FacebookPage[];
  content: string;
  mediaPreview: string | null;
  mediaType: 'text' | 'image' | 'video';
}

export default function PostPreview({
  selectedPages,
  content,
  mediaPreview,
  mediaType,
}: PostPreviewProps) {
  // Determine page name and picture to display in the mockup
  const activePage = selectedPages.length > 0 ? selectedPages[0] : null;
  const pageName = activePage ? activePage.pageName : 'Your Facebook Page';
  const pagePicture = activePage?.picture || null;
  const pageCategory = activePage?.category || 'Business Service';

  return (
    <div className="w-full max-w-lg rounded-2xl border border-border bg-card text-card-foreground font-sans shadow-xl overflow-hidden animate-fade-in">
      {/* Header Info */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {pagePicture ? (
            <img
              src={pagePicture}
              alt={pageName}
              className="w-10 h-10 rounded-full border border-border object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-sm uppercase">
              {pageName.substring(0, 2)}
            </div>
          )}
          
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm hover:underline cursor-pointer text-foreground">
                {pageName}
              </span>
              {selectedPages.length > 1 && (
                <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  +{selectedPages.length - 1} more
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
              <span>Just now</span>
              <span>&bull;</span>
              <Globe className="w-3 h-3" />
            </div>
          </div>
        </div>

        <button className="text-muted-foreground hover:bg-muted/30 p-2 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3 text-sm leading-relaxed whitespace-pre-wrap break-words">
        {content || (
          <span className="text-muted-foreground italic">Type your post content in the composer to preview...</span>
        )}
      </div>

      {/* Media Content */}
      {mediaPreview && (
        <div className="bg-black border-y border-border flex items-center justify-center max-h-[360px] overflow-hidden">
          {mediaType === 'image' ? (
            <img
              src={mediaPreview}
              alt="Uploaded preview"
              className="w-full object-contain max-h-[360px] hover:scale-[1.01] transition-transform duration-300"
            />
          ) : (
            <video
              src={mediaPreview}
              controls
              className="w-full max-h-[360px]"
            />
          )}
        </div>
      )}

      {/* Live metrics indicator */}
      <div className="px-4 py-2 border-b border-border flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-[#1877f2] flex items-center justify-center">
            <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
          </div>
          <span>0</span>
        </div>
        <div className="flex gap-2">
          <span>0 comments</span>
          <span>&bull;</span>
          <span>0 shares</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-2 py-1 flex items-center justify-around text-sm font-semibold text-muted-foreground">
        <button className="flex-1 py-2 flex items-center justify-center gap-2 hover:bg-muted/30 rounded-lg transition-colors cursor-pointer">
          <ThumbsUp className="w-4 h-4" />
          <span>Like</span>
        </button>
        <button className="flex-1 py-2 flex items-center justify-center gap-2 hover:bg-muted/30 rounded-lg transition-colors cursor-pointer">
          <MessageCircle className="w-4 h-4" />
          <span>Comment</span>
        </button>
        <button className="flex-1 py-2 flex items-center justify-center gap-2 hover:bg-muted/30 rounded-lg transition-colors cursor-pointer">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}
