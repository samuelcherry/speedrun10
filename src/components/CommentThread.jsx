import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";

const CommentThread = ({
  comment,
  comments,
  replyContent,
  setReplyContent,
  handleThread,
  handleDelete,
  handleShowThread,
  showThread,
  uuid
}) => {
  const childComments = comments.filter((c) => c.threadId === comment.id);
  return (
    <div
      style={
        comment.threadId
          ? {
              marginLeft: "2rem",
              borderLeft: "1px solid #ccc",
              paddingLeft: "1rem"
            }
          : {}
      }
    >
      <div className="commentContainer">
        <div className="commentUser">{comment.Users.displayName}</div>
        <div className="commentContent">{comment.content}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "8px"
          }}
        >
          <button
            onClick={() => handleShowThread(comment.id)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <FaComment size={18} />
          </button>
          <button
            style={{ background: "none", border: "none", cursor: "pointer" }}
          ></button>
          <button
            onClick={() => handleDelete(comment.id)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <FaTrash size={18} />
          </button>
        </div>
      </div>

      {showThread?.[comment.id] && (
        <>
          <input
            className="commentBox"
            type="text"
            placeholder="Add a reply"
            value={replyContent[comment.id] || ""}
            onChange={(e) =>
              setReplyContent({
                ...replyContent,
                [comment.id]: e.target.value
              })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleThread(comment.id);
              }
            }}
          />

          {childComments.map((child) => (
            <CommentThread
              key={child.id}
              comment={child}
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
        </>
      )}
    </div>
  );
};

export default CommentThread;
