import { useState } from 'react';
import {
  X,
  Sparkles,
  Send,
  Bot,
  User,
  Lightbulb,
  Zap,
  HelpCircle,
} from 'lucide-react';
import styles from './AITutorModal.module.css';

export default function AITutorModal({ contextTopic, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello Rohit! I'm your AI Learning Tutor. We're currently looking at "${contextTopic || 'Professional Communication & Executive Clarity'}". What would you like to explore or practice?`,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chips = [
    { label: 'Explain simply', prompt: 'Explain the PREP framework like I am a beginner.' },
    { label: 'Give an example', prompt: 'Give me a realistic workplace example of answering a difficult manager question using PREP.' },
    { label: 'Quiz me', prompt: 'Quiz me on identifying hedge words and word padding in a sentence.' },
    { label: 'Challenge me', prompt: 'Give me a complex executive scenario to test my communication conciseness.' },
    { label: 'Real-world application', prompt: 'How do I use this framework when giving unexpected status updates in Slack?' },
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = `Great question! When applying this concept, focus on the principle of Bottom Line Up Front (BLUF). State the final decision in sentence 1, follow with 1 concrete reason, and end with the next step.`;
      if (query.toLowerCase().includes('quiz')) {
        aiResponseText = `Here is your quick drill: Which sentence has higher executive authority?\nA: "I feel like we should maybe delay the rollout."\nB: "I recommend shifting the rollout by 48 hours to complete security tests."\n(Reply with A or B!)`;
      } else if (query.toLowerCase().includes('example')) {
        aiResponseText = `Here is a real example:\n• Question: "Why are we behind schedule?"\n• PREP Answer: "We need 2 extra days because third-party API rate limits failed under load. We deployed local mocking today and will finish testing on Friday."`;
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: aiResponseText },
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.avatarRow}>
            <div className={styles.botAvatar}>
              <Bot size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className={styles.title}>AI Learning Tutor</h3>
              <p className={styles.subtitle}>Context: {contextTopic || 'Professional Communication'}</p>
            </div>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Message Thread */}
        <div className={styles.chatBody}>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`${styles.msgRow} ${m.sender === 'user' ? styles.msgUserRow : styles.msgAiRow}`}
            >
              {m.sender === 'ai' && (
                <div className={styles.senderAvatar}>
                  <Bot size={14} color="var(--color-primary)" />
                </div>
              )}
              <div
                className={`${styles.msgBubble} ${
                  m.sender === 'user' ? styles.msgBubbleUser : styles.msgBubbleAi
                }`}
              >
                <p className={styles.msgText}>{m.text}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className={`${styles.msgRow} ${styles.msgAiRow}`}>
              <div className={styles.senderAvatar}>
                <Bot size={14} color="var(--color-primary)" />
              </div>
              <div className={styles.msgBubbleAi}>
                <span className={styles.typingDot}>AI is formulating response...</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Chips */}
        <div className={styles.chipsRow}>
          {chips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              className={styles.chipBtn}
              onClick={() => handleSend(chip.prompt)}
            >
              <Sparkles size={11} color="var(--color-primary)" />
              {chip.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className={styles.inputBar}>
          <input
            type="text"
            className={styles.chatInput}
            placeholder="Ask your tutor anything or type your answer..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            type="button"
            className={styles.sendBtn}
            onClick={() => handleSend()}
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
