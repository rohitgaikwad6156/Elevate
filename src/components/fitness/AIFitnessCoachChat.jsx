import { useState, useRef, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Send,
  RotateCcw,
  Bot,
  User,
} from 'lucide-react';
import {
  fetchCoachResponse,
  buildUserFitnessContext,
} from '../../lib/aiFitnessCoachService';
import { useProfile } from '../../hooks/useProfile';
import {
  fitnessProfile,
  fitnessScoreData,
  personalFitnessGoals,
  userFitnessPreferences,
  recoveryData,
  recentWorkoutsList,
} from '../../data/fitnessData';
import styles from './AIFitnessCoachChat.module.css';

export default function AIFitnessCoachChat() {
  const { profile } = useProfile();

  // Dynamic context assembled from real Firestore profile + fitness preferences
  const fitnessContext = useMemo(() => {
    return buildUserFitnessContext(profile, {
      fitnessProfile,
      fitnessScoreData,
      personalFitnessGoals,
      userFitnessPreferences,
      recoveryData,
      recentWorkoutsList,
    });
  }, [profile]);

  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'ai',
      text: `👋 Hi ${profile?.name || 'there'}! I'm your ELEVATE AI Fitness Coach. I'm here to give you friendly, personalized fitness workouts, posture resets, recovery, and nutrition guidance tailored to your ${fitnessContext.fitnessLevel} level and ${fitnessContext.fitnessGoal} goal! 😊`,
      time: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "give me chest exercise",
    "i am beginner so give me diet plan",
    "what should i workout today?",
    "how do i fix rounded shoulders?",
    "give me a 3 day workout",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isTyping) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInputValue('');
    setIsTyping(true);

    try {
      // Calls Gemini endpoint with full conversation memory & profile context
      const { text, isGuardrail } = await fetchCoachResponse(updatedHistory, fitnessContext);

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text,
        isGuardrail,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Coach response error:', err);
      const errorMsg = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: "Sorry, I couldn't connect to your coach right now. Please try again in a moment. 💜",
        isGuardrail: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'ai',
        text: `Chat cleared! How can I help you today with your workouts, diet, or posture? 😊`,
        time: 'Just now',
      },
    ]);
  };

  return (
    <div className={styles.chatContainer}>
      {/* Header */}
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderLeft}>
          <div className={styles.coachAvatar}>
            <Sparkles size={18} />
          </div>
          <div>
            <div className={styles.coachTitle}>ELEVATE AI Fitness Coach</div>
            <div className={styles.coachStatus}>
              <span className={styles.statusDot} />
              Personalized ({fitnessContext.fitnessLevel} • {fitnessContext.fitnessGoal})
            </div>
          </div>
        </div>

        <button
          type="button"
          className={styles.clearBtn}
          onClick={handleClear}
          title="Reset conversation"
        >
          <RotateCcw size={13} />
          Clear
        </button>
      </div>

      {/* Suggestion Chips */}
      <div className={styles.chipsRow}>
        {quickPrompts.map((p) => (
          <button
            key={p}
            type="button"
            className={styles.chipBtn}
            onClick={() => handleSend(p)}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className={styles.messagesArea}>
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`${styles.messageRow} ${isUser ? styles.userRow : styles.aiRow}`}
            >
              <div className={`${styles.msgAvatar} ${isUser ? styles.userAvatar : styles.aiAvatar}`}>
                {isUser ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div
                className={`${styles.msgBubble} ${
                  isUser
                    ? styles.userBubble
                    : m.isGuardrail
                    ? `${styles.aiBubble} ${styles.guardrailWarning}`
                    : styles.aiBubble
                }`}
              >
                <div style={{ whiteSpace: 'pre-line' }}>{m.text}</div>
                <span className={styles.msgTime}>{m.time}</span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className={`${styles.messageRow} ${styles.aiRow}`}>
            <div className={`${styles.msgAvatar} ${styles.aiAvatar}`}>
              <Bot size={14} />
            </div>
            <div className={styles.typingIndicator}>
              <span className={styles.typingDot} />
              <span className={styles.typingDot} />
              <span className={styles.typingDot} />
              <span style={{ fontSize: '11px', color: 'var(--color-primary, #6366f1)', marginLeft: '6px', fontWeight: 600 }}>
                ELEVATE Coach is thinking... ✨
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={styles.inputArea}>
        <form
          className={styles.inputForm}
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            className={styles.chatInput}
            placeholder="Ask about workouts, meal plans, posture, recovery, or form..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={!inputValue.trim() || isTyping}
            aria-label="Send question"
          >
            <Send size={15} />
          </button>
        </form>
        <div className={styles.inputFooter}>
          <span>💡 Synced with your ELEVATE profile & fitness settings.</span>
          <span>Press Enter to send</span>
        </div>
      </div>
    </div>
  );
}
