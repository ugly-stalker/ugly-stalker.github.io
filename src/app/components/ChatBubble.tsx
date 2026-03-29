import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatBubbleProps {
  message: string;
  type: 'ai' | 'user';
  isFirstAI?: boolean;
}

export function ChatBubble({ message, type, isFirstAI }: ChatBubbleProps) {
  const isAI = type === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`flex flex-col ${isAI ? 'items-start' : 'items-end'} max-w-[85%] sm:max-w-[75%]`}>
        {isAI && isFirstAI && (
          <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-1.5">
            <span className="text-[10px] font-mono text-primary font-bold">LC</span>
          </div>
        )}
        <div
          className={`px-4 py-3 rounded-2xl backdrop-blur-xl shadow-lg ${
            isAI
              ? 'bg-card border border-border/50 shadow-primary/5 rounded-tl-sm'
              : 'bg-primary/20 border border-primary/30 shadow-primary/10 rounded-tr-sm'
          }`}
        >
          {isAI ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="prose prose-invert prose-sm max-w-none text-foreground leading-relaxed"
            >
              {message}
            </ReactMarkdown>
          ) : (
            <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
              {message}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
