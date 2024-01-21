import {Dayjs} from "dayjs";
import {IBlacklistedSource} from "@/entities/blacklists/source.ts";

export interface IBlacklistedURL {
    URL: string
    Description: string
    Source: IBlacklistedSource
    SourceID: number
    UUID: string
    CreatedAt: Dayjs
    UpdatedAt: Dayjs
    DeletedAt: Dayjs
}