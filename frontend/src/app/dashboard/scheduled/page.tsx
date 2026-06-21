'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postService, getMediaUrl } from '@/services/api';
import { ScheduledPost } from '@/types';
import { Clock, Calendar, Image as ImageIcon, Video as VideoIcon, Trash2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ScheduledPosts() {
  const queryClient = useQueryClient();

  const { data: posts = [], isLoading } = useQuery<any[]>({
    queryKey: ['scheduledPosts'],
    queryFn: postService.getScheduledPosts,
  });

  const cancelMutation = useMutation({
    mutationFn: postService.cancelScheduledPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduledPosts'] });
      alert('Scheduled post cancelled successfully.');
    },
    onError: (error: any) => {
      const errMsg = error.response?.data?.message || error.message;
      alert(`Failed to cancel post: ${errMsg}`);
    }
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Scheduled Posts</h1>
        <p className="text-muted-foreground text-xs mt-1">View and manage your upcoming post queue.</p>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-muted-foreground text-sm">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            Loading scheduled posts...
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground">No Upcoming Posts</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm">
              You don't have any posts scheduled for the future. Head over to the Composer to schedule one!
            </p>
            <Link 
              href="/dashboard/composer" 
              className="mt-6 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-semibold transition-colors"
            >
              Go to Composer
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {posts.map((post) => (
              <div key={post._id} className="p-6 hover:bg-muted/30 transition-colors">
                <div className="flex flex-col md:flex-row gap-6">
                  
                  {/* Left Column: Media Preview */}
                  <div className="w-full md:w-48 shrink-0">
                    <div className="aspect-square bg-muted/50 rounded-xl border border-border flex items-center justify-center overflow-hidden relative">
                      {post.mediaUrl ? (
                        post.mediaType === 'video' ? (
                          <div className="relative w-full h-full">
                            <video src={getMediaUrl(post.mediaUrl)} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <VideoIcon className="w-8 h-8 text-white drop-shadow-md" />
                            </div>
                          </div>
                        ) : (
                          <img src={getMediaUrl(post.mediaUrl)} alt="Post media" className="w-full h-full object-cover" />
                        )
                      ) : (
                        <div className="flex flex-col items-center text-muted-foreground">
                          <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                          <span className="text-[10px] font-semibold uppercase tracking-wider">Text Only</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Details */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span className="text-xs font-semibold text-accent">
                          {new Date(post.scheduledAt).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md ${
                          post.status === 'processing' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          {post.status}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-foreground line-clamp-3 whitespace-pre-wrap font-medium">
                        {post.content || <span className="text-muted-foreground italic">No text content</span>}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <h4 className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2">
                        Targeting {post.selectedPages?.length || 0} Pages
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {post.selectedPages?.map((page: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs">
                            <span className="truncate max-w-[150px] font-medium">{page.pageName}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to cancel this scheduled post?')) {
                            cancelMutation.mutate(post._id);
                          }
                        }}
                        disabled={cancelMutation.isPending || post.status === 'processing'}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Cancel Post
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
