import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { FiMessageCircle } from 'react-icons/fi'; // Example icon from react-icons
import '../css/chatWindow.css'; // Make sure you have the updated CSS

const ChatWindow = ({ messages, sendMessage }) => {
  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-header-title">
          <FiMessageCircle className="chat-icon" />
          <h2>Welcome to My Chatbox!</h2>
        </div>
        <p className="chat-description">This is where you can start chatting with your friends.</p>
      </div>

      <main className="message-list-container">
        <MessageList messages={messages} />
      </main>

      <footer className="message-input-container">
        <MessageInput onSend={sendMessage} />
      </footer>
    </div>
  );
};

export default ChatWindow;
