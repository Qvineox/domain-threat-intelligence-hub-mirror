import {Dayjs} from "dayjs";
import {IUser} from "@/entities/users/user.ts";
import {JobPriority} from "@/entities/queue/job.ts";

export interface IAgent {
    UUID: string
    Name: string
    Description: string

    Host: string
    IPAddress: IIPAddress

    IsActive: boolean
    IsHomeBound: boolean
    IsPrivate: boolean
    IsConnected: boolean

    MinPriority: JobPriority

    Owner?: IUser
    OwnerID?: number

    config: Config

    CreatedAt: Dayjs
    UpdatedAt: Dayjs
}

export interface IIPAddress {
    IPNet: {
        IP: string
        Mask: string
    }
    status: number
}

export interface Config {
}

export interface IAgentUpdateParams {
    UUID?: string

    Name: string
    Host: string
    Description: string

    IsActive: boolean
    IsHomeBound: boolean
    IsPrivate: boolean

    MinPriority: number

    OwnerID: string
}