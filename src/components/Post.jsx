



import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <Link to={`/post/${post.id}`}>Read more</Link>
    </div>
  );
};

export default Post;
