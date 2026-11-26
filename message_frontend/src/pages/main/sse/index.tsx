import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import axios from 'axios';

export interface ChatType {
    sender: string;
    message: string;
}

export default function SsePage() {

    const [user, setUser] = useState('');
    const [receiver, setReceiver] = useState('');
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState<ChatType[]>();

    const connectServer = () => {

        if (!user)
            return;

        const sseEvent = new EventSource('/api/sse?user=' + user);

        // SSE 이벤트 이름 지정
        sseEvent.addEventListener(user, (event) => {
            console.log(event);
            setChat([{sender: event.lastEventId, message: event.data}]);
        })

        // 이벤트 이름 없이 보냄
        sseEvent.onmessage = (event) => {
            console.log(event);
        }

        // 에러 및 연결 종료 처리
        sseEvent.onerror = (error) => {
            console.error('connectServer ERROR :', error);
            sseEvent.close();
        };
    }

    const sendMessage = () => {

        if (!receiver)
            return;

        if (!message)
            return;

        axios.post('/api/sse',
        {
            sender: user,
            receiver: receiver,
            message: message
        })
        .then((response) => {
            console.log(response);
            setMessage('');
        })
        .catch((error) => {
            console.log('SSE sendMessage ERROR :' + error);
        });
    }

    useEffect(() => {

    }, [chat])

    return (
        <>
            <div className="mb-5">
                <Label>Sever-Send Event</Label>
            </div>

            <div className="flex flex-col gap-y-3 mb-5">
                <Input
                    placeholder="회원 이름 (보내는 회원)"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <Button onClick={() => connectServer()}>
                    연결
                </Button>
                <Input
                    placeholder="받는 회원"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                />
                <Input
                    placeholder="보내는 메시지"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <div className="flex flex-col mb-5">
                <Button onClick={() => sendMessage()}>
                    전송
                </Button>
            </div>
            <div>
                {chat ?
                    <div className="flex flex-col gap-y-5">
                        <Label>보낸 사람 : {chat[0]?.sender}</Label>
                        <Label>받은 메시지 : {chat[0]?.message}</Label>
                    </div>
                : ''}
            </div>
        </>
    );
}