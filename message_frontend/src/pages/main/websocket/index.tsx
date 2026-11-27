import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";

export interface ChatType {
    sender: string;
    message: string;
}

export default function WebSoketPage() {

    const socketRef = useRef<WebSocket>(null);
    const [user, setUser] = useState('');
    const [receiver, setReceiver] = useState('');
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState<ChatType[]>();
    
    const connectServer = () => {

        if (!user)
            return;

        if (!socketRef.current) {
            const socket = new WebSocket("/ws/chat");

            socket.onopen = () => {
                socketRef.current = socket;
                socket.send(JSON.stringify({user: user}));
            };

            socket.onclose = () => {
                console.log('WebSocket Close');
            }

            socket.onerror = (error) => {
                console.log('WebSocket connectServer ERROR : ' + error);
            }

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setChat([{sender: data.sender, message: data.message}]);
            }
        }
    }

    const sendMessage = () => {

        if (!user)
            return;

        if (!receiver)
            return;

        if (!message)
            return;

        socketRef.current?.send(
            JSON.stringify({sender: user, receiver: receiver , message: message})
        );
    }

    useEffect(() => {

    }, [chat])

    return (
        <>
            <div className="mb-5">
                <Label>WebSocket</Label>
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
                        <Label>보낸 사람 : {chat[0].sender}</Label>
                        <Label>받은 메시지 : {chat[0].message}</Label>
                    </div>
                : ''}
            </div>
        </>
    );
}