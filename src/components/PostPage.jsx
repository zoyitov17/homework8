
import { useParams, Link } from "react-router-dom";

const PostPage = ({ posts, handleDelete, loading }) => {
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    
    return (
      <main className="PostPage">
        <article className="post">
          {post && (
            <>
              <h2>{post.title}</h2>
              <p className="postDate">{post.datetime}</p>
              <p className="postBody">{post.body}</p>
              <button onClick={() => handleDelete(post.id)} disabled={loading}>
                {loading ? `Deleting...` : "Delete Post"}
              </button>
            </>
          )}
          {!post && (
            <>
              <h2>Article not found</h2>
              <p>Disapointing...</p>
              <p>
                <Link to="/">Go to the home page</Link>
              </p>
            </>
          )}
        </article>
      </main>
    );
}

export default PostPage;
