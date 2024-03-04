import {useEffect, useState} from "react";
import {socket} from '@/http/socket';

export default function QueueState() {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected)

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    return <div className={'queue-state'}>
        QUEUE STATE: {isConnected ? 'connected' : 'error'}
    </div>
}