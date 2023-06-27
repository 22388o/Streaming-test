const videoPlayer = document.getElementById('video-player');
const chatBox = document.getElementById('chat-box');

// Fetch the video feed URL from the server
fetch('http://localhost:8000')
  .then(response => response.blob())
  .then(blob => {
    const videoUrl = URL.createObjectURL(blob);
    videoPlayer.src = videoUrl;
  });

// Fetch chat messages from the server
function fetchChatMessages() {
  fetch('http://localhost:3000/chat-messages')
    .then(response => response.json())
    .then(data => {
      // Clear existing chat messages
      chatBox.innerHTML = '';

      // Display chat messages
      data.forEach(message => {
        const chatMessage = document.createElement('p');
        chatMessage.textContent = message;
        chatBox.appendChild(chatMessage);
      });

      // Scroll to the bottom of the chat box
      chatBox.scrollTop = chatBox.scrollHeight;
    });
}

// Fetch chat messages initially
fetchChatMessages();

// Fetch chat messages periodically
setInterval(fetchChatMessages, 3000);
