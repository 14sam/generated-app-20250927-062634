import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Toaster } from '@/components/ui/sonner';
interface LayoutProps {
  children: React.ReactNode;
}
export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-brand-background text-brand-primary font-sans">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Toaster richColors position="bottom-right" />
    </div>
  );
}