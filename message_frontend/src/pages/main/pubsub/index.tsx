import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function PubSub() {

    const [channel, setChannel] = useState('');
    const [sendChannel, setSendChannel] = useState('');
    const [message, setMessage] = useState('');

    const subChannel = () => {

        if(!channel)
            return;

        axios.get('/api/channel', { params: { channel: channel } })
        .catch((error) => {
            console.log('subChannel ERROR :' + error);
        });
    }

    const cancelChannel = () => {

        if(!channel)
            return;

        axios.get('/api/cancel', { params: { channel: channel } })
        .catch((error) => {
            console.log('cancelChannel ERROR :' + error);
        });
    }

    const publish = () => {

        if (!sendChannel)
            return;

        if (!message)
            return;

        axios.post('/api/send',
        {
            channel: sendChannel,
            message: message
        })
        .then((response) => {
            const res = response.data;
            if (res) {
                setMessage('');
            }
        })
        .catch((error) => {
            console.log('publish ERROR :' + error);
        });
    }

    useEffect(() => {

    }, [])

    return (
        <>
            <div className="mb-5">
                <Label>Publish / Subscribe</Label>
            </div>

            <div className="flex flex-col gap-y-3 mb-5">
                <Input
                    placeholder="구독할 채널"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                />
                <Button onClick={() => subChannel()}>
                    구독
                </Button>
                <Button onClick={() => cancelChannel()}>
                    구독 취소
                </Button>
                <Input
                    placeholder="보낼 채널"
                    value={sendChannel}
                    onChange={(e) => setSendChannel(e.target.value)}
                />
                <Input
                    placeholder="보내는 메시지"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <div className="flex flex-col mb-5">
                <Button onClick={() => publish()}>
                    전송
                </Button>
            </div>
        </>
    );
}