import React, { useEffect, useState } from "react";

export default function LinkForm({ onCreate, onUpdate, editingLink, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (editingLink) {
      setTitle(editingLink.title || "");
      setUrl(editingLink.url || "");
    } else {
      setTitle("");
      setUrl("");
    }
  }, [editingLink]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    if (editingLink) {
      onUpdate(editingLink.id, { title: title.trim(), url: url.trim() });
    } else {
      onCreate({ title: title.trim(), url: url.trim() });
    }
  };

  return (
    <div style={{ background: "#f7f7f7", border: "1px solid #e5e5e5", padding: 16, borderRadius: 8 }}>
      <h2 style={{ marginTop: 0 }}>{editingLink ? "Edit Link" : "Add New Link"}</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (e.g., OpenAI)"
          style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL (e.g., https://openai.com)"
          style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit" style={{ padding: "10px 14px", borderRadius: 6, border: "none", cursor: "pointer" }}>
            {editingLink ? "Update" : "Add"}
          </button>

          {editingLink && (
            <button
              type="button"
              onClick={onCancelEdit}
              style={{ padding: "10px 14px", borderRadius: 6, border: "1px solid #ccc", cursor: "pointer", background: "white" }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
