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
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 ml-[220px]">
            <Header />
            <main className="p-6 bg-grid-subtle min-h-[calc(100vh-56px)]">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
