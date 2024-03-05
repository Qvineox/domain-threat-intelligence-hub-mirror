import {JobPriority, JobStatus, JobType, OpenSourceProviders} from "@/entities/queue/job.ts";
import {IUser} from "@/entities/users/user.ts";
import {Dayjs} from "dayjs";

export interface IDialerJob {
    DequeuedTimes: number
    Directives: IDirectives
    Meta: Meta
    Payload: Payload
}

export interface IQueuedJobs {
    queued: Array<IDialerJob>
    sent: Array<IDialerJob>
}

export interface IDirectives {
    DNSDirectives: IDNSDirectives
    DiscoveryDirectives: IDiscoveryDirectives
    NMAPDirectives: INMAPDirectives
    OpenSourceScanDirectives: OpenSourceScanDirectives
    SpiderDirectives: SpiderDirectives
    WhoISDirectives: IWhoIsDirectives
}

export interface IDNSDirectives {
    Timings: ITimings
}

export interface ITimings {
    Delay: number
    Reties: number
    Timeout: number
}

export interface IDiscoveryDirectives {
    Ports: number[]
    Silent: boolean
    Timings: ITimings
}

export interface INMAPDirectives {
    Timings: ITimings
}

export interface OpenSourceScanDirectives {
    Providers: OpenSourceProviders[]
    Timings: ITimings
}

export interface SpiderDirectives {
    Depth: number
    Timings: ITimings
}

export interface IWhoIsDirectives {
    Timings: ITimings
}

export interface Meta {
    UUID: string
    Type: JobType

    Priority: JobPriority
    Weight?: number

    Status: JobStatus
    TasksLeft?: number

    CreatedBy?: IUser
    CreatedByID?: number

    StartedAt?: Dayjs
    FinishedAt?: Dayjs
    CreatedAt: Dayjs
    UpdatedAt: Dayjs

    Error?: string
}

export interface Payload {
    Exceptions: IJobTarget[]
    Targets: IJobTarget[]
}

export interface IJobTarget {
    Host: string
    Type: TargetType
}

export enum TargetType {
    HOST_TYPE_CIDR,
    HOST_TYPE_DOMAIN,
    HOST_TYPE_URL,
    HOST_TYPE_EMAIL,
}