import { useMemo, useRef, useState } from "react";
import Modal from "react-modal";
import { analyzeMealWithImage, chatHealthGuide } from "../../utils/chatAPI.js";
import css from "./HealthChat.module.css";

Modal.setAppElement("#root");

const SUGGESTED_QUESTIONS = [
  "What are the calories in this meal?",
  "What is the macronutrient breakdown?",
  "How much water should I drink to stay properly hydrated?",
  "What is my recommended daily calorie intake?",
  "Is this meal healthy for my dietary goals?",
  "How much protein should I consume today?",
  "What foods are good sources of healthy fats?",
  "How can I balance my meals throughout the day?",
];

// Helper function to format text with markdown-style formatting
function formatText(text) {
  if (!text) return text;

  // Process bold text (**text**)
  const parts = [];
  let lastIndex = 0;
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    // Add text before the bold
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
    }
    // Add bold text
    parts.push({ type: 'bold', content: match[1] });
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.substring(lastIndex) });
  }

  if (parts.length === 0) return text;

  return parts.map((part, i) =>
    part.type === 'bold' ? (
      <strong key={i} className={css.boldText}>{part.content}</strong>
    ) : (
      <span key={i}>{part.content}</span>
    )
  );
}

// Helper function to format bot response text with proper structure
function formatBotResponse(text) {
  if (!text) return null;

  const elements = [];
  const lines = text.split('\n');
  let currentParagraph = [];
  let currentList = [];
  let i = 0;

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      const paraText = currentParagraph.join(' ').trim();
      if (paraText) {
        elements.push(
          <p key={i++} className={css.paragraph}>
            {formatText(paraText)}
          </p>
        );
      }
      currentParagraph = [];
    }
  }

  function flushList() {
    if (currentList.length > 0) {
      elements.push(
        <ul key={i++} className={css.list}>
          {currentList.map((item, idx) => (
            <li key={idx}>{formatText(item)}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();

    // Empty line - flush current blocks
    if (!trimmed) {
      flushList();
      flushParagraph();
      continue;
    }

    // Check for headers (###, ##, #)
    if (/^###+\s/.test(trimmed)) {
      flushList();
      flushParagraph();
      const headerText = trimmed.replace(/^###+\s/, '');
      const level = trimmed.match(/^#+/)?.[0].length || 3;
      elements.push(
        <h3 key={i++} className={css.header} data-level={level}>
          {formatText(headerText)}
        </h3>
      );
      continue;
    }

    // Check for list items
    const listMatch = trimmed.match(/^[-*•]\s(.+)$/) || trimmed.match(/^\d+[.)]\s(.+)$/);
    if (listMatch) {
      flushParagraph();
      currentList.push(listMatch[1]);
      continue;
    }

    // Regular text line
    flushList();
    if (trimmed) {
      currentParagraph.push(trimmed);
    }
  }

  // Flush any remaining content
  flushList();
  flushParagraph();

  return elements.length > 0 ? elements : null;
}

export default function HealthChat({ isOpen, onRequestClose }) {
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(false);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0 || file, [input, file]);

  function handleFileSelect(e) {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  }

  function handleRemoveFile() {
    setFile(null);
    // Reset the file input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleSuggestionClick(question) {
    setInput(question);
  }

  async function handleSend(e) {
    e?.preventDefault?.();
    if (!canSend || pending) return;
    setPending(true);

    try {
      // Append user message
      const newMessages = [...messages];
      if (input.trim()) {
        newMessages.push({ role: "user", parts: [{ text: input.trim() }] });
      }

      setMessages(newMessages);

      let response;
      try {
        if (file) {
          response = await analyzeMealWithImage({
            file,
            userContext: input.trim(),
          });
          setFile(null);
        } else {
          response = await chatHealthGuide(newMessages);
        }
      } catch (err) {
        response = {
          error: `Unexpected error: ${String(err?.message || err)}`,
        };
      }

      if (response?.error)
        newMessages.push({ role: "model", parts: [{ text: response.error }] });
      else
        newMessages.push({ role: "model", parts: [{ text: response.text }] });
      setMessages([...newMessages]);
      setInput("");
      setTimeout(
        () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
        50
      );
    } finally {
      setPending(false);
    }
  }

  function onClose() {
    setInput("");
    setFile(null);
    setPending(false);
    setMessages([]);
    onRequestClose?.();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div className={css.header}>
        <h3>Health Guide</h3>
        <button
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close chat"
        >
          ×
        </button>
      </div>

      <div className={css.body}>
        <div className={css.messages}>
          {messages.length === 0 && (
            <div className={css.suggestionsContainer}>
              <p className={css.suggestionsTitle}>Suggested questions:</p>
              <div className={css.suggestionsGrid}>
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    className={css.suggestionBtn}
                    onClick={() => handleSuggestionClick(q)}
                    type="button"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={m.role === "user" ? css.msgUser : css.msgBot}
            >
              <div className={css.bubble}>
                {m.role === "user" ? (
                  // User messages: simple text
                  m.parts?.map((p, i) => (
                    <p key={i} className={css.userText}>{p.text}</p>
                  ))
                ) : (
                  // Bot messages: formatted with structure
                  m.parts?.map((p, i) => (
                    <div key={i} className={css.botText}>
                      {formatBotResponse(p.text)}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form className={css.inputRow} onSubmit={handleSend}>
          <div className={css.uploadContainer}>
            <label className={css.uploadLabel}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className={css.fileInput}
              />
              Upload photo
            </label>
            {file && (
              <div className={css.fileInfo}>
                <span className={css.fileName}>{file.name}</span>
                <button
                  type="button"
                  className={css.removeFileBtn}
                  onClick={handleRemoveFile}
                  aria-label="Remove file"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Ask about your meal, hydration, macros..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className={css.textInput}
          />

          <button
            type="submit"
            className={css.sendBtn}
            disabled={!canSend || pending}
          >
            {pending ? "..." : "Send"}
          </button>
        </form>
      </div>
    </Modal>
  );
}
