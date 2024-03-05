import {IQueueState} from "@/components/navigation/queue/queueState.tsx";
import {Fragment} from "react";
import {JobStatus, JobType} from "@/entities/queue/job.ts";
import {IDialerJob} from "@/entities/queue/dialerJob.ts";
import dayjs from "dayjs";

interface IQueueJobsProps {
    state: IQueueState

    hidden: boolean
    onHide: () => void
}

export default function QueueJobs(props: IQueueJobsProps) {
    return <div onMouseLeave={props.onHide}
                className={`queue-jobs queue-jobs__${props.hidden ? "hidden" : "visible"}`}>
        <div className={'queue-jobs_container'}>
            <h2>очередь</h2>
            {
                props.state.queued.length == 0 ? <p className={'empty-placeholder'}>пусто</p> : <Fragment>
                    <ul>
                        {props.state.queued.map((value, index) => {
                            return <JobCardListItem key={index} {...value}/>
                        })}
                    </ul>
                </Fragment>
            }
        </div>
        {props.state.sent.length > 0 ? <div className={'queue-jobs_container'}>
            <h2>в работе</h2>
            <ul>
                {props.state.sent.map((value, index) => {
                    return <JobCardListItem key={index} {...value}/>
                })}
            </ul>
        </div> : <Fragment/>
        }
        {props.state.latest.length > 0 ? <div className={'queue-jobs_container'}>
            <h2>завершенные</h2>
            <ul>
                {props.state.latest.map((value, index) => {
                    return <JobCardListItem key={index} {...value}/>
                })}
            </ul>
        </div> : <Fragment/>
        }
    </div>
}

function JobCardListItem(props: IDialerJob) {
    return <li>
        <h4>{props.Meta.UUID}</h4>
        <p>сканирование <b>{props.Payload.Targets.length}</b> целей с <b>{JobType[props.Meta.Type]}</b></p>
        {
            props.Meta.TasksLeft != undefined && props.Meta.TasksLeft > 0 ?
                <p>{`осталось задач: ${props.Meta.TasksLeft}...`}</p> :
                <Fragment/>
        }
        <div className={'statuses'}>
            <p>{`${dayjs(props.Meta.StartedAt).format("DD.MM.YY HH:mm")} - ${props.Meta.FinishedAt ? dayjs(props.Meta.FinishedAt).format("DD.MM.YY HH:mm") : '...'}`}</p>
            <i>{JobStatus[props.Meta.Status]}</i>
        </div>

    </li>
}