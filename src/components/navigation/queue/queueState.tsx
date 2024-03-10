import {Fragment, useContext, useState} from "react";
import {IDialerJob} from "@/entities/queue/dialerJob.ts";
import QueueJobs from "@/components/navigation/queue/queueJobs.tsx";
import {Context} from "@/context.ts";
import {observer} from "mobx-react-lite";

function QueueState() {
    const {queue} = useContext(Context)

    const [isHidden, setIsHidden] = useState<boolean>(true)

    return <div className={'queue-state'}>
        {
            !queue.isLoading && queue.state ? <Fragment>
                {
                    queue.isConnected ? <Fragment>
                        <div onClick={() => setIsHidden(false)}
                             className={'queue-state queue-state__connected'}>
                            <p>
                                {queue.state.queued.length}
                            </p>
                            <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <circle r="5" cx="10" cy="10" fill={statusBubbleColor(queue.state.queued)}/>
                            </svg>
                            <p>
                                {queue.state.sent.length}
                            </p>
                            <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <circle r="5" cx="10" cy="10" fill={statusBubbleColor(queue.state.sent)}/>
                            </svg>
                            <p>
                                {queue.state.latest.length}
                            </p>
                            <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <circle r="5" cx="10" cy="10" fill={statusBubbleColor(queue.state.latest)}/>
                            </svg>
                        </div>
                        <QueueJobs state={queue.state}
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

    if (jobs.every((value) => {
        return value.Meta.Status >= 5
    })) {
        return '#d33939'
    }

    return '#fcaf53'
}

export default observer(QueueState)