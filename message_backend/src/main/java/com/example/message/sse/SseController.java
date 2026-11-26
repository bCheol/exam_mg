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
    public ResponseEntity<SseEmitter> saveClient(@RequestParam String user) {

        SseEmitter sseEmitter = sseService.saveClient(user);
        return ResponseEntity.ok(sseEmitter);
    }

    @PostMapping("/sse")
    public void sendMessage(@RequestBody Map<String, Object> body) {

        String sender = (String) body.get("sender");
        String receiver = (String) body.get("receiver");
        String message = (String) body.get("message");

        sseService.sendMessage(sender, receiver, message);
    }

}