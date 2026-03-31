export interface CodeReview {
  id: string;
  title: string;
  description?: string;
  repository: string;
  branch: string;
  commitHash: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  qualityScore?: number;
  reviewer: string;
  createdAt: string;
  completedAt?: string;
  issueCount?: number;
  language?: string;
}

export interface ReviewIssue {
  id: string;
  severity: 'critical' | 'warning' | 'suggestion';
  category: 'security' | 'performance' | 'code-style' | 'maintainability';
  file: string;
  line: number;
  message: string;
  suggestion: string;
}

export interface MCPTool {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: 'analysis' | 'monitoring' | 'database' | 'deployment' | 'code';
  status: 'active' | 'inactive' | 'maintenance';
  healthStatus: 'healthy' | 'unhealthy' | 'unknown';
  version: string;
  lastHealthCheck: string;
  icon: string;
  callCount: number;
  avgResponseTime: number;
}

export interface DashboardStats {
  totalReviews: number;
  activeReviews: number;
  completedReviews: number;
  averageScore: number;
  issuesFound: number;
  fixRate: number;
  activeUsers: number;
  mcpTools: {
    total: number;
    healthy: number;
    unhealthy: number;
  };
}

export interface ActivityItem {
  id: string;
  type: 'review_created' | 'review_completed' | 'config_updated' | 'tool_invoked';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  avatar?: string;
}

export interface TrendDataPoint {
  date: string;
  reviews: number;
  score: number;
  issues: number;
}

export interface IssueCategoryData {
  name: string;
  value: number;
  color: string;
}

export interface RepoStats {
  name: string;
  reviews: number;
  avgScore: number;
  issues: number;
  language: string;
}
