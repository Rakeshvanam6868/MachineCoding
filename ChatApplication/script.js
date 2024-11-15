// JavaScript file: script.js

// Function to send message
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    
    if (messageText === "") {
      return;
    }
  
    // Create a new message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = messageText;
  
    // Add the message to the chat box
    const chatBox = document.getElementById('chat-box');
    chatBox.appendChild(messageElement);
  
    // Scroll to the bottom of the chat
    chatBox.scrollTop = chatBox.scrollHeight;
  
    // Clear the input field
    messageInput.value = "";
  }
  