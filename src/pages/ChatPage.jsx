import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Home, ArrowLeft, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { askGeminiStream, resetConversation } from '../Services/gemini';

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: `Magandang araw! I'm your friend **Kasalig AI**, your Government Services AI Assistant. I'm here to help you navigate government transactions quickly and easily.\n\nWhat can I help you with today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isComplete: true,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const streamingMessageId = useRef(null);

  const quickActions = [
    'National ID Application',
    'Document Requests',
    'Business Registration',
    'What services are available?',
  ];

  const suggestedQuestions = [
    'What services are available?',
    'How long does processing take?',
    'What payment methods are accepted?',
    'Can I track my application?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  // Focus input when streaming ends
  useEffect(() => {
    if (!isStreaming && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isStreaming]);

  const formatMessageText = (text) => {
    // Split by bold markers
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
    };

    // Create a placeholder bot message for streaming
    const botMessageId = Date.now() + 1;
    streamingMessageId.current = botMessageId;

    const botMessage = {
      id: botMessageId,
      type: 'bot',
      text: '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isComplete: false,
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInputValue('');
    setIsStreaming(true);

    try {
      await askGeminiStream(messageText, (accumulatedText) => {
        // Update the bot message with the accumulated streamed text
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, text: accumulatedText }
              : msg
          )
        );
      });

      // Mark the message as complete
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, isComplete: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            : msg
        )
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                text: "I'm sorry, something went wrong. Please try again.",
                isComplete: true,
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
      {/* Chat Header */}
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

      {/* Chat Messages Area */}
      <main className="chat-messages" id="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`chat-bubble-wrapper chat-bubble-wrapper--${message.type}`}>
            {message.type === 'bot' && (
              <div className={`chat-bubble__bot-avatar ${!message.isComplete ? 'chat-bubble__bot-avatar--streaming' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
            )}
            <div className={`chat-bubble chat-bubble--${message.type} ${!message.isComplete ? 'chat-bubble--streaming' : ''}`}>
              {message.type === 'bot' && message.text === '' && !message.isComplete ? (
                // Show typing dots while waiting for first chunk
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
          </div>
        ))}

        {/* Timestamp after first bot message */}
        {messages.length >= 1 && (
          <div className="chat-timestamp">{messages[0].time}</div>
        )}

        {/* Quick action chips - show only when there's just the welcome message */}
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

      {/* Suggested Questions */}
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

      {/* Input Area */}
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
