import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ isLoggedIn, name, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // onLogout 함수를 호출하여 로그인 상태 변경
    navigate("/"); // 홈페이지로 이동
  };

  const handleLogin = () => {
    navigate("/sign-in"); // 로그인 페이지로 이동
  };

  const handleTitleClick = () => {
    navigate("/"); // RE:BOOK 클릭 시 홈페이지로 이동
  };

  const handleBookList = () => {
    navigate("/board/list"); // 책 목록 페이지로 이동
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title} onClick={handleTitleClick}>
        RE:BOOK
      </h1>
      <div style={styles.userInfo}>
        <button onClick={handleBookList} style={styles.button}>
          책 목록
        </button>
        {isLoggedIn ? (
          <>
            <span style={styles.welcome}>Welcome, {name}!</span>
            <button onClick={handleLogout} style={styles.button}>
              Log Out
            </button>
          </>
        ) : (
          <button onClick={handleLogin} style={styles.button}>
            Log In
          </button>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
  },
  title: {
    fontSize: "24px",
    margin: 0,
    cursor: "pointer", // 클릭 가능하다는 시각적 힌트를 추가
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  welcome: {
    fontSize: "16px",
  },
  button: {
    padding: "5px 10px",
    backgroundColor: "#fff",
    color: "#007BFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Header;
