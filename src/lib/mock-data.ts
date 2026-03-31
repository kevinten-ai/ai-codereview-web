import type {
  CodeReview,
  MCPTool,
  DashboardStats,
  ActivityItem,
  TrendDataPoint,
  IssueCategoryData,
  RepoStats,
} from '@/types';

export const mockStats: DashboardStats = {
  totalReviews: 1284,
  activeReviews: 23,
  completedReviews: 1247,
  averageScore: 87.6,
  issuesFound: 3842,
  fixRate: 94.2,
  activeUsers: 48,
  mcpTools: {
    total: 7,
    healthy: 6,
    unhealthy: 1,
  },
};

export const mockReviews: CodeReview[] = [
  {
    id: 'rev-001',
    title: 'Auth Module Security Audit',
    description: 'Security review of the authentication module',
    repository: 'kevinten-ai/auth-service',
    branch: 'feature/oauth2',
    commitHash: 'a3f8c2d',
    status: 'completed',
    qualityScore: 94,
    reviewer: 'AI Reviewer',
    createdAt: '2026-03-30T10:30:00Z',
    completedAt: '2026-03-30T10:35:00Z',
    issueCount: 3,
    language: 'TypeScript',
  },
  {
    id: 'rev-002',
    title: 'Payment Gateway Integration',
    description: 'Review of payment processing pipeline',
    repository: 'kevinten-ai/payment-service',
    branch: 'develop',
    commitHash: 'b7e1f4a',
    status: 'processing',
    qualityScore: undefined,
    reviewer: 'AI Reviewer',
    createdAt: '2026-03-31T08:15:00Z',
    issueCount: 0,
    language: 'Java',
  },
  {
    id: 'rev-003',
    title: 'User Dashboard Refactor',
    description: 'Frontend component refactoring',
    repository: 'kevinten-ai/web-portal',
    branch: 'refactor/dashboard',
    commitHash: 'c5d9e3b',
    status: 'completed',
    qualityScore: 88,
    reviewer: 'AI Reviewer',
    createdAt: '2026-03-29T14:00:00Z',
    completedAt: '2026-03-29T14:08:00Z',
    issueCount: 7,
    language: 'React',
  },
  {
    id: 'rev-004',
    title: 'Database Migration Scripts',
    description: 'Review PostgreSQL migration files',
    repository: 'kevinten-ai/data-service',
    branch: 'migration/v2',
    commitHash: 'd2a8f6c',
    status: 'completed',
    qualityScore: 91,
    reviewer: 'AI Reviewer',
    createdAt: '2026-03-28T09:45:00Z',
    completedAt: '2026-03-28T09:50:00Z',
    issueCount: 2,
    language: 'SQL',
  },
  {
    id: 'rev-005',
    title: 'API Rate Limiter Implementation',
    description: 'New rate limiting middleware',
    repository: 'kevinten-ai/api-gateway',
    branch: 'feature/rate-limit',
    commitHash: 'e9c4b7d',
    status: 'pending',
    reviewer: 'AI Reviewer',
    createdAt: '2026-03-31T09:00:00Z',
    language: 'Go',
  },
  {
    id: 'rev-006',
    title: 'Notification Service Optimization',
    description: 'Performance optimization for push notifications',
    repository: 'kevinten-ai/notification-service',
    branch: 'perf/batch-send',
    commitHash: 'f1g5h8j',
    status: 'failed',
    qualityScore: 45,
    reviewer: 'AI Reviewer',
    createdAt: '2026-03-27T16:20:00Z',
    completedAt: '2026-03-27T16:25:00Z',
    issueCount: 15,
    language: 'Python',
  },
  {
    id: 'rev-007',
    title: 'Kubernetes Helm Charts',
    description: 'Infrastructure as code review',
    repository: 'kevinten-ai/infra',
    branch: 'main',
    commitHash: 'k2l6m9n',
    status: 'completed',
    qualityScore: 96,
    reviewer: 'AI Reviewer',
    createdAt: '2026-03-26T11:00:00Z',
    completedAt: '2026-03-26T11:03:00Z',
    issueCount: 1,
    language: 'YAML',
  },
  {
    id: 'rev-008',
    title: 'ML Pipeline Data Validation',
    description: 'Data preprocessing and validation pipeline',
    repository: 'kevinten-ai/ml-pipeline',
    branch: 'feature/validation',
    commitHash: 'p3q7r1s',
    status: 'completed',
    qualityScore: 82,
    reviewer: 'AI Reviewer',
    createdAt: '2026-03-25T13:30:00Z',
    completedAt: '2026-03-25T13:40:00Z',
    issueCount: 9,
    language: 'Python',
  },
];

