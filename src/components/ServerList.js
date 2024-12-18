import React from "react";
import "./ServerList.css";

const ServerList = ({ onSelectServer, selectedServer }) => {
  // 임시 서버 목록
  const servers = [
    { id: 1, name: "공용 서버" },
    { id: 2, name: "내 서버" },
    { id: 3, name: "게임 서버" },
  ];

  return (
    <div className="server-list">
      {servers.map((server) => (
        <div
          key={server.id}
          className={`server-item ${
            selectedServer === server.id ? "selected" : ""
          }`}
          onClick={() => onSelectServer(server.id)}
        >
          {server.name}
        </div>
      ))}
    </div>
  );
};

export default ServerList;
