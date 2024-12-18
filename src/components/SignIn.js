import React from "react";

const SignIn = ({ onLogin }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#36393f",
      }}
    >
      <div
        style={{
          backgroundColor: "#2f3136",
          padding: "2rem",
          borderRadius: "5px",
          width: "300px",
        }}
      >
        <h2
          style={{ color: "#fff", textAlign: "center", marginBottom: "2rem" }}
        >
          로그인
        </h2>
        <button
          onClick={onLogin}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#5865f2",
            color: "white",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          임시 로그인
        </button>
      </div>
    </div>
  );
};

export default SignIn;
