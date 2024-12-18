import React from "react";
import "./ChatRoomList.css";

const ChatRoomList = ({ serverId, onSelectChannel, selectedChannel }) => {
  // 임시 채널 목록
  const channels = [
    { id: 1, name: "일반" },
    { id: 2, name: "게임" },
    { id: 3, name: "음악" },
  ];

  if (!serverId) {
    return (
      <div className="channel-list">
        <div className="channel-header">서버를 선택하세요</div>
      </div>
    );
  }

  return (
    <div className="channel-list">
      <div className="channel-header">채널 목록</div>
      {channels.map((channel) => (
        <div
          key={channel.id}
          className={`channel-item ${
            selectedChannel === channel.id ? "selected" : ""
          }`}
          onClick={() => onSelectChannel(channel.id)}
        >
          # {channel.name}
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
