import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Home, ArrowLeft, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { askGeminiStream, resetConversation } from '../Services/gemini';
import ApplicationCard from '../components/ApplicationCard/ApplicationCard';

/* Maps keywords in AI responses to service IDs */
const SERVICE_KEYWORDS = [
  { keywords: ['business registration', 'dti registration', 'register your business', 'register a business', 'business permit', 'permit'], serviceId: 'business-permit' },
  { keywords: ['civil registry', 'clerical correction', 'spelling correction', 'birth certificate correction', 'marriage certificate correction', 'registry correction', 'correction'], serviceId: 'civil-registry-corrections' },
];

const APPLICATION_TRIGGERS = [
  'you can apply', 'start your application', 'proceed with', 'apply for',
  'submit an application', 'begin your application', 'ready to apply',
  'application process', 'how to apply', 'steps to apply', 'application form',
  'here are the steps', 'here\'s how', 'requirements', 'you will need',
  'you need to', 'to get your', 'to obtain', 'to request',
];

/**
 * Detect which service the bot is talking about and whether it's suggesting the user apply.
 * Returns an array of serviceIds to show cards for.
 */
const detectApplicationIntent = (text) => {
  const lower = text.toLowerCase();
  const hasTrigger = APPLICATION_TRIGGERS.some((t) => lower.includes(t));
  if (!hasTrigger) return [];

  const matched = new Set();
  SERVICE_KEYWORDS.forEach(({ keywords, serviceId }) => {
    if (keywords.some((kw) => lower.includes(kw))) {
      matched.add(serviceId);
    }
  });

  return Array.from(matched);
};

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: `Magandang araw! I'm your friend **Kasalig AI**, your Government Services AI Assistant. I'm here to help you navigate government transactions quickly and easily.\n\nWhat can I help you with today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isComplete: true,
      detectedServices: [],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const streamingMessageId = useRef(null);

  const quickActions = [
    'Apply for Business Permit',
    'Civil Registry Correction',
    'How long does business permit processing take?',
    'What is Cebu Municipality tracker?',
  ];

  const suggestedQuestions = [
    'What is Cebu Municipality tracker?',
    'How long does a civil registry correction take?',
    'What are the requirements for business permits?',
    'Can I track my business permit application?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  useEffect(() => {
    if (!isStreaming && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isStreaming]);

  const formatMessageText = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      
      const lines = part.split('\n');
      return lines.map((line, j) => (
        <span key={`${i}-${j}`}>
          {j > 0 && <br />}
          {line}
        </span>
      ));
    });
  };

  const handleNewChat = useCallback(() => {
    resetConversation();
    setMessages([
      {
        id: 1,
        type: 'bot',
        text: `Magandang araw! I'm your friend **Kasalig AI**, your Government Services AI Assistant. I'm here to help you navigate government transactions quickly and easily.\n\nWhat can I help you with today?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isComplete: true,
        detectedServices: [],
      },
    ]);
    setInputValue('');
    setIsStreaming(false);
    streamingMessageId.current = null;
  }, []);

  const handleSendMessage = async (text) => {
    const messageText = text || inputValue.trim();
    if (!messageText || isStreaming) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isComplete: true,
      detectedServices: [],
    };


    const botMessageId = Date.now() + 1;
    streamingMessageId.current = botMessageId;

    const botMessage = {
      id: botMessageId,
      type: 'bot',
      text: '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isComplete: false,
      detectedServices: [],
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInputValue('');
    setIsStreaming(true);

    try {
      await askGeminiStream(messageText, (accumulatedText) => {

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, text: accumulatedText }
              : msg
          )
        );
      });


      setMessages((prev) => {
        const botMsg = prev.find((m) => m.id === botMessageId);
        const services = botMsg ? detectApplicationIntent(botMsg.text) : [];
        return prev.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, isComplete: true, detectedServices: services, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            : msg
        );
      });
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                text: "I'm sorry, something went wrong. Please try again.",
                isComplete: true,
                detectedServices: [],
              }
            : msg
        )
      );
    } finally {
      setIsStreaming(false);
      streamingMessageId.current = null;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-page" id="chat-page">

      <header className="chat-header" id="chat-header">
        <div className="chat-header__left">
          <button
            className="chat-header__back"
            id="chat-back-btn"
            onClick={() => navigate('/')}
            aria-label="Go back to home"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="chat-header__avatar" id="chat-avatar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span className="chat-header__status-dot"></span>
          </div>
          <div className="chat-header__info">
            <div className="chat-header__title">
              Kasalig AI Assistant
              <span className="chat-header__online-badge">
                {isStreaming ? '✦ Replying...' : '● Online'}
              </span>
            </div>
            <div className="chat-header__subtitle">
              {isStreaming ? 'Typing a response...' : 'Ask me anything about government services'}
            </div>
          </div>
        </div>
        <div className="chat-header__actions">
          <button
            className="chat-header__home-btn"
            id="chat-new-btn"
            onClick={handleNewChat}
            aria-label="Start new conversation"
            title="New conversation"
          >
            <RotateCcw size={16} />
          </button>
          <button
            className="chat-header__home-btn"
            id="chat-home-btn"
            onClick={() => navigate('/')}
            aria-label="Go to home page"
          >
            <Home size={18} />
          </button>
        </div>
      </header>


      <main className="chat-messages" id="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`chat-bubble-wrapper chat-bubble-wrapper--${message.type}`}>
            {message.type === 'bot' && (
              <div className={`chat-bubble__bot-avatar ${!message.isComplete ? 'chat-bubble__bot-avatar--streaming' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span className="chat-header__status-dot"></span>
              </div>
            )}
            <div className="chat-bubble-content-wrap">
              <div className={`chat-bubble chat-bubble--${message.type} ${!message.isComplete ? 'chat-bubble--streaming' : ''}`}>
                {message.type === 'bot' && message.text === '' && !message.isComplete ? (
                  <div className="chat-typing-dots">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                ) : (
                  <>
                    <p className="chat-bubble__text">{formatMessageText(message.text)}</p>
                    {!message.isComplete && (
                      <span className="chat-streaming-cursor">▍</span>
                    )}
                  </>
                )}
              </div>
              {/* Application Cards injected after bot messages */}
              {message.type === 'bot' && message.isComplete && message.detectedServices && message.detectedServices.length > 0 && (
                <div className="chat-app-cards" id={`app-cards-${message.id}`}>
                  {message.detectedServices.map((svcId) => (
                    <ApplicationCard key={svcId} serviceId={svcId} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}


        {messages.length >= 1 && (
          <div className="chat-timestamp">{messages[0].time}</div>
        )}


        {messages.length === 1 && (
          <div className="chat-quick-actions" id="chat-quick-actions">
            {quickActions.map((action) => (
              <button
                key={action}
                className="chat-quick-action"
                onClick={() => handleSendMessage(action)}
              >
                {action}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>


      <div className="chat-suggestions" id="chat-suggestions">
        {suggestedQuestions.map((question) => (
          <button
            key={question}
            className="chat-suggestion-chip"
            onClick={() => handleSendMessage(question)}
            disabled={isStreaming}
          >
            <span className="chat-suggestion-chip__icon">◎</span>
            {question}
          </button>
        ))}
      </div>


      <footer className="chat-input-area" id="chat-input-area">
        <div className="chat-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            id="chat-input"
            placeholder={isStreaming ? "Wait for the reply..." : "Type your question or select a service..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
          />
          <button
            className={`chat-send-btn ${inputValue.trim() ? 'chat-send-btn--active' : ''}`}
            id="chat-send-btn"
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isStreaming}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="chat-disclaimer">Kasalig AI is a guide only. Always verify with the official government agency.</p>
      </footer>
    </div>
  );
};

export default ChatPage;
