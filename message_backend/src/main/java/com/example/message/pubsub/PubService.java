package com.example.message.pubsub;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PubService {

    private final RedisMessageListenerContainer redisMessageListenerContainer;
    private final SubscribeListener subscribeListener;
    private final RedisTemplate<String, Object> redisTemplate;

    public void subChannel(String channel) {
        redisMessageListenerContainer.addMessageListener(subscribeListener, new ChannelTopic(channel));
    }

    public void cancelChannel(String channel) {
        redisMessageListenerContainer.removeMessageListener(subscribeListener);
    }

    public void sendMessage(String channel, String message) {
        redisTemplate.convertAndSend(new ChannelTopic(channel).getTopic(), message);
    }

}