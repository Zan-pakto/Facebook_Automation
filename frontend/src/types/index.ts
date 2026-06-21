export interface User {
  _id: string;
  name: string;
  email?: string;
  facebookId: string;
  createdAt: string;
}

export interface FacebookPage {
  _id: string;
  pageId: string;
  pageName: string;
  category?: string;
  picture?: string;
  createdAt: string;
}

export interface PublishStatus {
  pageId: string;
  pageName: string;
  status: 'success' | 'failed';
  postId?: string;
  error?: string;
}

export interface PostHistory {
  _id: string;
  ownerUserId: string;
  content: string;
  mediaUrl?: string;
  mediaType: 'text' | 'image' | 'video';
  selectedPages: {
    pageId: string;
    pageName: string;
  }[];
  publishStatus: PublishStatus[];
  createdAt: string;
}

export interface DashboardMetrics {
  totalPages: number;
  totalPosts: number;
  successRate: number;
  lastSyncedAt?: string;
}

export interface ScheduledPost {
  _id: string;
  ownerUserId: string;
  content: string;
  mediaUrl?: string;
  mediaType: 'text' | 'image' | 'video';
  fileName?: string;
  selectedPages: {
    pageId: string;
    pageName: string;
  }[];
  scheduledAt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
  createdAt: string;
}
