// import Post from './Post';

// const Feed = ({ posts }) => {
//     return (
//         <>
//             {posts.map(post => (
//                 <Post key={post.id} post={post} />
//             ))}
//         </>
//     )
// }

// export default Feed


import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";

const Feed = ({ posts, setPosts }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("RENDER_LINK/posts") // RENDER_LINK o'rniga o'zingizning server URLingizni yozing
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, [setPosts]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </>
      )}
    </div>
  );
};

export default Feed;
