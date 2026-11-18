package com.example.message.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PollingController {

    private final PollingService pollingService;

    @GetMapping("/polling")
    public DeferredResult<Object> longPolling(@RequestParam String user) {

        DeferredResult<Object> deferredResult = new DeferredResult<>(10000L, List.of());

        pollingService.getMessage(user, deferredResult);

        return deferredResult;
    }

    @PostMapping("/polling")
    public boolean sendChat(@RequestBody Map<String, String> body) {

        String sender = body.get("sender");
        String receiver = body.get("receiver");
        String message = body.get("message");

        pollingService.saveMessage(receiver, sender, message);
        return true;
    }

}