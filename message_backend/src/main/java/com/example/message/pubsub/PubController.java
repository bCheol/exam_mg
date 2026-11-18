package com.example.message.pubsub;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PubController {

     private final PubService pubService;

     @GetMapping("/channel")
     public void subChannel(@RequestParam String channel) {
          pubService.subChannel(channel);
     }

     @GetMapping("/cancel")
     public void cancelChannel(@RequestParam String channel) {
          pubService.cancelChannel(channel);
     }

     @PostMapping("/send")
     public boolean sendMessage(@RequestBody Map<String, String> body) {

          String channel = body.get("channel");
          String message = body.get("message");

          pubService.sendMessage(channel, message);

          return true;
     }

}