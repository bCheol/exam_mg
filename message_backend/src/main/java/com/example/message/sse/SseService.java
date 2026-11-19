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
    private final Map<String, SseEmitter> sseMap = new ConcurrentHashMap<>();

    public SseEmitter saveUser(String user) {

        SseEmitter sseEmitter =  new SseEmitter(TIMEOUT);
        sseMap.put(user, sseEmitter);

        // 정해진 시간이 지났을 때
        sseEmitter.onTimeout(sseEmitter::complete);

        // 연결이 끝났을 때
        // complete() 호출, 타임아웃 발생, 에러 발생
        sseEmitter.onCompletion(() -> sseMap.remove(user));

        sseEmitter.onError(e -> {
            log.warn("Sse saveUser ERROR", e);
            sseEmitter.complete();
        });

        return sseEmitter;
    }

    public void sendMessage(String name, String receiveUser, Object data) {

        SseEmitter sseEmitter = sseMap.get(receiveUser);

        try {
            sseEmitter.send(SseEmitter.event().id(receiveUser).name(name).data(data));
        } catch (IOException e) {
            log.warn("Sse sendMessage ERROR", e);
        }
    }

}