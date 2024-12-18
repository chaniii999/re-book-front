import React from "react";

const TitleBar = () => {
  return (
    <div className="title-bar">
      <div className="title-bar-menu">
        <div className="menu-item">파일</div>
        <div className="menu-item">채팅</div>
        <div className="menu-item">보기</div>
      </div>
      <div className="window-controls">
        <button className="window-control minimize">─</button>
        <button className="window-control maximize">□</button>
        <button className="window-control close">×</button>
      </div>
    </div>
  );
};

export default TitleBar;
