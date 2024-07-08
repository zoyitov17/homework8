import React, { useState } from "react";
import axios from "axios";

const NewPost = ({ createPost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPost({ title, body }); // createPost funksiyasiga title va body ni yuborish
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Post yaratishda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Yangi Post Yaratish</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sarlavha"
          required
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Matn"
          required
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? "Yaratilmoqda..." : "Postni Yaratish"}
        </button>
      </form>
    </div>
  );
};

export default NewPost;
