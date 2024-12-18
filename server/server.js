// server/server.js

const express = require("express");
const path = require("path");
const app = express();

// React 앱의 빌드된 파일을 static 파일로 서빙
app.use(express.static(path.join(__dirname, "../client/build"))); // build 폴더를 서빙

// 모든 요청에 대해 React의 index.html을 반환
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// 포트 설정
const PORT = process.env.PORT || 8181;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
