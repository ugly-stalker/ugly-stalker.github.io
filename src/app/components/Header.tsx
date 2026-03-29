import { Linkedin, User } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-primary/10">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl tracking-tight">Lawrence Chung</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Technical Product & Delivery Lead
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="https://www.linkedin.com/in/lawrence-c/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all shadow-md shadow-primary/10"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-primary" />
          </a>
        </div>
      </div>
    </header>
  );
}