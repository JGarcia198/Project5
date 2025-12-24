import { useState } from "react";

export default function Form({ onAddLink }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  function normalizeUrl(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return "";
    // Small “make it yours” improvement: auto-add https:// if missing
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
    return `https://${trimmed}`;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanUrl = normalizeUrl(url);

    if (!cleanName || !cleanUrl) {
      setError("Please enter both a name and a URL.");
      return;
    }

    setError("");
    onAddLink({ name: cleanName, url: cleanUrl });

    setName("");
    setUrl("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label">
        Name
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Google"
        />
      </label>

      <label className="label">
        URL
        <input
          className="input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="e.g., google.com or https://google.com"
        />
      </label>

      {error ? <p className="error">{error}</p> : null}

      <button className="btnPrimary" type="submit">
        Add Link
      </button>
    </form>
  );
}
