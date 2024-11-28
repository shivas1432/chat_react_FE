
import { useState } from 'react';
import '../css/global.css';

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-form">
      <input
        type="text"
        placeholder="Type a message..."
        className="message-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="message-submit-btn">
     <h4>SEND</h4>
      </button>
    </form>
  );
};

export default MessageInput;
