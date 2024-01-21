import {IBlacklistedSource} from "@/entities/blacklists/source.ts";
import {Dayjs} from "dayjs";

export interface IBlacklistedHost {
    UUID: string
    Host: string
    Description: string
    Type?: "url" | "domain" | "ip"

    Source: IBlacklistedSource
    SourceID: number

    CreatedAt: Dayjs
    UpdatedAt: Dayjs
    DeletedAt: Dayjs
}