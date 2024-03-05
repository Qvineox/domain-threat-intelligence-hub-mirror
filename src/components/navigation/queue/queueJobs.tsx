import {IQueueState} from "@/components/navigation/queue/queueState.tsx";
import {Fragment} from "react";
import {JobPriority, JobStatus, JobType} from "@/entities/queue/job.ts";
import {IDialerJob} from "@/entities/queue/dialerJob.ts";
import dayjs from "dayjs";
import {NavLink} from "react-router-dom";

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
        <div className="queue-jobs_footer">
            <NavLink to={"/scanning/jobs"}>задачи</NavLink>
            <NavLink to={"/scanning/scanner"}>сканер</NavLink>
            <NavLink to={"/scanning/agents"}>агенты</NavLink>
            <NavLink to={"/scanning/scans"}>результаты</NavLink>
        </div>
    </div>
}

function JobCardListItem(props: IDialerJob) {
    let status: string = "неизвестно"
    let type: string = "не определено"
    let color: string = "#979797"
    let additionalData: string = ""
    let priority: string = ""

    switch (props.Meta.Priority) {
        case JobPriority.JOB_PRIORITY_CRITICAL:
            priority = '(высш. приоритет)'
            break
        case JobPriority.JOB_PRIORITY_HIGH:
            priority = '(выс. приоритет)'
            break
        case JobPriority.JOB_PRIORITY_LOW:
            priority = '(выс. приоритет)'
            break
    }

    switch (props.Meta.Status) {
        case JobStatus.JOB_STATUS_PENDING:
            status = "в очереди"
            break
        case JobStatus.JOB_STATUS_STARTING:
            status = "инициализация"
            color = "#fcaf53"
            break
        case JobStatus.JOB_STATUS_WORKING:
            status = "в работе"
            color = "#fcaf53"
            break
        case JobStatus.JOB_STATUS_FINISHING:
            status = "завершение"
            color = "#1fa21f"
            break
        case JobStatus.JOB_STATUS_DONE:
            status = "успешно"
            color = "#1fa21f"
            break
        case JobStatus.JOB_STATUS_CANCELLED:
            status = "отменена"
            color = "#d33939"
            break
        case JobStatus.JOB_STATUS_ERROR:
            status = "ошибка"
            color = "#d33939"
            break
        case JobStatus.JOB_STATUS_PANIC:
            status = "крит. ошибка"
            color = "#d33939"
            break
    }

    switch (props.Meta.Type) {
        case JobType.JOB_TYPE_OSS:
            type = "по открытым источникам (OSS)"

            if (props.Directives.OpenSourceScanDirectives) {
                additionalData = `Опрос ${props.Directives.OpenSourceScanDirectives.Providers.length} провайдеров.`
            }

            break
        case JobType.JOB_TYPE_DISCOVERY:
            type = "обнаружением хостов (DISCO)"
            break
        case JobType.JOB_TYPE_NMAP:
            type = "с помощью NMAP"
            break
        case JobType.JOB_TYPE_WHOIS:
            type = "из системы WhoIS"
            break
        case JobType.JOB_TYPE_SPIDER:
            type = "кравлером (SPIDER)"
            break
        case JobType.JOB_TYPE_DNS:
            type = "из системы доменных имен (DNS)"
            break
    }

    return <li>
        <h4>Задача {props.Meta.UUID} <i>{priority}</i></h4>
        <p>Сбор данных о <b>{props.Payload.Targets.length}</b> целях <b>{type}. </b><br/>{additionalData}</p>
        {
            props.Meta.TasksLeft != undefined && props.Meta.TasksLeft > 0 ?
                <p>{`осталось задач: ${props.Meta.TasksLeft}...`}</p> :
                <Fragment/>
        }
        <div className={'statuses'}>
            <p>{`${props.Meta.StartedAt ? dayjs(props.Meta.StartedAt).format("DD.MM.YY HH:mm:ss") : '...'} - ${props.Meta.FinishedAt ? dayjs(props.Meta.FinishedAt).format("DD.MM.YY HH:mm:ss") : '...'}`}</p>
            <i>{status}</i>
            <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg">
                <circle r="5" cx="5" cy="5" fill={color}/>
            </svg>
        </div>
    </li>
}