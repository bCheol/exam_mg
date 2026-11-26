package com.example.message.sse;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
public class SseService {

    long TIMEOUT = 1000 * 60 * 5;
    private final Map<String, SseEmitter> clientMap = new ConcurrentHashMap<>();

    public SseEmitter saveClient(String user) {

        SseEmitter sseEmitter =  new SseEmitter(TIMEOUT);
        clientMap.put(user, sseEmitter);

        // 정해진 시간이 지났을 때
        sseEmitter.onTimeout(sseEmitter::complete);

        // 연결이 끝났을 때
        // complete() 호출, 타임아웃 발생, 에러 발생
        sseEmitter.onCompletion(() -> clientMap.remove(user));

        sseEmitter.onError(e -> {
            log.error("SSE saveUser ERROR", e);
            // 연결 종료
            sseEmitter.complete();
        });

        return sseEmitter;
    }

    public void sendMessage(String sender, String receiveUser, String data) {

        SseEmitter sseEmitter = clientMap.get(receiveUser);

        try {
            sseEmitter.send(SseEmitter.event().id(sender).name(receiveUser).data(data));
        } catch (IOException e) {
            log.error("SSE sendMessage ERROR", e);
        }
    }

}