export const mockMCPTools: MCPTool[] = [
  { id: 'tool-001', name: 'app-analyzer', displayName: 'App Analyzer', description: 'Deep analysis of application architecture, component dependencies, and code structure patterns.', category: 'analysis', status: 'active', healthStatus: 'healthy', version: '2.4.1', lastHealthCheck: '2026-03-31T09:00:00Z', icon: 'cube', callCount: 4521, avgResponseTime: 1.2 },
  { id: 'tool-002', name: 'team-assistant', displayName: 'Team Assistant', description: 'AI-powered team collaboration hub for task assignment, code ownership, and review workflow management.', category: 'analysis', status: 'active', healthStatus: 'healthy', version: '1.8.0', lastHealthCheck: '2026-03-31T09:00:00Z', icon: 'users', callCount: 2834, avgResponseTime: 0.8 },
  { id: 'tool-003', name: 'deploy-manager', displayName: 'Deploy Manager', description: 'Automated deployment pipeline management with rollback capabilities and health monitoring.', category: 'deployment', status: 'active', healthStatus: 'healthy', version: '3.1.2', lastHealthCheck: '2026-03-31T09:00:00Z', icon: 'rocket', callCount: 1567, avgResponseTime: 2.5 },
  { id: 'tool-004', name: 'db-query', displayName: 'DB Query Analyzer', description: 'SQL query performance analyzer with slow query detection, index recommendations, and optimization hints.', category: 'database', status: 'active', healthStatus: 'healthy', version: '2.0.3', lastHealthCheck: '2026-03-31T09:00:00Z', icon: 'database', callCount: 3210, avgResponseTime: 1.5 },
  { id: 'tool-005', name: 'data-insight', displayName: 'Data Insight', description: 'Real-time data analytics and visualization engine for code quality metrics and development trends.', category: 'monitoring', status: 'active', healthStatus: 'healthy', version: '1.5.7', lastHealthCheck: '2026-03-31T09:00:00Z', icon: 'chart', callCount: 5678, avgResponseTime: 0.6 },
  { id: 'tool-006', name: 'code-repo', displayName: 'Code Repository', description: 'Git repository integration for code browsing, diff analysis, branch management, and commit history.', category: 'code', status: 'active', healthStatus: 'healthy', version: '2.2.0', lastHealthCheck: '2026-03-31T09:00:00Z', icon: 'code', callCount: 8901, avgResponseTime: 0.4 },
  { id: 'tool-007', name: 'log-analyzer', displayName: 'Log Analyzer', description: 'Centralized log aggregation and analysis with pattern detection, error correlation, and alerting.', category: 'monitoring', status: 'maintenance', healthStatus: 'unhealthy', version: '1.9.4', lastHealthCheck: '2026-03-31T08:30:00Z', icon: 'document', callCount: 6543, avgResponseTime: 3.2 },
];

