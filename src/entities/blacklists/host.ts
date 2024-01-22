import {IBlacklistedSource} from "@/entities/blacklists/source.ts";
import {Dayjs} from "dayjs";

export interface IBlacklistedHost {
    UUID: string
    Host: string
    Description: string
    Type?: "url" | "domain" | "ip"
    Status?: "new" | "updated" | "default" | "deleted"

    Source: IBlacklistedSource
    SourceID: number

    CreatedAt: Dayjs
    UpdatedAt: Dayjs
    DeletedAt: Dayjs
}