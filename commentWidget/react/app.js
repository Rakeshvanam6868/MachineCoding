import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), text: newComment, replies: [] },
      ]);
      setNewComment("");
    }
  };

  const deleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  const addReply = (commentId, replyText) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                { id: Date.now(), text: replyText },
              ],
            }
          : comment
      )
    );
  };

  const deleteReply = (commentId, replyId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.filter(
                (reply) => reply.id !== replyId
              ),
            }
          : comment
      )
    );
  };

  return (
    <div className="comment-widget">
      <h2>Comment Widget</h2>
      <div className="comment-section">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div>{comment.text}</div>
            <div className="actions">
              <button
                onClick={() => {
                  const replyText = prompt("Write your reply:");
                  if (replyText) addReply(comment.id, replyText);
                }}
              >
                Reply
              </button>
              <button onClick={() => deleteComment(comment.id)}>Delete</button>
            </div>
            <div className="replies">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="comment reply">
                  <div>{reply.text}</div>
                  <div className="actions">
                    <button
                      onClick={() => deleteReply(comment.id, reply.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="add-comment">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={addComment}>Post Comment</button>
      </div>
    </div>
  );
};

export default App;
