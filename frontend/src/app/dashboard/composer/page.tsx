'use client';

import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pageService, postService } from '@/services/api';
import { FacebookPage, PublishStatus } from '@/types';
import PostPreview from '@/components/post-preview';
import { 
  Send, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  X, 
  Search, 
  Check, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeftRight,
  Clock
} from 'lucide-react';
import Link from 'next/link';

export default function PostComposer() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [content, setContent] = useState('');
  const [selectedPageIds, setSelectedPageIds] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'text' | 'image' | 'video'>('text');
  const [searchQuery, setSearchQuery] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');

  // Progress modal states
  const [isPublishing, setIsPublishing] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [publishProgress, setPublishProgress] = useState<{
    pageId: string;
    pageName: string;
    status: 'pending' | 'success' | 'failed';
    postId?: string;
    error?: string;
  }[]>([]);

  // Fetch connected pages
  const { data: pages = [], isLoading: isLoadingPages } = useQuery<FacebookPage[]>({
    queryKey: ['facebookPages'],
    queryFn: pageService.getPages,
  });

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (mediaPreview && mediaPreview.startsWith('blob:')) {
        URL.revokeObjectURL(mediaPreview);
      }
    };
  }, [mediaPreview]);

  // Filter pages based on search query
  const filteredPages = pages.filter(page => 
    page.pageName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectPage = (pageId: string) => {
    setSelectedPageIds(prev => 
      prev.includes(pageId) ? prev.filter(id => id !== pageId) : [...prev, pageId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPageIds.length === filteredPages.length) {
      setSelectedPageIds([]);
    } else {
      setSelectedPageIds(filteredPages.map(p => p.pageId));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Revoke previous blob preview
    if (mediaPreview && mediaPreview.startsWith('blob:')) {
      URL.revokeObjectURL(mediaPreview);
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setMediaPreview(objectUrl);

    if (file.type.startsWith('video/')) {
      setMediaType('video');
    } else if (file.type.startsWith('image/')) {
      setMediaType('image');
    } else {
      setMediaType('text');
      setSelectedFile(null);
      setMediaPreview(null);
      alert('Unsupported file format. Please upload an image or video.');
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (mediaPreview && mediaPreview.startsWith('blob:')) {
      URL.revokeObjectURL(mediaPreview);
    }
    setMediaPreview(null);
    setMediaType('text');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getSelectedPagesObjects = () => {
    return pages.filter(p => selectedPageIds.includes(p.pageId));
  };

  // Publish post mutation
  const publishMutation = useMutation({
    mutationFn: postService.publishPost,
    onSuccess: (data) => {
      // API returns the newly created PostHistory document containing publishStatus details
      const results: PublishStatus[] = data.post.publishStatus;
      
      // Map results to the modal view state
      setPublishProgress(results.map(r => ({
        pageId: r.pageId,
        pageName: r.pageName,
        status: r.status,
        postId: r.postId,
        error: r.error
      })));
      
      setIsPublishing(false);
      queryClient.invalidateQueries({ queryKey: ['postHistory'] });
    },
    onError: (error: any) => {
      const errMsg = error.response?.data?.message || error.message;
      // Mark all selected pages as failed with this error
      const errorState = getSelectedPagesObjects().map(p => ({
        pageId: p.pageId,
        pageName: p.pageName,
        status: 'failed' as const,
        error: errMsg
      }));
      setPublishProgress(errorState);
      setIsPublishing(false);
    }
  });

  // Schedule post mutation
  const scheduleMutation = useMutation({
    mutationFn: postService.schedulePost,
    onSuccess: () => {
      alert('Post scheduled successfully!');
      setContent('');
      handleRemoveFile();
      setSelectedPageIds([]);
      setScheduledAt('');
      queryClient.invalidateQueries({ queryKey: ['scheduledPosts'] });
    },
    onError: (error: any) => {
      const errMsg = error.response?.data?.message || error.message;
      alert(`Failed to schedule post: ${errMsg}`);
    }
  });

  const handlePublish = () => {
    if (selectedPageIds.length === 0) return;
    
    // Initialize progress state
    const initialProgress = getSelectedPagesObjects().map(p => ({
      pageId: p.pageId,
      pageName: p.pageName,
      status: 'pending' as const
    }));

    // Build form data
    const formData = new FormData();
    formData.append('content', content);
    formData.append('pageIds', JSON.stringify(selectedPageIds));
    if (selectedFile) {
      formData.append('media', selectedFile);
    }

    if (scheduledAt) {
      formData.append('scheduledAt', new Date(scheduledAt).toISOString());
      scheduleMutation.mutate(formData);
    } else {
      setPublishProgress(initialProgress);
      setShowProgressModal(true);
      setIsPublishing(true);
      publishMutation.mutate(formData);
    }
  };

  const handleCloseProgressModal = () => {
    if (isPublishing) return; // Prevent closing while in progress
    setShowProgressModal(false);
    
    // If there were successes, clear composer
    const hasSuccesses = publishProgress.some(p => p.status === 'success');
    if (hasSuccesses) {
      setContent('');
      handleRemoveFile();
      setSelectedPageIds([]);
    }
  };

  const isFormValid = selectedPageIds.length > 0 && (content.trim().length > 0 || selectedFile !== null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Bulk Media Composer</h1>
        <p className="text-muted-foreground text-xs mt-1">Compose your message, attach media, and select target pages to publish.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Creator Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Page Selector */}
          <div className="p-6 rounded-2xl glass-card space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div>
                <h3 className="font-semibold text-sm text-foreground">Select Target Facebook Pages</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">Select one or more pages to post to</p>
              </div>
              
              {filteredPages.length > 0 && (
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                >
                  {selectedPageIds.length === filteredPages.length ? 'Deselect All' : 'Select All Filtered'}
                </button>
              )}
            </div>

            {/* Search filter */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search connected pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>

            {/* Pages checkbox list */}
            {isLoadingPages ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
                {[1, 2, 3].map(n => (
                  <div key={n} className="p-3 rounded-xl border border-border bg-muted/30 animate-pulse h-14 flex items-center"></div>
                ))}
              </div>
            ) : filteredPages.length === 0 ? (
              <div className="p-6 rounded-xl border border-dashed border-border text-center text-xs text-muted-foreground bg-muted/30">
                No connected pages found. Make sure to sync pages in settings or overview.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
                {filteredPages.map((page) => {
                  const isChecked = selectedPageIds.includes(page.pageId);
                  return (
                    <button
                      key={page.pageId}
                      type="button"
                      onClick={() => handleSelectPage(page.pageId)}
                      className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
                        isChecked 
                          ? 'border-primary/55 bg-primary/5' 
                          : 'border-border bg-card/50 hover:border-border hover:bg-card'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {page.picture ? (
                          <img
                            src={page.picture}
                            alt={page.pageName}
                            className="w-8 h-8 rounded-full border border-border object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-[10px] uppercase">
                            {page.pageName.substring(0, 2)}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold truncate text-foreground">{page.pageName}</p>
                          <p className="text-[9px] text-muted-foreground truncate">{page.category || 'Business Page'}</p>
                        </div>
                      </div>

                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ml-2 transition-all ${
                        isChecked 
                          ? 'bg-primary border-primary text-white' 
                          : 'border-border text-transparent'
                      }`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 2: Post Content Composer */}
          <div className="p-6 rounded-2xl glass-card space-y-4">
            <div>
              <h3 className="font-semibold text-sm text-foreground">Post Content</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">Write the caption details and upload supporting materials</p>
            </div>

            {/* Caption Textarea */}
            <div className="space-y-1">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What would you like to publish? (URLs will automatically be hyperlinked by Facebook)"
                rows={5}
                maxLength={4000}
                className="w-full p-4 rounded-xl glass-input text-xs leading-normal resize-none"
              />
              <div className="flex justify-between items-center text-[10px] text-muted-foreground px-1">
                <span>Supports plain text formatting</span>
                <span>{content.length} / 4000 characters</span>
              </div>
            </div>

            {/* Media Upload Area */}
            <div className="space-y-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,video/*"
                className="hidden"
              />

              {!selectedFile ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-border hover:border-border bg-muted/30 hover:bg-muted/30 transition-all p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer group"
                >
                  <div className="flex gap-3 text-muted-foreground mb-2 group-hover:text-foreground">
                    <ImageIcon className="w-6 h-6 text-primary/70" />
                    <ArrowLeftRight className="w-4 h-4 mt-1 opacity-40" />
                    <VideoIcon className="w-6 h-6 text-accent/70" />
                  </div>
                  <p className="text-xs font-semibold text-foreground">Click to upload photo or video</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Accepts images and video up to 100MB</p>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-border bg-muted/30 flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                      {mediaType === 'image' ? <ImageIcon className="w-5 h-5" /> : <VideoIcon className="w-5 h-5" />}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-semibold text-foreground truncate">{selectedFile.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB &bull; {mediaType.toUpperCase()}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1.5 rounded-full hover:bg-muted border border-transparent hover:border-border text-muted-foreground hover:text-red-400 transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Schedule / Publish actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <label className="font-semibold text-foreground">Schedule for later (Optional)</label>
              </div>
              <input 
                type="datetime-local" 
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                className="w-full p-3 rounded-xl glass-input text-xs"
              />

              <button
                type="button"
                onClick={handlePublish}
                disabled={!isFormValid || isPublishing || publishMutation.isPending || scheduleMutation.isPending}
                className={`w-full py-4 rounded-xl text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:pointer-events-none disabled:bg-slate-800 disabled:opacity-50 ${
                  scheduledAt ? 'bg-accent hover:bg-accent/90 shadow-accent/10' : 'bg-primary hover:bg-primary-hover shadow-primary/10'
                }`}
              >
                {scheduledAt ? (
                  <>
                    <Clock className="w-4 h-4" />
                    {scheduleMutation.isPending ? 'Scheduling...' : `Schedule to ${selectedPageIds.length} Page${selectedPageIds.length === 1 ? '' : 's'}`}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {publishMutation.isPending ? 'Publishing...' : `Publish to ${selectedPageIds.length} Page${selectedPageIds.length === 1 ? '' : 's'}`}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Mock Preview Panel */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <h3 className="font-bold text-sm tracking-tight text-foreground">Live feed preview simulator</h3>
          <PostPreview
            selectedPages={getSelectedPagesObjects()}
            content={content}
            mediaPreview={mediaPreview}
            mediaType={mediaType}
          />
        </div>
      </div>

      {/* Progress Dialog Overlay Modal */}
      {showProgressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg p-6 rounded-2xl glass-panel border border-border shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-[-30%] left-[-10%] w-[200px] h-[200px] bg-primary/10 rounded-full blur-[60px] pointer-events-none"></div>

            <div className="mb-4">
              <h3 className="text-md font-bold text-foreground flex items-center gap-2">
                {isPublishing && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
                {!isPublishing && <CheckCircle2 className="w-4 h-4 text-success" />}
                {isPublishing ? 'Bulk Posting in Progress...' : 'Bulk Posting Completed'}
              </h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {isPublishing 
                  ? 'Requesting Meta Graph API channels to create posts. Please do not close this window.' 
                  : 'The batch publishing queue is finished. View details below.'}
              </p>
            </div>

            {/* List of Pages progress status */}
            <div className="space-y-2.5 my-4 max-h-60 overflow-y-auto pr-1">
              {publishProgress.map((prog) => (
                <div 
                  key={prog.pageId}
                  className="p-3 rounded-xl border border-border bg-muted/30 flex items-center justify-between text-xs"
                >
                  <div className="font-semibold text-foreground truncate max-w-[280px]">
                    {prog.pageName}
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    {prog.status === 'pending' && (
                      <span className="flex items-center gap-1 text-muted-foreground text-[10px]">
                        <Loader2 className="w-3 h-3 animate-spin text-primary" />
                        Posting...
                      </span>
                    )}
                    {prog.status === 'success' && (
                      <span className="flex items-center gap-1 text-success text-[10px] font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Published
                      </span>
                    )}
                    {prog.status === 'failed' && (
                      <span className="flex items-center gap-1 text-red-400 text-[10px] font-medium" title={prog.error}>
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        Failed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleCloseProgressModal}
              disabled={isPublishing}
              className="mt-2 w-full py-2.5 rounded-xl bg-muted/30 hover:bg-muted/80 disabled:opacity-40 border border-border font-semibold text-xs text-foreground hover:text-white transition-all cursor-pointer"
            >
              {isPublishing ? 'Processing Queue...' : 'Close & Reset'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
