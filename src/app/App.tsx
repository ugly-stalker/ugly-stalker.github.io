import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChatBubble } from './components/ChatBubble';
import { TypingIndicator } from './components/TypingIndicator';
import { TagQuestions } from './components/TagQuestions';
import { ChatInput } from './components/ChatInput';

interface Message {
  id: string;
  text: string;
  type: 'ai' | 'user';
  timestamp: Date;
}

const sendToWorker = async (
  messages: { role: string; content: string }[],
  name?: string,
  company?: string
): Promise<{ reply: string; limitReached?: boolean }> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(import.meta.env.VITE_WORKER_URL ?? 'https://lawrencecwy-chat.lawrencecwy.workers.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: messages.slice(-20),
        name,
        company,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return await res.json();
  } catch {
    clearTimeout(timeout);
    return {
      reply: `Something went wrong — try again in a moment, or reach out directly at lawrencecwy@gmail.com`,
    };
  }
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showPreChat, setShowPreChat] = useState(true);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [userName, setUserName] = useState('');
  const [userCompany, setUserCompany] = useState('');
  const [isLimitReached, setIsLimitReached] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const MESSAGE_LIMIT = 20;

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handlePreChatSubmit = (name: string, company: string) => {
    setUserName(name);
    setUserCompany(company);
    setShowPreChat(false);
  };

  const handleSendMessage = async (text: string, nameOverride?: string, companyOverride?: string) => {
    if (!hasStartedChat) {
      setHasStartedChat(true);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      type: 'user',
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsTyping(true);

    const apiMessages = updatedMessages.map((m) => ({
      role: m.type === 'ai' ? 'assistant' : 'user',
      content: m.text,
    }));

    const effectiveName = nameOverride !== undefined ? nameOverride : userName;
    const effectiveCompany = companyOverride !== undefined ? companyOverride : userCompany;

    const result = await sendToWorker(
      apiMessages,
      effectiveName || undefined,
      effectiveCompany || undefined
    );

    setIsTyping(false);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: result.reply,
      type: 'ai',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);

    if (result.limitReached) {
      setIsLimitReached(true);
    }
  };

  const handleTagClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-background relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(101, 156, 68, 0.6) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(101, 156, 68, 0.6) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated ambient glow effects */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"
        animate={{ x: [0, -80, 0], y: [0, -60, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary/3 rounded-full blur-[100px] pointer-events-none"
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <AnimatePresence mode="wait">
        {!hasStartedChat ? (
          <motion.div
            key="landing"
            className="flex-1 flex flex-col items-center justify-center px-4 pb-8 pt-16 sm:pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="max-w-2xl w-full space-y-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-primary/10">
                    <span className="text-4xl">👋</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-3">
                    Lawrence Chung
                  </h1>
                  <p className="text-lg sm:text-xl text-muted-foreground mb-2">
                    Technical Product & Delivery Lead
                  </p>
                  <p className="text-base sm:text-lg text-primary/80 italic">
                    I build digital platforms. They usually work.
                  </p>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
                  This site is just a chat. No case studies, no buzzword bingo, no PDF to download. Just ask what you actually want to know — I'll answer directly.
                </p>
              </div>

              <div className="space-y-4 pt-6">
                <ChatInput
                  onSendMessage={handleSendMessage}
                  disabled={isTyping}
                  isLimitReached={isLimitReached}
                  showPreChat={showPreChat}
                  onPreChatSubmit={handlePreChatSubmit}
                />
                <TagQuestions onTagClick={handleTagClick} isLimitReached={isLimitReached} />
              </div>
            </motion.div>

            {/* Footer on landing page */}
            <motion.footer
              className="mt-auto pt-8 w-full max-w-5xl px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="border-t border-border/30 pt-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground font-mono">
                  <div>© 2026 Lawrence Chung · London</div>
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
                    <a
                      href="mailto:lawrencecwy@gmail.com"
                      className="hover:text-primary transition-colors"
                    >
                      lawrencecwy@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.footer>
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            className="flex-1 flex flex-col overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Header />

            <main className="flex-1 flex flex-col overflow-hidden relative">
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto px-4 sm:px-6 py-6"
                aria-live="polite"
              >
                <div className="max-w-3xl mx-auto">
                  {messages.map((msg, index) => (
                    <ChatBubble
                      key={msg.id}
                      message={msg.text}
                      type={msg.type}
                      isFirstAI={
                        msg.type === 'ai' &&
                        (index === 0 || messages[index - 1].type !== 'ai')
                      }
                    />
                  ))}
                  {isTyping && <TypingIndicator />}
                </div>
              </div>

              <div className="border-t border-border/40 bg-background/60 backdrop-blur-xl">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 space-y-4">
                  <ChatInput
                    onSendMessage={handleSendMessage}
                    disabled={isTyping}
                    isLimitReached={isLimitReached}
                    showPreChat={showPreChat}
                    onPreChatSubmit={handlePreChatSubmit}
                  />
                  <TagQuestions onTagClick={handleTagClick} isLimitReached={isLimitReached} />
                </div>
              </div>
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
