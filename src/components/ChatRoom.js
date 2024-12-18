import React from "react";
import "./ChatRoom.css";

const ChatRoom = ({ serverId, channelId }) => {
  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>채널 {channelId}</h3>
      </div>
      <div className="message-list">
        {/* 메시지 목록이 여기에 표시됩니다 */}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          className="message-input"
          placeholder="메시지를 입력하세요..."
        />
      </div>
    </div>
  );
};

export default ChatRoom;
