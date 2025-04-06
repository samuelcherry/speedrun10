import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import supabase from "../../supabaseClient";
import { fetchPosts } from "../utils/fetchPosts";
import Comment from "./Comment";

const Posts = ({ posts, setPosts }) => {
  const [openComments, setOpenComments] = useState({});
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const handleDelete = async (postId) => {
    try {
      const { error: deleteError } = await supabase
        .from("Posts")
        .delete()
        .eq("id", postId);

      if (deleteError) {
        throw deleteError;
      }

      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const handleShowComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <div className="postContainer">
            <div className="postUser">{post.Users.displayName}</div>
            <div className="postContent">
              <div>{post.content}</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "8px"
                }}
              >
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer"
                  }}
                  onClick={() => handleShowComments(post.id)}
                >
                  <FaComment size={18} />
                </button>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer"
                  }}
                  onClick={() => handleDelete(post.id)}
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          </div>
          {openComments[post.id] && (
            <Comment comments={comments} postId={post.id} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Posts;
