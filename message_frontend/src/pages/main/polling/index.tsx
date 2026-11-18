import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import axios from 'axios';

export interface PollingType {
    sender: string;
    message: string;
}

export default function Polling() {

    const [chat, setChat] = useState<PollingType[]>();
    const [user, setUser] = useState('');
    const [receiver, setReceiver] = useState('');
    const [message, setMessage] = useState('');

    const longPolling = () => {

        if (!user)
            return;

        axios.get('/api/polling', { params: { user: user } })
        .then((response) => {
            const res = response.data;
            if (res.length != 0) {
                setChat([res]);
            } else {
                setChat(undefined);
            }
            longPolling();
        })
        .catch((error) => {
            console.log('longPolling ERROR :' + error);
        });
    }

    const sendPolling = () => {

        if (!user)
            return;

        if (!receiver)
            return;

        if (!message)
            return;

        axios.post('/api/polling',
        {
            sender: user,
            receiver: receiver,
            message: message
        })
        .then((response) => {
            const res = response.data;
            if (res) {
                setMessage('');
            }
        })
        .catch((error) => {
            console.log('sendPolling ERROR :' + error);
        });
    }

    useEffect(() => {

    }, [chat])

    return (
        <>
            <div className="mb-5">
                <Label>Long Polling</Label>
            </div>

            <div className="flex flex-col gap-y-3 mb-5">
                <Input
                    placeholder="회원 이름"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <Button onClick={() => longPolling()}>
                    Polling
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
                <Button onClick={() => sendPolling()}>
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