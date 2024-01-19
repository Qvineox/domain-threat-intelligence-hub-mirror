import {IBlacklistedSource} from "@/entities/blacklists/source.ts";
import {Dayjs} from "dayjs";

export interface IBlacklistedIP {
    IPAddress: string
    Description: string
    Source: IBlacklistedSource
    SourceID: number
    ID: number
    CreatedAt: Dayjs
    UpdatedAt: Dayjs
}