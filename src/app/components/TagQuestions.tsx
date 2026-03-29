import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface TagQuestionsProps {
  onTagClick: (question: string) => void;
  isLimitReached: boolean;
}

const tags = [
  { emoji: '🏗️', text: 'Walk me through your biggest project' },
  { emoji: '⚙️', text: 'How do you work with engineers?' },
  { emoji: '🤖', text: 'How do you use AI in your work?' },
  { emoji: '🌐', text: 'How did you build this site?' },
  { emoji: '💭', text: 'What are you curious about?' },
  { emoji: '🌦️', text: "What's your unpopular opinion?" },
  { emoji: '😅', text: 'Are you actually any good?' },
  { emoji: '⚡', text: 'Convince me in 30 seconds' },
  { emoji: '✈️', text: "What's your ideal holiday?" },
  { emoji: '🍜', text: 'What does someone from HK actually eat?' },
];

export function TagQuestions({ onTagClick, isLimitReached }: TagQuestionsProps) {
  const [expanded, setExpanded] = useState(false);

  if (isLimitReached) {
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        <motion.a
          href="mailto:lawrencecwy@gmail.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-primary/10 backdrop-blur-sm border border-primary/40 text-primary rounded-full text-sm font-mono hover:bg-primary/20 transition-colors flex items-center gap-2 shadow-lg shadow-primary/10"
        >
          📧 Email Lawrence
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/lawrence-c/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-primary/10 backdrop-blur-sm border border-primary/40 text-primary rounded-full text-sm font-mono hover:bg-primary/20 transition-colors flex items-center gap-2 shadow-lg shadow-primary/10"
        >
          💼 LinkedIn
        </motion.a>
      </div>
    );
  }

  const tagClass = "px-3 py-1.5 bg-primary/5 backdrop-blur-sm border border-primary/40 text-primary rounded-full text-xs font-mono hover:bg-primary/15 transition-colors flex items-center gap-1.5 shadow-md shadow-primary/5";

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 justify-center">
        {tags.slice(0, 5).map((tag, index) => (
          <motion.button
            key={index}
            onClick={() => onTagClick(tag.text)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={tagClass}
          >
            <span className="text-sm">{tag.emoji}</span>
            <span>{tag.text}</span>
          </motion.button>
        ))}

        <motion.button
          onClick={() => setExpanded(!expanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={tagClass}
        >
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3 h-3" />
          </motion.span>
          <span>{expanded ? 'Less' : 'More'}</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap gap-2 justify-center overflow-hidden"
          >
            {tags.slice(5).map((tag, index) => (
              <motion.button
                key={index}
                onClick={() => onTagClick(tag.text)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={tagClass}
              >
                <span className="text-sm">{tag.emoji}</span>
                <span>{tag.text}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
