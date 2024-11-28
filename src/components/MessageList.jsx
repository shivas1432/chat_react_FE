import '../css/global.css';
const MessageList = ({ messages = [] }) => {
  return (
    <div className="message-list">
      {messages.length > 0 ? (
        messages.map((message) => (
          <div 
            key={message.id} 
            className={`message-item ${message.sender === 'self' ? 'self-message' : 'other-message'}`}
          >
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))
      ) : (
        <p>No messages available</p>
      )}
    </div>
  );
};

export default MessageList;
