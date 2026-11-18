package com.example.message.pubsub;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Slf4j
@Service
@RequiredArgsConstructor
public class SubscribeListener implements MessageListener {

    @Override
    public void onMessage(Message message, byte[] pattern) {

        String channel = new String(message.getChannel(), StandardCharsets.UTF_8);
        String getMessage = new String(message.getBody(), StandardCharsets.UTF_8);

        log.info("channel : " + channel);
        log.info("message : " + getMessage);
    }

}