import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string, name?: string, company?: string) => void;
  disabled: boolean;
  isLimitReached: boolean;
  showPreChat: boolean;
  onPreChatSubmit: (name: string, company: string) => void;
}

export function ChatInput({ onSendMessage, disabled, isLimitReached, showPreChat, onPreChatSubmit }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const placeholder = isLimitReached
    ? 'Message limit reached — get in touch directly'
    : 'Ask me anything...';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      if (showPreChat) {
        onPreChatSubmit(name, company);
        onSendMessage(message, name, company);
      } else {
        onSendMessage(message);
      }
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 3 * 24;
      textareaRef.current.style.height = Math.min(scrollHeight, maxHeight) + 'px';
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      {/* Ambient glow layer behind the input */}
      <motion.div
        className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl"
        animate={{
          opacity: isFocused ? 0.4 : 0.2,
          scale: isFocused ? 1.05 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      <motion.div
        className="relative bg-input-background/60 backdrop-blur-xl border-2 rounded-3xl p-4 space-y-3 transition-all duration-300"
        animate={{
          borderColor: isFocused ? 'rgba(101, 156, 68, 0.7)' : 'rgba(101, 156, 68, 0.35)',
          boxShadow: isFocused
            ? '0 0 0 4px rgba(101, 156, 68, 0.2), 0 0 60px rgba(101, 156, 68, 0.3), 0 20px 40px -5px rgba(101, 156, 68, 0.25), 0 10px 20px -5px rgba(101, 156, 68, 0.15)'
            : '0 0 0 1px rgba(101, 156, 68, 0.1), 0 0 30px rgba(101, 156, 68, 0.15), 0 10px 30px -5px rgba(101, 156, 68, 0.15), 0 4px 10px -2px rgba(101, 156, 68, 0.1)',
          scale: isFocused ? 1.01 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {showPreChat && (
          <div className="flex items-center gap-2 pb-3 border-b border-border/40">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 bg-transparent px-2 py-1.5 text-sm focus:outline-none placeholder:text-muted-foreground/60"
            />
            <div className="w-px h-5 bg-border/50" />
            <input
              type="text"
              placeholder="Company (optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 bg-transparent px-2 py-1.5 text-sm focus:outline-none placeholder:text-muted-foreground/60"
            />
          </div>
        )}

        <div className="flex items-end gap-3">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled || isLimitReached}
            rows={1}
            aria-label="Message"
            className="flex-1 bg-transparent px-2 py-2.5 text-base focus:outline-none resize-none max-h-[72px] overflow-y-auto disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-muted-foreground/50"
          />
          <motion.button
            type="submit"
            disabled={disabled || isLimitReached || !message.trim()}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Send message"
            className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 flex items-center justify-center"
          >
            <ArrowUp className="w-5 h-5" strokeWidth={3} />
          </motion.button>
        </div>
      </motion.div>
    </form>
  );
}
