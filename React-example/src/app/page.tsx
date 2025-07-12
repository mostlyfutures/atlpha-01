import { Dashboard } from '@/components/dashboard';
import { Bot } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Bot className="w-8 h-8 mr-2 text-primary" />
          <h1 className="text-2xl font-bold text-primary font-headline">
            MarketLook
          </h1>
        </div>
      </header>
      <main className="flex-1">
        <Dashboard />
      </main>
      <footer className="py-6 md:px-8 md:py-0">
         <div className="container flex flex-col items-center justify-center gap-4 py-6 md:h-24 md:flex-row">
            
         </div>
      </footer>
    </div>
  );
}
