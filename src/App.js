import React, { useState } from "react";
import ServerList from "./components/ServerList.js";
import ChatRoomList from "./components/ChatRoomList.js";
import ChatRoom from "./components/ChatRoom.js";
import SignIn from "./components/SignIn.js";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedServer, setSelectedServer] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // 서버 선택 핸들러
  const handleSelectServer = (serverId) => {
    setSelectedServer(serverId);
    setSelectedChannel(null); // 서버 변경 시 선택된 채널 초기화
  };

  // 채널 선택 핸들러
  const handleSelectChannel = (channelId) => {
    setSelectedChannel(channelId);
  };

  // 로그인하지 않은 경우 로그인 페이지 표시
  if (!isLoggedIn) {
    return <SignIn onLogin={handleLogin} />;
  }

  // 로그인한 경우 메인 화면 표시
  return (
    <div className="app-container">
      <div className="server-sidebar">
        <ServerList
          onSelectServer={handleSelectServer}
          selectedServer={selectedServer}
        />
      </div>
      <div className="channel-sidebar">
        <ChatRoomList
          serverId={selectedServer}
          onSelectChannel={handleSelectChannel}
          selectedChannel={selectedChannel}
        />
      </div>
      <div className="main-content">
        {selectedChannel ? (
          <div className="chat-room">
            <ChatRoom serverId={selectedServer} channelId={selectedChannel} />
          </div>
        ) : (
          <div className="welcome-message">채팅방을 선택하세요</div>
        )}
      </div>
    </div>
  );
}

export default App;
