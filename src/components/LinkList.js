import React from "react";

export default function LinkList({ links, onEdit, onDelete }) {
  if (!links.length) return <p>No links yet. Add one above!</p>;

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {links.map((link) => (
        <div
          key={link.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            alignItems: "center",
            background: "white",
            border: "1px solid #e5e5e5",
            padding: 12,
            borderRadius: 8,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 700 }}>{link.title}</div>
            <a href={link.url} target="_blank" rel="noreferrer">
              {link.url}
            </a>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => onEdit(link)} style={{ padding: "8px 10px", borderRadius: 6, cursor: "pointer" }}>
              Edit
            </button>
            <button
              onClick={() => onDelete(link.id)}
              style={{ padding: "8px 10px", borderRadius: 6, cursor: "pointer" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
