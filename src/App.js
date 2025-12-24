import React, { useEffect, useMemo, useState } from "react";
import LinkForm from "./components/LinkForm";
import LinkList from "./components/LinkList";

const API_URL = "http://localhost:3001";

export default function App() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingLink, setEditingLink] = useState(null);

  const sortedLinks = useMemo(() => {
    return [...links].sort((a, b) => a.id - b.id);
  }, [links]);

  const fetchLinks = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await fetch(`${API_URL}/links`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load links");
      setLinks(data);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const createLink = async ({ title, url }) => {
    try {
      setError("");
      const res = await fetch(`${API_URL}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Create failed");
      // refresh from DB so UI always matches database
      await fetchLinks();
    } catch (e) {
      setError(e.message || "Create failed");
    }
  };

  const updateLink = async (id, { title, url }) => {
    try {
      setError("");
      const res = await fetch(`${API_URL}/links/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Update failed");
      setEditingLink(null);
      await fetchLinks();
    } catch (e) {
      setError(e.message || "Update failed");
    }
  };

  const deleteLink = async (id) => {
    try {
      setError("");
      const res = await fetch(`${API_URL}/links/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Delete failed");
      await fetchLinks();
    } catch (e) {
      setError(e.message || "Delete failed");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ marginBottom: 8 }}>FavLinks (Full Stack)</h1>
      <p style={{ marginTop: 0, color: "#555" }}>
        React frontend + Express API + PostgreSQL database (CRUD)
      </p>

      {error && (
        <div style={{ background: "#ffe6e6", border: "1px solid #ffb3b3", padding: 12, borderRadius: 6, marginBottom: 16 }}>
          <b>Error:</b> {error}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
        <LinkForm
          onCreate={createLink}
          onUpdate={updateLink}
          editingLink={editingLink}
          onCancelEdit={() => setEditingLink(null)}
        />

        <div style={{ background: "#f7f7f7", border: "1px solid #e5e5e5", padding: 16, borderRadius: 8 }}>
          <h2 style={{ marginTop: 0 }}>Saved Links</h2>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <LinkList
              links={sortedLinks}
              onEdit={(link) => setEditingLink(link)}
              onDelete={(id) => deleteLink(id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
