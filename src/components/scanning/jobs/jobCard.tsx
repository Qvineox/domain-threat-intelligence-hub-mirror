import {IDialerJob} from "@/entities/queue/dialerJob.ts";
import {Fragment} from "react";
import {JobStatus, JobType} from "@/entities/queue/job.ts";

interface IJobCard {
    data: IDialerJob
}

export default function JobCard(props: IJobCard) {
    let type: string = "неизвестно"
    let additionalData: string = ""
    let color: string = "#979797"

    switch (props.data.Meta.Type) {
        case JobType.JOB_TYPE_OSS:
            type = "по открытым источникам (OSS)"

            if (props.data.Directives.OpenSourceScanDirectives) {
                additionalData = `Опрос ${props.data.Directives.OpenSourceScanDirectives.Providers.length} провайдеров.`
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

    switch (props.data.Meta.Status) {
        case JobStatus.JOB_STATUS_PENDING:
            break
        case JobStatus.JOB_STATUS_STARTING:
            color = "#fcaf53"
            break
        case JobStatus.JOB_STATUS_WORKING:
            color = "#fcaf53"
            break
        case JobStatus.JOB_STATUS_FINISHING:
            color = "#1fa21f"
            break
        case JobStatus.JOB_STATUS_DONE:
            color = "#1fa21f"
            break
        case JobStatus.JOB_STATUS_CANCELLED:
            color = "#d33939"
            break
        case JobStatus.JOB_STATUS_ERROR:
            color = "#d33939"
            break
        case JobStatus.JOB_STATUS_PANIC:
            color = "#d33939"
            break
    }

    return <div className={'job-card'}>
        <h5>{props.data.Meta.UUID}
            <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg">
                <circle r="5" cx="5" cy="5" fill={color}/>
            </svg>
        </h5>
        <p>Поиск <b>{type}</b>.<br/>{additionalData}</p>
        <i>Хостов: {props.data.Payload.Targets.length}</i>
        {
            props.data.Meta.TasksLeft != undefined && props.data.Meta.TasksLeft > 0 ?
                <p>{`осталось задач: ${props.data.Meta.TasksLeft}...`}</p> :
                <Fragment/>
        }
    </div>
}