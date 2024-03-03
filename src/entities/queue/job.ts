export interface IJob {
    Type: JobType

    Priority: JobPriority
    Weight?: number

    Targets: string[]
    Exceptions?: string[]

    UseHomeBound: boolean
    Private: boolean

    Providers?: OpenSourceProviders[]

    Timout?: number
    Delay?: number
    Retries?: number
}

export enum JobType {
    JOB_TYPE_OSS,
    JOB_TYPE_NMAP,
    JOB_TYPE_WHOIS,
    JOB_TYPE_DNS,
    JOB_TYPE_DISCOVERY,
    JOB_TYPE_SPIDER
}

export enum OpenSourceProviders {
    OSS_PROVIDER_VIRUS_TOTAL,
    OSS_PROVIDER_IP_QUALITY_SCORE,
    OSS_PROVIDER_CROWD_SEC,
    OSS_PROVIDER_SHODAN,
    OSS_PROVIDER_IP_WHO_IS,
}

export enum JobPriority {
    JOB_PRIORITY_CRITICAL,
    JOB_PRIORITY_HIGH,
    JOB_PRIORITY_MEDIUM,
    JOB_PRIORITY_LOW
}

export enum JobStatus {
    JOB_STATUS_PENDING,
    JOB_STATUS_STARTING,
    JOB_STATUS_WORKING,
    JOB_STATUS_FINISHING,
    JOB_STATUS_DONE,
    JOB_STATUS_ERROR,
    JOB_STATUS_PANIC,
    JOB_STATUS_CANCELLED,
}

export interface IJobUUID {
    UUID: string
}