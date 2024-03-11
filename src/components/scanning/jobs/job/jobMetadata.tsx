import {IJobMeta} from "@/entities/queue/dialerJob.ts";
import {JobPriority, JobStatus, JobType} from "@/entities/queue/job.ts";
import {Grid} from "@mui/material";
import dayjs from "dayjs";

export default function JobMetadata(props: IJobMeta) {
    return <div className={'job-viewer_meta'}>
        <Grid container rowSpacing={2}>
            <Grid item xs={4}>
                <h2>{props.UUID}</h2>
                <p>{getJobTypeName(props.Type)}</p>
            </Grid>
            <Grid item xs={3}>
                <div className={'info-block'}>
                    <span>
                        <p>начало</p>
                        <h4>{dayjs(props.CreatedAt).format('YYYY.MM.DD hh:mm')}</h4>
                    </span>
                    <span>
                        <p>завершение</p>
                        <h4>{props.FinishedAt ? dayjs(props.FinishedAt).format('YYYY.MM.DD hh:mm') : "-"}</h4>
                    </span>
                    <span>
                        <p>создана</p>
                        <h4>{props.CreatedBy ? props.CreatedBy.Login : "-"}</h4>
                    </span>
                </div>
            </Grid>
            <Grid item xs={2}>
                <div className={'info-block'}>
                    <span>
                        <p>приоритет</p>
                        <h4>{getJobPriorityName(props.Priority)}</h4>
                    </span>
                    <span>
                        <p>вес</p>
                        <h4>{props.Weight}</h4>
                    </span>
                </div>
            </Grid>
            <Grid item xs={3}>
                <div className={'info-block'}>
                    <span>
                        <p>статус</p>
                        <h4>{getJobStatusName(props.Status)}</h4>
                    </span>
                </div>
            </Grid>
        </Grid>
    </div>
}

function getJobTypeName(type: JobType): string {
    let name: string = "неизвестно"

    switch (type) {
        case JobType.JOB_TYPE_OSS:
            name = "Опрос открытых источников (OSS)"
            break
        case JobType.JOB_TYPE_DISCOVERY:
            name = "Поиск обнаружением хостов (DISCO)"
            break
        case JobType.JOB_TYPE_NMAP:
            name = "Сканирование с помощью NMAP"
            break
        case JobType.JOB_TYPE_WHOIS:
            name = "Извлечение из системы WhoIS"
            break
        case JobType.JOB_TYPE_SPIDER:
            name = "Сканирование кравлером (SPIDER)"
            break
        case JobType.JOB_TYPE_DNS:
            name = "Извлечение из системы доменных имен (DNS)"
            break
    }

    return name
}

function getJobPriorityName(priority: JobPriority): string {
    switch (priority) {
        case JobPriority.JOB_PRIORITY_CRITICAL:
            return "Наивысший"
        case JobPriority.JOB_PRIORITY_HIGH:
            return "Высокий"
        case JobPriority.JOB_PRIORITY_MEDIUM:
            return "Средний"
        case JobPriority.JOB_PRIORITY_LOW:
            return "Низкий"
        default:
            return "Неизвестно"
    }
}

function getJobStatusName(status: JobStatus): string {
    switch (status) {
        case JobStatus.JOB_STATUS_DONE:
            return "Завершена"
        case JobStatus.JOB_STATUS_WORKING:
            return "В работе"
        case JobStatus.JOB_STATUS_CANCELLED:
            return "Отменена"
        case JobStatus.JOB_STATUS_STARTING:
            return "Инициализация"
        case JobStatus.JOB_STATUS_ERROR:
            return "Ошибка"
        case JobStatus.JOB_STATUS_PANIC:
            return "Крит. ошибка"
        case JobStatus.JOB_STATUS_FINISHING:
            return "Завершение"
        case JobStatus.JOB_STATUS_PENDING:
            return "В очереди"
        default:
            return "Неизвестно"
    }
}