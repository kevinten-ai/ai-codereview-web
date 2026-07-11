import type { Metadata } from 'next';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI CodeReview Portal',
  description: 'AI-Powered Enterprise Code Review & MCP Tools Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen min-w-0">
          <Sidebar />
          <div className="min-w-0 flex-1 md:ml-[220px]">
            <Header />
            <main className="min-h-[calc(100vh-56px)] bg-grid-subtle p-4 pb-24 sm:p-6 sm:pb-24 md:pb-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
