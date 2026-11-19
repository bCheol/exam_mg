package com.example.message.polling;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class PollingService {

    private final Map<String, pollingDTO> messagesMap = new ConcurrentHashMap<>();

    public void getMessage(String user, DeferredResult<Object> deferredResult) {
        if (messagesMap.containsKey(user)) {
            pollingDTO chatDTO = messagesMap.get(user);
            deferredResult.setResult(chatDTO);
            messagesMap.remove(user);
        }

    }

    public void saveMessage(String receiver, String sender, String message) {
        messagesMap.put(receiver, new pollingDTO(sender, message));
    }

}