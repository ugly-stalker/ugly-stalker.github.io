export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/60 backdrop-blur-xl mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground font-mono">
          <div>
            © 2026 Lawrence Chung · London
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/lawrence-c/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <span>·</span>
            <a href="mailto:lawrencecwy@gmail.com" className="hover:text-primary transition-colors">
              lawrencecwy@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
