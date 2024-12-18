import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const useWebSocket = (channelId) => {
  const client = useRef(null);

  useEffect(() => {
    // STOMP 클라이언트 설정
    client.current = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"), // 스프링 서버의 웹소켓 엔드포인트
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // 연결 성공시 콜백
    client.current.onConnect = () => {
      console.log("Connected to WebSocket");

      // 채널별 구독
      client.current.subscribe(`/topic/chat/${channelId}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        // 메시지 처리 로직
        console.log("Received message:", receivedMessage);
      });
    };

    // 에러 처리
    client.current.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    // 웹소켓 연결 시작
    client.current.activate();

    // 컴포넌트 언마운트시 연결 해제
    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, [channelId]);

  // 메시지 전송 함수
  const sendMessage = (message) => {
    if (client.current && client.current.connected) {
      client.current.publish({
        destination: `/app/chat/${channelId}`,
        body: JSON.stringify(message),
      });
    }
  };

  return { sendMessage };
};

export default useWebSocket;
