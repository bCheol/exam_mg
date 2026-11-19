package com.example.message.sse;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SseController {

    private final SseService sseService;


    @GetMapping("/sse")
    public ResponseEntity<SseEmitter> setConnect(@RequestParam String user) {

        SseEmitter  sseEmitter = sseService.saveUser(user);
        return ResponseEntity.ok(sseEmitter);
    }

    @PostMapping("/sse")
    public void sendMessage(@RequestBody Map<String, Object> body) {

        String name = (String) body.get("name");
        String receiveUser = (String) body.get("receiveUser");
        Object data = body.get("data");

        sseService.sendMessage(name, receiveUser, data);
    }

}