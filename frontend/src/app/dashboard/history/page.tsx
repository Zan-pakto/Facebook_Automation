'use client';

import { useQuery } from '@tanstack/react-query';
import { postService, getMediaUrl } from '@/services/api';
import { PostHistory, PublishStatus } from '@/types';
import { useState } from 'react';
import { 
  History, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Image as ImageIcon,
  Video as VideoIcon,
  FileText,
  AlertCircle
} from 'lucide-react';

export default function PostHistoryPage() {
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  // Fetch posting history
  const { data: history = [], isLoading } = useQuery<PostHistory[]>({
    queryKey: ['postHistory'],
    queryFn: postService.getHistory,
  });

  const toggleExpand = (postId: string) => {
    setExpandedPostId(prev => (prev === postId ? null : postId));
  };

  const getMediaIcon = (type: 'text' | 'image' | 'video') => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-4 h-4 text-primary" />;
      case 'video':
        return <VideoIcon className="w-4 h-4 text-accent" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getOverallStatus = (publishStatus: PublishStatus[]) => {
    const successCount = publishStatus.filter(s => s.status === 'success').length;
    const totalCount = publishStatus.length;
    
    if (successCount === totalCount) {
      return {
        label: `Success (${successCount}/${totalCount})`,
        colorClass: 'bg-success/10 border-success/20 text-success',
        icon: <CheckCircle2 className="w-3.5 h-3.5" />
      };
    } else if (successCount === 0) {
      return {
        label: `Failed (0/${totalCount})`,
        colorClass: 'bg-red-500/10 border-red-500/20 text-red-400',
        icon: <XCircle className="w-3.5 h-3.5" />
      };
    } else {
      return {
        label: `Partial (${successCount}/${totalCount})`,
        colorClass: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500',
        icon: <AlertCircle className="w-3.5 h-3.5" />
      };
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-5xl mx-auto">
        {[1, 2, 3].map(n => (
          <div key={n} className="p-6 rounded-2xl glass-card animate-pulse space-y-4 h-32"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Campaign Publishing Logs</h1>
        <p className="text-muted-foreground text-xs mt-1">Audit past posts, view uploaded assets, and inspect Graph API response exceptions.</p>
      </div>

      {history.length === 0 ? (
        <div className="p-16 rounded-2xl border border-dashed border-white/10 text-center flex flex-col items-center justify-center bg-white/[0.01]">
          <History className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="font-bold text-slate-300">No Postings Found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mt-1 mb-6">
            You haven't run any publishing campaigns yet. Go to the Composer page to send your first bulk post.
          </p>
          <a
            href="/dashboard/composer"
            className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-semibold shadow-lg shadow-primary/10 transition-all"
          >
            Open Post Composer
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((post) => {
            const isExpanded = expandedPostId === post._id;
            const status = getOverallStatus(post.publishStatus);
            
            return (
              <div 
                key={post._id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isExpanded 
                    ? 'border-white/15 bg-[#121421]/45 shadow-lg' 
                    : 'border-white/5 bg-[#121421]/20 hover:border-white/10'
                }`}
              >
                {/* Header Section (Always Visible) */}
                <div 
                  onClick={() => toggleExpand(post._id)}
                  className="p-5 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    {/* Media Type Icon */}
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 shrink-0 flex items-center justify-center">
                      {getMediaIcon(post.mediaType)}
                    </div>
                    
                    {/* Title Details */}
                    <div className="min-w-0 flex-1 pr-4">
                      <p className="text-xs text-slate-300 font-semibold truncate break-all">
                        {post.content || <span className="italic opacity-55">Media post without caption</span>}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.createdAt).toLocaleDateString(undefined, { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                        <span>&bull;</span>
                        <span>{post.selectedPages.length} Target Pages</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Status Indicators */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${status.colorClass}`}>
                      {status.icon}
                      {status.label}
                    </span>
                    
                    <button className="text-muted-foreground hover:text-slate-200 p-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Expansion Section */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-1 border-t border-white/5 space-y-5 animate-slide-down">
                    
                    {/* Caption Detail */}
                    {post.content && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Caption text</span>
                        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 text-xs text-slate-300 whitespace-pre-wrap break-all leading-normal">
                          {post.content}
                        </div>
                      </div>
                    )}

                    {/* Media preview block */}
                    {post.mediaUrl && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Uploaded Attachment</span>
                        <div className="max-w-md border border-white/10 rounded-xl overflow-hidden bg-black/40 flex items-center justify-center max-h-[220px]">
                          {post.mediaType === 'image' ? (
                            <img 
                              src={getMediaUrl(post.mediaUrl)} 
                              alt="Post Media" 
                              className="object-contain max-h-[220px] w-full"
                            />
                          ) : (
                            <video 
                              src={getMediaUrl(post.mediaUrl)} 
                              controls
                              className="max-h-[220px] w-full"
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Channel-by-Channel breakdown Table */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Page Publishing Breakdown</span>
                      
                      <div className="rounded-xl border border-white/5 overflow-hidden">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5 text-muted-foreground font-semibold">
                              <th className="p-3">Page Name</th>
                              <th className="p-3">Publish Status</th>
                              <th className="p-3">Post ID / Graph API Exceptions</th>
                              <th className="p-3 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {post.publishStatus.map((p, idx) => (
                              <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.01]">
                                <td className="p-3 font-semibold text-slate-300">{p.pageName}</td>
                                <td className="p-3">
                                  {p.status === 'success' ? (
                                    <span className="inline-flex items-center gap-1 text-success text-[10px] font-semibold">
                                      <CheckCircle2 className="w-3 h-3" />
                                      Success
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 text-red-400 text-[10px] font-semibold">
                                      <XCircle className="w-3 h-3" />
                                      Failed
                                    </span>
                                  )}
                                </td>
                                <td className="p-3 text-[10px]">
                                  {p.status === 'success' ? (
                                    <code className="bg-[#242634] px-1.5 py-0.5 rounded text-slate-400 font-mono text-[9px]">
                                      {p.postId}
                                    </code>
                                  ) : (
                                    <span className="text-red-400 opacity-90 block max-w-sm leading-normal">
                                      {p.error || 'Unknown Facebook response error'}
                                    </span>
                                  )}
                                </td>
                                <td className="p-3 text-right">
                                  {p.status === 'success' && p.postId && (
                                    <a
                                      href={`https://facebook.com/${p.postId}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline font-semibold"
                                    >
                                      View Post
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
