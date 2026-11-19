import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function SSE() {

    const [receiveMessage, setReceiveMessage] = useState('');
    const [user, setUser] = useState('');
    const [receiveUser, setReceiveUser] = useState('');
    const [message, setMessage] = useState('');

    const connectSse = () => {

        if (!user)
            return;

        // SSE 이벤트 이름 지정
        const sseEvent = new EventSource('/api/sse?user=' + user);
        sseEvent.addEventListener('sse', (event) => {
            setReceiveMessage(event.data);
        })

        // 이벤트 이름 없이 보냄
        sseEvent.onmessage = (event) => {
            console.log(event.data);
        }

        // 에러 및 연결 종료 처리
        sseEvent.onerror = (error) => {
            console.error('connectSse ERROR :', error);
            sseEvent.close();
        };
    }

    const sendSse = () => {

        if (!receiveUser)
            return;

        if (!message)
            return;

        axios.post('/api/sse',
        {
            name: 'sse',
            receiveUser: receiveUser,
            data: message
        })
        .then((response) => {
            const res = response.data;
            setMessage('');
        })
        .catch((error) => {
            console.log('sendSse ERROR :' + error);
        });
    }

    useEffect(() => {

    }, [receiveMessage])

    return (
        <>
            <div className="mb-5">
                <Label>Sever-Send Event</Label>
            </div>

            <div className="flex flex-col gap-y-3 mb-5">
                <Input
                    placeholder="회원 이름"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <Button onClick={() => connectSse()}>
                    연결
                </Button>
                <Input
                    placeholder="받는 회원"
                    value={receiveUser}
                    onChange={(e) => setReceiveUser(e.target.value)}
                />
                <Input
                    placeholder="보내는 메시지"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <div className="flex flex-col mb-5">
                <Button onClick={() => sendSse()}>
                    전송
                </Button>
            </div>
            <div>
                {receiveMessage ?
                    <div className="flex flex-col gap-y-5">
                        <Label>받은 메시지 : {receiveMessage}</Label>
                    </div>
                : ''}
            </div>
        </>
    );
}