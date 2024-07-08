import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const PostPage = ({ posts, deletePost, loading }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((post) => post.id.toString() === id);

  const onDelete = async () => {
    if (loading) return; // O'chirish jarayoni davom etmasligi uchun tekshirish
    if (window.confirm("Haqiqatdan ham bu postni o'chirmoqchimisiz?")) {
      await deletePost(id);
    }
  };

  return (
    <main className="PostPage">
      <article className="post">
        {post ? (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <button onClick={onDelete} disabled={loading}>
              {loading ? "O'chirilmoqda..." : "Postni O'chirish"}
            </button>
            <button onClick={() => navigate("/")} disabled={loading}>
              Bekor Qilish
            </button>
          </>
        ) : (
          <>
            <h2>Post Topilmadi</h2>
            <p>Afsuski, bu post mavjud emas.</p>
            <p>
              <Link to="/">Bosh sahifaga qaytish</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
