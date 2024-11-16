// script.js
const commentSection = document.getElementById("comment-section");
const commentInput = document.getElementById("comment-input");
const addCommentBtn = document.getElementById("add-comment-btn");

let comments = [];

// Function to render comments
function renderComments() {
  commentSection.innerHTML = "";
  comments.forEach((comment) => {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    // Main comment content
    commentElement.innerHTML = `
      <div>${comment.text}</div>
      <div class="actions">
        <button onclick="addReply(${comment.id})">Reply</button>
        <button onclick="deleteComment(${comment.id})">Delete</button>
      </div>
      <div id="replies-${comment.id}" class="reply"></div>
    `;

    // Render replies
    comment.replies.forEach((reply) => {
      const replyElement = document.createElement("div");
      replyElement.classList.add("comment");
      replyElement.style.marginLeft = "20px";
      replyElement.innerHTML = `
        <div>${reply.text}</div>
        <div class="actions">
          <button onclick="deleteReply(${comment.id}, ${reply.id})">Delete</button>
        </div>
      `;
      commentElement.querySelector(`#replies-${comment.id}`).appendChild(replyElement);
    });

    commentSection.appendChild(commentElement);
  });
}

// Function to add a new comment
addCommentBtn.addEventListener("click", () => {
  const text = commentInput.value.trim();
  if (text) {
    const newComment = { id: Date.now(), text, replies: [] };
    comments.push(newComment);
    commentInput.value = "";
    renderComments();
  }
});

// Function to delete a comment
function deleteComment(commentId) {
  comments = comments.filter((comment) => comment.id !== commentId);
  renderComments();
}

// Function to add a reply
function addReply(commentId) {
  const replyText = prompt("Write your reply:");
  if (replyText) {
    const comment = comments.find((c) => c.id === commentId);
    comment.replies.push({ id: Date.now(), text: replyText });
    renderComments();
  }
}

// Function to delete a reply
function deleteReply(commentId, replyId) {
  const comment = comments.find((c) => c.id === commentId);
  comment.replies = comment.replies.filter((reply) => reply.id !== replyId);
  renderComments();
}
