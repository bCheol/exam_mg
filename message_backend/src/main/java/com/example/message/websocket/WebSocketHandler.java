package com.example.message.websocket;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class WebSocketHandler extends TextWebSocketHandler {

    private final Map<String, WebSocketSession> userIdSession = new ConcurrentHashMap<>();
    private final Map<String, String> sessionUserId = new ConcurrentHashMap<>();

//    @Override
//    public void afterConnectionEstablished(WebSocketSession session) {
//
//    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage textMessage) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        UserDTO userDTO = objectMapper.readValue(textMessage.getPayload(), UserDTO.class);
        if (userDTO.getUser() != null) {
            userIdSession.put(userDTO.getUser(), session);
            sessionUserId.put(session.getId(), userDTO.getUser());
        } else {
            ChatDTO chatDTO = objectMapper.readValue(textMessage.getPayload(), ChatDTO.class);
            String sender = chatDTO.getSender();
            String receiver = chatDTO.getReceiver();
            String message = chatDTO.getMessage();

            WebSocketSession receiveSession = userIdSession.get(receiver);

            String receiverMessage = objectMapper.writeValueAsString(Map.of("sender", sender, "message", message));
            TextMessage sendMessage = new TextMessage(receiverMessage);
            receiveSession.sendMessage(sendMessage);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {

        String user = sessionUserId.get(session.getId());
        userIdSession.remove(user);
        sessionUserId.remove(session.getId());
    }

}