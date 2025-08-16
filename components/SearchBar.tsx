import { useState, useRef } from "react";
import styles from "./SearchBar.module.css";

interface Props {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: Props) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!loading && value.trim()) {
      setSearching(true);
      onSearch(value.trim());
      inputRef.current?.blur();
      setTimeout(() => setSearching(false), 900);
    }
  }

  return (
    <form
      className={`${styles.form} ${focused ? styles.focused : ""}`}
      onSubmit={handleSubmit}
      tabIndex={-1}
    >
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="Search for anything..."
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={loading}
        aria-label="Search"
        autoFocus
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <button
        type="submit"
        className={styles.button}
        disabled={loading || !value.trim()}
        aria-label="Search"
      >
        {loading ? (
          <span className={styles.loader}>
            <img src="/loader.svg" alt="Loading..." />
          </span>
        ) : (
          <span className={styles.icon}>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="#fff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              style={{
                transform: searching ? "scale(1.18) rotate(15deg)" : undefined,
                transition: "transform 0.4s cubic-bezier(.6,-0.28,.74,.05)"
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
        )}
        <span className={styles.ripple} />
      </button>
      {searching && (
        <span className={styles.searchingText}>Searching…</span>
      )}
    </form>
  );
}