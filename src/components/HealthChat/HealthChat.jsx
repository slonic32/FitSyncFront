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
                {m.parts?.map((p, i) => (
                  <p key={i}>{p.text}</p>
                ))}
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
