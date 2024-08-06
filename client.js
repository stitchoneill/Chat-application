document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatBox = document.getElementById('chat-box');

    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            socket.emit('chat message', message);
            appendMessage(`You: ${message}`, 'self');
            messageInput.value = '';
        }
    });

    socket.on('chat message', (message) => {
        appendMessage(message, 'other');
    });

    function appendMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.classList.add('message');
        if (type === 'self') {
            messageElement.classList.add('self');
        }
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