export const mockActivities: ActivityItem[] = [
  { id: 'act-001', type: 'review_completed', title: 'Auth Module Security Audit completed', description: 'Score: 94 · 3 issues', timestamp: '2026-03-31T10:35:00Z', user: 'AI Reviewer' },
  { id: 'act-002', type: 'review_created', title: 'Payment Gateway Integration started', description: 'payment-service · develop', timestamp: '2026-03-31T08:15:00Z', user: 'Kevin' },
  { id: 'act-003', type: 'tool_invoked', title: 'App Analyzer invoked', description: 'Analyzed auth-service architecture', timestamp: '2026-03-31T07:45:00Z', user: 'System' },
  { id: 'act-004', type: 'review_completed', title: 'User Dashboard Refactor completed', description: 'Score: 88 · 7 issues', timestamp: '2026-03-30T14:08:00Z', user: 'AI Reviewer' },
  { id: 'act-005', type: 'config_updated', title: 'Review rules updated', description: 'Added new security patterns', timestamp: '2026-03-30T11:00:00Z', user: 'Kevin' },
];

export const mockTrendData: TrendDataPoint[] = [
  { date: 'Jan', reviews: 142, score: 82, issues: 356 },
  { date: 'Feb', reviews: 168, score: 84, issues: 312 },
  { date: 'Mar', reviews: 195, score: 85, issues: 298 },
  { date: 'Apr', reviews: 178, score: 87, issues: 245 },
  { date: 'May', reviews: 210, score: 86, issues: 267 },
  { date: 'Jun', reviews: 232, score: 88, issues: 234 },
  { date: 'Jul', reviews: 198, score: 89, issues: 198 },
  { date: 'Aug', reviews: 245, score: 87, issues: 212 },
  { date: 'Sep', reviews: 267, score: 90, issues: 178 },
  { date: 'Oct', reviews: 289, score: 88, issues: 201 },
  { date: 'Nov', reviews: 312, score: 91, issues: 156 },
  { date: 'Dec', reviews: 278, score: 89, issues: 189 },
];

export const mockIssueCategories: IssueCategoryData[] = [
  { name: 'Security', value: 856, color: '#ef4444' },
  { name: 'Performance', value: 634, color: '#f59e0b' },
  { name: 'Code Style', value: 1245, color: '#8b5cf6' },
  { name: 'Maintainability', value: 723, color: '#3b82f6' },
  { name: 'Best Practices', value: 384, color: '#10b981' },
];

export const mockRepoStats: RepoStats[] = [
  { name: 'auth-service', reviews: 245, avgScore: 92, issues: 89, language: 'TypeScript' },
  { name: 'payment-service', reviews: 189, avgScore: 87, issues: 134, language: 'Java' },
  { name: 'web-portal', reviews: 312, avgScore: 85, issues: 267, language: 'React' },
  { name: 'data-service', reviews: 156, avgScore: 90, issues: 78, language: 'Python' },
  { name: 'api-gateway', reviews: 198, avgScore: 88, issues: 112, language: 'Go' },
  { name: 'notification-service', reviews: 134, avgScore: 83, issues: 156, language: 'Python' },
  { name: 'ml-pipeline', reviews: 87, avgScore: 79, issues: 198, language: 'Python' },
  { name: 'infra', reviews: 63, avgScore: 95, issues: 23, language: 'YAML' },
];

// 7-day sparkline data for each metric
export const sparklineData = {
  totalReviews: [18, 22, 15, 28, 24, 31, 26],
  activeReviews: [12, 18, 15, 22, 19, 25, 23],
  avgScore: [85, 87, 84, 89, 88, 86, 88],
  issuesFound: [45, 38, 52, 34, 41, 28, 36],
};

// Activity heatmap data (52 weeks × 7 days)
export function generateHeatmapData(): number[][] {
  const weeks = 52;
  const data: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      // Simulate realistic activity patterns
      const base = Math.random();
      const isWeekend = d >= 5;
      const activity = isWeekend
        ? base < 0.6 ? 0 : Math.floor(Math.random() * 3) + 1
        : base < 0.15 ? 0 : Math.floor(Math.random() * 5) + 1;
      week.push(activity);
    }
    data.push(week);
  }
  return data;
}
