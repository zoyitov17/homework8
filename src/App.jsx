import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false); // Yaratish va o'chirish uchun yuklash holati

  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("YOUR_RENDER_URL/posts");
      if (Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        console.error("Kutilmagan ma'lumot turi:", response.data);
      }
    } catch (error) {
      console.error("Postlarni olishda xatolik:", error);
    }
  };

  useEffect(() => {
    if (Array.isArray(posts)) {
      const filteredResults = posts.filter(
        (post) =>
          post.body.toLowerCase().includes(search.toLowerCase()) ||
          post.title.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(filteredResults.reverse());
    } else {
      setSearchResults([]);
    }
  }, [posts, search]);

  const createPost = async (newPostData) => {
    setLoading(true);
    try {
      const response = await axios.post("YOUR_RENDER_URL/posts", newPostData);
      setPosts((prevPosts) => [response.data, ...prevPosts]);
      navigate("/");
    } catch (error) {
      console.error("Post yaratishda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`YOUR_RENDER_URL/posts/${id}`);
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
      navigate("/");
    } catch (error) {
      console.error("Postni o'chirishda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route path="/post" element={<NewPost createPost={createPost} />} />
        <Route
          path="/post/:id"
          element={
            <PostPage posts={posts} deletePost={deletePost} loading={loading} />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
