
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";
import { Routes, useNavigate, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "Iyul 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 2,
      title: "My Second Post",
      datetime: "Iyul 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 3,
      title: "My Third Post",
      datetime: "Iyul 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
  ]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); 
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    
    axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
      .then(response => {
        const allPosts = [...posts, newPost];
        setPosts(allPosts);
        setPostTitle("");
        setPostBody("");
        navigate("/");
      })
      .catch(error => {
        console.error("Error creating post:", error);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  const handleDelete = (id) => {
    setLoading(true); 
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => {
        const postsList = posts.filter(post => post.id !== id);
        setPosts(postsList);
        navigate("/");
      })
      .catch(error => {
        console.error(`Maqolani o'chirishda xatolik yuz berdi:`, error);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  return (
    <div className='App'>
      <Header title='React JS Blog' />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path='/' element={<Home posts={searchResults} />} />
        <Route
          path='/post'
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              loading={loading}
            />
          }
        />
        <Route
          path='/post/:id'
          element={<PostPage posts={posts} handleDelete={handleDelete} loading={loading} />} 
        />
        <Route path='/about' component={<About />} />
        <Route path='*' component={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
