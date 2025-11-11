import { useMemo, useRef, useState } from "react";
import Modal from "react-modal";
import { analyzeMealWithImage, chatHealthGuide } from "../../utils/chatAPI.js";
import css from "./HealthChat.module.css";

Modal.setAppElement("#root");

export default function HealthChat({ isOpen, onRequestClose }) {
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(false);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const bottomRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0 || file, [input, file]);

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
          <label className={css.uploadLabel}>
            <input
              type="file"
              accept="image/*"
              onChange={e => setFile(e.target.files?.[0] || null)}
              className={css.fileInput}
            />
            Upload photo
          </label>

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
