"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
}

interface ChatWidgetProps {
  title?: string;
}

const STORAGE_KEY = "rag_chat_id";
const GREETING_SHOWN_KEY = "rag_greeting_shown";
const MESSAGES_KEY = "rag_messages";
const WIDGET_WIDTH = 380;
const WIDGET_HEIGHT = 520;

function ChatWidget({ title = "Ассистент" }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGreetingTyping, setIsGreetingTyping] = useState(false);
  const [chatId, setChatId] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const storedChatId = localStorage.getItem(STORAGE_KEY);
    const savedMessages = localStorage.getItem(MESSAGES_KEY);
    const savedChatIdForMessages = savedMessages
      ? (JSON.parse(savedMessages) as { chatId?: string }).chatId
      : null;

    if (storedChatId) {
      setChatId(storedChatId);
      // Load messages only if they belong to current chat session
      if (savedMessages && savedChatIdForMessages === storedChatId) {
        const parsed = JSON.parse(savedMessages) as { messages: Message[] };
        // Migrate old messages without id
        const migrated = parsed.messages.map((m, i) => ({
          ...m,
          id: m.id ?? `msg-legacy-${i}`,
        }));
        setMessages(migrated);
      }
    } else {
      const newChatId = Date.now().toString();
      localStorage.setItem(STORAGE_KEY, newChatId);
      setChatId(newChatId);
      // Clear old messages for new session
      localStorage.removeItem(MESSAGES_KEY);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isGreetingTyping]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (chatId && messages.length > 0) {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify({ chatId, messages }));
    }
  }, [messages, chatId]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetingShown = localStorage.getItem(GREETING_SHOWN_KEY);
      if (!greetingShown) {
        localStorage.setItem(GREETING_SHOWN_KEY, "true");
        setIsGreetingTyping(true);
        const timer = setTimeout(() => {
          setIsGreetingTyping(false);
          setMessages([
            { id: "msg-greeting", role: "bot", text: "Здравствуйте! Чем могу помочь?" },
          ]);
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, messages.length]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || !chatId) return;

      const userMessage: Message = { id: `msg-${Date.now()}-u`, role: "user", text: text.trim() };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: text.trim(),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        const data = (await response.json()) as { response?: string; error?: string };
        const responseText = data.response;

        if (responseText) {
          setMessages((prev) => [
            ...prev,
            { id: `msg-${Date.now()}-b`, role: "bot", text: responseText },
          ]);
        } else {
          throw new Error("No response from bot");
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}-err`,
            role: "bot",
            text: "Ошибка соединения, попробуйте ещё раз",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [chatId]
  );

  const handleSubmit = useCallback(() => {
    void sendMessage(inputValue);
  }, [inputValue, sendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        void sendMessage(inputValue);
      }
    },
    [inputValue, sendMessage]
  );

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        style={{ backgroundColor: "var(--primary-color)" }}
        aria-label={isOpen ? "Закрыть чат" : "Открыть чат"}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed z-50 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300"
          style={{
            width: WIDGET_WIDTH,
            height: WIDGET_HEIGHT,
            bottom: "88px",
            right: "24px",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{
              background:
                "linear-gradient(135deg, var(--accent-color) 0%, var(--primary-color) 100%)",
            }}
          >
            <span className="text-white font-semibold text-base">{title}</span>
            <button
              onClick={toggleOpen}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Закрыть"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "text-white rounded-2xl rounded-tr-sm"
                      : "bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm"
                  }`}
                  style={{
                    backgroundColor: message.role === "user" ? "var(--primary-color)" : undefined,
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {(isLoading || isGreetingTyping) && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm">
                  <div className="flex space-x-1">
                    <span
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "200ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "400ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-100 bg-white shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Введите сообщение..."
                className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent focus:ring-primary/30"
                disabled={isLoading}
              />
              <button
                onClick={handleSubmit}
                disabled={!inputValue.trim() || isLoading}
                className="px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                style={{ backgroundColor: "var(--primary-color)" }}
                aria-label="Отправить"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(ChatWidget);
