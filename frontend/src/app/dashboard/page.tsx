'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pageService, postService } from '@/services/api';
import { FacebookPage, PostHistory } from '@/types';
import Link from 'next/link';
import { 
  Layers, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  ArrowUpRight, 
  PlusCircle, 
  RefreshCw,
  FileText,
  Image as ImageIcon,
  Video as VideoIcon
} from 'lucide-react';

export default function DashboardOverview() {
  const queryClient = useQueryClient();

  // 1. Fetch Pages
  const { data: pages = [], isLoading: isLoadingPages } = useQuery<FacebookPage[]>({
    queryKey: ['facebookPages'],
    queryFn: pageService.getPages,
  });

  // 2. Fetch History
  const { data: history = [], isLoading: isLoadingHistory } = useQuery<PostHistory[]>({
    queryKey: ['postHistory'],
    queryFn: postService.getHistory,
  });

  // 3. Page Sync Mutation
  const syncMutation = useMutation({
    mutationFn: pageService.syncPages,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facebookPages'] });
    },
  });

  // Calculate Metrics
  const totalPages = pages.length;
  const totalPosts = history.length;
  
  // Calculate success rate across all historical publish attempts
  let totalAttempts = 0;
  let successfulAttempts = 0;

  history.forEach(post => {
    post.publishStatus.forEach(status => {
      totalAttempts++;
      if (status.status === 'success') {
        successfulAttempts++;
      }
    });
  });

  const successRate = totalAttempts > 0 
    ? Math.round((successfulAttempts / totalAttempts) * 100) 
    : 100;

  const recentPosts = history.slice(0, 3);

  const getMediaIcon = (type: 'text' | 'image' | 'video') => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-3.5 h-3.5" />;
      case 'video':
        return <VideoIcon className="w-3.5 h-3.5" />;
      default:
        return <FileText className="w-3.5 h-3.5" />;
    }
  };

  const getStatusBadge = (post: PostHistory) => {
    const successCount = post.publishStatus.filter(s => s.status === 'success').length;
    const totalCount = post.publishStatus.length;
    
    if (successCount === totalCount) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-success/15 text-success text-xs font-medium border border-success/10">
          <CheckCircle2 className="w-3 h-3" />
          All {totalCount} Successful
        </span>
      );
    } else if (successCount === 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/15 text-red-400 text-xs font-medium border border-red-500/10">
          <AlertCircle className="w-3 h-3" />
          All Failed ({totalCount})
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-500/15 text-yellow-500 text-xs font-medium border border-yellow-500/10">
          <AlertCircle className="w-3 h-3" />
          {successCount}/{totalCount} Posted
        </span>
      );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome banner & CTA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 rounded-3xl glass-panel relative overflow-hidden">
        <div className="absolute top-[-40%] right-[-5%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">Monitor connected channels, create campaigns, and analyze recent bulk posts.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard/composer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary hover:bg-primary-hover active:scale-[0.98] transition-all font-semibold text-xs text-white shadow-lg shadow-primary/20"
          >
            <PlusCircle className="w-4 h-4" />
            Create Bulk Post
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1 */}
        <div className="p-6 rounded-2xl glass-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Connected Pages</p>
            <h3 className="text-3xl font-extrabold text-foreground mt-2">
              {isLoadingPages ? (
                <span className="inline-block w-8 h-8 rounded bg-muted animate-pulse"></span>
              ) : (
                totalPages
              )}
            </h3>
            <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1">
              Active pages in buffer
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-6 rounded-2xl glass-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Total Campaigns</p>
            <h3 className="text-3xl font-extrabold text-foreground mt-2">
              {isLoadingHistory ? (
                <span className="inline-block w-8 h-8 rounded bg-muted animate-pulse"></span>
              ) : (
                totalPosts
              )}
            </h3>
            <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1">
              Bulk posting requests sent
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
            <Send className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-6 rounded-2xl glass-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Publishing Success</p>
            <h3 className="text-3xl font-extrabold text-foreground mt-2">
              {isLoadingHistory ? (
                <span className="inline-block w-8 h-8 rounded bg-muted animate-pulse"></span>
              ) : (
                `${successRate}%`
              )}
            </h3>
            <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1">
              Average API acceptance rate
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-success/10 border border-success/20 flex items-center justify-center text-success">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Synced Pages Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-md tracking-tight text-gray-900">Connected Facebook Pages</h3>
            <button
              onClick={() => syncMutation.mutate()}
              disabled={syncMutation.isPending}
              className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-gray-900 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${syncMutation.isPending ? 'animate-spin' : ''}`} />
              Sync
            </button>
          </div>

          {isLoadingPages ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="p-4 rounded-xl border border-border bg-muted/30 animate-pulse flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-3.5 bg-muted rounded w-2/3"></div>
                    <div className="h-2.5 bg-muted rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : pages.length === 0 ? (
            <div className="p-12 rounded-2xl border border-dashed border-border text-center flex flex-col items-center justify-center bg-muted/10">
              <Layers className="w-8 h-8 text-muted-foreground mb-3" />
              <p className="text-sm font-semibold text-gray-900">No Facebook Pages connected</p>
              <p className="text-xs text-muted-foreground max-w-sm mt-1 mb-5">
                We couldn't find any pages linked to your Meta profile. Please sync to import them.
              </p>
              <button
                onClick={() => syncMutation.mutate()}
                disabled={syncMutation.isPending}
                className="px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-xl font-semibold text-xs transition-all flex items-center gap-2 text-foreground"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncMutation.isPending ? 'animate-spin' : ''}`} />
                Sync Facebook Pages
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pages.map((page) => (
                <div 
                  key={page._id} 
                  className="p-4 rounded-xl border border-border bg-card hover:border-border/80 transition-all flex items-center gap-3 group relative"
                >
                  {page.picture ? (
                    <img 
                      src={page.picture} 
                      alt={page.pageName} 
                      className="w-10 h-10 rounded-full object-cover border border-border"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs uppercase">
                      {page.pageName.substring(0, 2)}
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <h4 className="font-semibold text-sm truncate text-gray-900 group-hover:text-primary">{page.pageName}</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{page.category || 'Business Page'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Recent Posts list */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-md tracking-tight text-gray-900">Recent Post Campaigns</h3>
            <Link 
              href="/dashboard/history" 
              className="flex items-center gap-0.5 text-xs font-semibold text-primary hover:underline"
            >
              See all
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {isLoadingHistory ? (
            <div className="space-y-4">
              {[1, 2, 3].map(n => (
                <div key={n} className="p-4 rounded-xl border border-border bg-muted/10 animate-pulse space-y-2">
                  <div className="flex justify-between">
                    <div className="h-3.5 bg-muted rounded w-1/3"></div>
                    <div className="h-3 bg-muted rounded w-1/4"></div>
                  </div>
                  <div className="h-2.5 bg-muted rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="p-12 rounded-2xl border border-dashed border-border text-center flex flex-col items-center justify-center bg-muted/10">
              <Send className="w-8 h-8 text-muted-foreground mb-3" />
              <p className="text-sm font-semibold text-gray-900">No postings recorded</p>
              <p className="text-xs text-muted-foreground mt-1">
                Once you broadcast your first bulk post, history details will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div 
                  key={post._id}
                  className="p-4 rounded-xl border border-border bg-card hover:border-border/80 transition-all space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    {getStatusBadge(post)}
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="p-1.5 rounded-lg bg-muted text-muted-foreground flex items-center justify-center self-start border border-border shrink-0 mt-0.5">
                      {getMediaIcon(post.mediaType)}
                    </div>
                    <p className="text-xs text-foreground leading-normal line-clamp-2 break-all">
                      {post.content || <span className="italic opacity-55">Media post without caption</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
