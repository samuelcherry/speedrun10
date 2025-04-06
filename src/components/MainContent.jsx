import React, { useState, useEffect } from "react";
import Header from "./Header";
import supabase from "../../supabaseClient";
import Posts from "./Posts";
import { fetchPosts } from "../utils/fetchPosts";

const MainContent = () => {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const uuid = localStorage.getItem("uuid");

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const { data, error: postError } = await supabase.from("Posts").insert({
        uuid: uuid,
        content: content
      });

      if (postError) {
        throw postError;
      }
      setContent("");
      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <div>
      <div className="headerContainer">
        <Header />
        <form className="statusBar" onSubmit={handlePost}>
          <input
            type="text"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit" className="styleButton">
            POST
          </button>
        </form>
        <div>
          <Posts posts={posts} setPosts={setPosts} />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
