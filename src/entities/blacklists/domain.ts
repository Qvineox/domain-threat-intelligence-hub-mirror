import {IBlacklistedSource} from "@/entities/blacklists/source.ts";
import {Dayjs} from "dayjs";
export interface IBlacklistedDomain {
    URN: string
    Description: string
    Source: IBlacklistedSource
    SourceID: number
    UUID: string
    CreatedAt: Dayjs
    UpdatedAt: Dayjs
    DeletedAt: Dayjs
}