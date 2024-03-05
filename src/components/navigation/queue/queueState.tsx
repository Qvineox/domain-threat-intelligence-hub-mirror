import {Fragment, useEffect, useState} from "react";
import {IDialerJob} from "@/entities/queue/dialerJob.ts";
import QueueJobs from "@/components/navigation/queue/queueJobs.tsx";

const SOCKET_URL = (import.meta.env.VITE_WS_URL === undefined ? "" : import.meta.env.VITE_WS_URL) + '/api/' + import.meta.env.VITE_API_VERSION + '/ws'

const socket = new WebSocket(`${SOCKET_URL}/queue`);

export interface IQueueState {
    queued: Array<IDialerJob>
    sent: Array<IDialerJob>
    latest: Array<IDialerJob>
}

export default function QueueState() {
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [queueState, setQueueState] = useState<IQueueState>({
        queued: [],
        sent: [],
        latest: [],
    })

    const [isHidden, setIsHidden] = useState<boolean>(true)

    useEffect(() => {
        socket.onopen = function () {
            setIsConnected(true)
            setIsLoading(false)

            console.log('ws: connection established');
        };

        socket.onmessage = function (event) {
            setIsConnected(true)
            setIsLoading(false)

            setQueueState(JSON.parse(event.data) as IQueueState)

            console.log('ws: message received');
        };

        socket.onclose = function () {
            setIsConnected(false)
            setIsLoading(false)

            console.log('ws: connection closed');
        };

        socket.onerror = function (error) {
            setIsConnected(false)
            setIsLoading(false)

            if (error instanceof ErrorEvent) {
                console.error(`ws: error ${error.message}`);
            }
        };
    }, [])

    return <div className={'queue-state'}>
        {
            !isLoading && queueState ? <Fragment>
                {
                    isConnected ? <Fragment>
                        <div onClick={() => setIsHidden(false)}
                             className={'queue-state queue-state__connected'}>
                            <p>
                                {queueState.queued.length}
                            </p>
                            <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <circle r="5" cx="10" cy="10" fill={statusBubbleColor(queueState.queued)}/>
                            </svg>
                            <p>
                                {queueState.sent.length}
                            </p>
                            <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <circle r="5" cx="10" cy="10" fill={statusBubbleColor(queueState.sent)}/>
                            </svg>
                            <p>
                                {queueState.latest.length}
                            </p>
                            <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <circle r="5" cx="10" cy="10" fill={statusBubbleColor(queueState.latest)}/>
                            </svg>
                        </div>
                        <QueueJobs state={queueState}
                                   hidden={isHidden}
                                   onHide={() => {
                                       setIsHidden(true)
                                   }}/>
                    </Fragment> : <p className={'queue-state queue-state__failed'}>
                        Ошибка соединения с планировщиком!
                    </p>
                }
            </Fragment> : <p>подключение...</p>
        }
    </div>
}

function statusBubbleColor(jobs: Array<IDialerJob>): string {
    if (jobs === undefined || jobs.length === 0) {
        return '#838383'
    }

    if (jobs.every((value) => {
        return value.Meta.Status == 4
    })) {
        return '#1fa21f'
    }

    if (jobs.findIndex((value) => {
        return value.Meta.Status === 5
    }) !== -1) {
        return '#B22222FF'
    }

    return '#fcaf53'
}