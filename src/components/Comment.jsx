import React, { useEffect, useState } from "react";
import { fetchComments } from "../utils/fetchComments";
import supabase from "../../supabaseClient";
import CommentThread from "./CommentThread";

const Comment = ({ postId }) => {
  const uuid = localStorage.getItem("uuid");
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [showThread, setShowThread] = useState({});
  const [replyContent, setReplyContent] = useState({});

  const topLevelComments = comments.filter((c) => c.threadId === null);

  useEffect(() => {
    if (!postId) return;
    const loadComments = async () => {
      const data = await fetchComments(postId);
      setComments(data);
    };

    loadComments();
  }, [postId]);

  const handleComment = async (postId) => {
    try {
      const { data: commentData, error: commentError } = await supabase
        .from("Comments")
        .insert({
          content: commentContent,
          uuid: uuid,
          postId: postId,
          threadId: null
        });
      setCommentContent("");
      const updatedComments = await fetchComments(postId);
      setComments(updatedComments);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const handleThread = async (commentId) => {
    try {
      const content = replyContent[commentId];
      if (!content) return;

      const { data, error } = await supabase.from("Comments").insert({
        content,
        uuid,
        postId,
        threadId: commentId
      });
      setReplyContent({ ...replyContent, [commentId]: "" });
      const updatedComments = await fetchComments(postId);
      setComments(updatedComments);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const { error: deleteError } = await supabase
        .from("Comments")
        .delete()
        .eq("id", commentId);

      if (deleteError) {
        throw deleteError;
      }

      const updatedComments = await fetchComments(postId);
      setComments(updatedComments);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    console.log("DELETE");
  };

  const handleShowThread = (commentId) => {
    setShowThread((prev) => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  return (
    <div>
      <input
        className="commentBox"
        type="text"
        placeholder="Add a comment"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleComment(postId);
          }
        }}
      />

      <div>
        {topLevelComments.map((comment) => (
          <CommentThread
            key={comment.id}
            comment={comment}
            comments={comments}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
            handleThread={handleThread}
            handleDelete={handleDelete}
            handleShowThread={handleShowThread}
            showThread={showThread}
            uuid={uuid}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
