import { useState } from "react";
import Table from "./Table";
import Form from "./Form";

export default function LinkContainer() {
  const [links, setLinks] = useState([
    { name: "Google", url: "https://google.com" },
    { name: "YouTube", url: "https://youtube.com" },
    { name: "GitHub", url: "https://github.com" },
  ]);

  function removeLink(indexToRemove) {
    setLinks((prev) => prev.filter((_, i) => i !== indexToRemove));
  }

  function addLink(newLink) {
    setLinks((prev) => [...prev, newLink]);
  }

  return (
    <div className="container">
      <h1 className="title">FavLinks</h1>
      <p className="subtitle">
        Save links you use often. Add a name + URL, and remove any row.
      </p>

      <Table linkData={links} removeLink={removeLink} />

      <h2 className="sectionTitle">Add New</h2>
      <Form onAddLink={addLink} />
    </div>
  );
}
