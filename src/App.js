useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await axios.get("YOUR_RENDER_URL/posts");
      if (Array.isArray(response.data)) {
        // Agar response.data postlar massivi bo'lsa
        setPosts(response.data);
      } else {
        console.error("Kutilmagan ma'lumot turi:", response.data);
      }
    } catch (error) {
      console.error("Postlarni olishda xatolik:", error);
    }
  };

  fetchPosts();
}, []);
