import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [generatedAuthCode, setGeneratedAuthCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isAuthCodeValid, setIsAuthCodeValid] = useState(false);
  const [authCodeSent, setAuthCodeSent] = useState(false);
  const [emailFeedback, setEmailFeedback] = useState("");
  const [authCodeFeedback, setAuthCodeFeedback] = useState("");
  const [nicknameFeedback, setNicknameFeedback] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8181";
  useEffect(() => {
    toggleSubmitButton();
  }, [isEmailValid, isNicknameValid, isPasswordValid, isAuthCodeValid]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(emailValue)) {
      setEmailFeedback("이메일이 유효합니다.");
      setIsEmailValid(true);
    } else {
      setEmailFeedback("올바른 이메일 형식이 아닙니다.");
      setIsEmailValid(false);
    }
  };

  const handleNicknameChange = (e) => {
    const nicknameValue = e.target.value;
    setNickname(nicknameValue);

    if (nicknameValue.length >= 2 && nicknameValue.length <= 8) {
      setNicknameFeedback("");
      setIsNicknameValid(true);
    } else {
      setNicknameFeedback("닉네임은 2~8자 사이여야 합니다.");
      setIsNicknameValid(false);
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (passwordValue.length >= 4 && passwordValue.length <= 14) {
      setPasswordFeedback("");
      setIsPasswordValid(true);
    } else {
      setPasswordFeedback("비밀번호는 4~14자 사이여야 합니다.");
      setIsPasswordValid(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    if (confirmPasswordValue === password) {
      setPasswordFeedback("");
      setIsPasswordValid(true);
    } else {
      setPasswordFeedback("비밀번호가 일치하지 않습니다.");
      setIsPasswordValid(false);
    }
  };

  const handleAuthCodeChange = (e) => {
    const authCodeValue = e.target.value;
    setAuthCode(authCodeValue);
  };

  const handleSendAuthCode = () => {
    if (isEmailValid) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      axios
        .post(`${API_BASE_URL}/send-auth-code`, { email })
        .then((response) => {
          setGeneratedAuthCode(response.data.result.authCode);
          console.log(response.data.result.authCode);
          setAuthCodeSent(true);
          setAuthCodeFeedback("인증 코드가 이메일로 전송되었습니다.");
          setCountdown(180);
        })
        .catch((error) => {
          setAuthCodeFeedback("인증 코드 전송에 실패했습니다.");
        });
    }
  };

  const handleVerifyAuthCode = () => {
    if (authCode === generatedAuthCode) {
      setAuthCodeFeedback("인증 코드가 확인되었습니다.");
      setIsAuthCodeValid(true);
      setCountdown(0);
    } else {
      setAuthCodeFeedback("인증 코드가 올바르지 않습니다.");
      setIsAuthCodeValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEmailValid && isNicknameValid && isPasswordValid && isAuthCodeValid) {
      axios
        .post(`${API_BASE_URL}/sign-up`, {
          email,
          nickname,
          password,
          authCode,
        })
        .then((response) => {
          alert("회원가입 성공!");
          navigate("/");
        })
        .catch((error) => {
          alert("회원가입 실패!");
        });
    }
  };

  const toggleSubmitButton = () => {
    const submitButton = document.getElementById("submit-button");
    if (isEmailValid && isNicknameValid && isPasswordValid && isAuthCodeValid) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원가입</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일 입력"
          />
          <div
            className={
              isEmailValid
                ? styles["valid-feedback"]
                : styles["invalid-feedback"]
            }
          >
            {emailFeedback}
          </div>
          <br></br>
          <button
            type="button"
            onClick={handleSendAuthCode}
            disabled={!isEmailValid}
          >
            이메일 인증
          </button>
          {showAlert && (
            <div className={styles["valid-feedback"]}>
              이메일 인증 번호를 전송 중입니다.
            </div>
          )}
        </div>

        {authCodeSent && (
          <div>
            <label htmlFor="auth-code">인증 코드:</label>
            <input
              type="text"
              id="auth-code"
              value={authCode}
              onChange={handleAuthCodeChange}
              placeholder="인증 코드 입력"
            />
            <button
              type="button"
              onClick={handleVerifyAuthCode}
              disabled={!authCode || countdown === 0}
            >
              인증 코드 확인
            </button>
            <span>
              {isAuthCodeValid
                ? ""
                : countdown > 0
                ? `남은 시간: ${Math.floor(countdown / 60)}분 ${
                    countdown % 60
                  }초`
                : "시간 초과! 이메일 인증을 다시 시도하세요."}
            </span>
            <div className={authCodeSent ? styles["valid-feedback"] : ""}>
              {authCodeFeedback}
            </div>
            <br></br>
          </div>
        )}

        <div>
          <label htmlFor="nickname">닉네임:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="닉네임 입력"
          />
          <div>{nicknameFeedback}</div>
          <br></br>
        </div>

        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호 입력"
          />
          <div>{passwordFeedback}</div>
          <br></br>
        </div>

        <div>
          <label htmlFor="confirm-password">비밀번호 확인:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="비밀번호 확인 입력"
          />
        </div>

        <button type="submit" id="submit-button" disabled>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
