import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const d = new Date(date);
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
}

export function getScoreColor(score: number): string {
  if (score >= 90) return 'text-emerald-400';
  if (score >= 80) return 'text-blue-400';
  if (score >= 70) return 'text-amber-400';
  return 'text-red-400';
}

export function getScoreBg(score: number): string {
  if (score >= 90) return 'bg-emerald-400/10 border-emerald-400/20';
  if (score >= 80) return 'bg-blue-400/10 border-blue-400/20';
  if (score >= 70) return 'bg-amber-400/10 border-amber-400/20';
  return 'bg-red-400/10 border-red-400/20';
}

export function getStatusConfig(status: string) {
  const configs: Record<string, { label: string; color: string; dotColor: string }> = {
    pending: { label: 'Pending', color: 'badge-warning', dotColor: 'amber' },
    processing: { label: 'Processing', color: 'badge-info', dotColor: 'blue' },
    completed: { label: 'Completed', color: 'badge-success', dotColor: 'green' },
    failed: { label: 'Failed', color: 'badge-error', dotColor: 'red' },
    active: { label: 'Active', color: 'badge-success', dotColor: 'green' },
    inactive: { label: 'Inactive', color: 'badge-warning', dotColor: 'amber' },
    maintenance: { label: 'Maintenance', color: 'badge-warning', dotColor: 'amber' },
    healthy: { label: 'Healthy', color: 'badge-success', dotColor: 'green' },
    unhealthy: { label: 'Unhealthy', color: 'badge-error', dotColor: 'red' },
  };
  return configs[status] || { label: status, color: 'badge-info', dotColor: 'blue' };
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}
