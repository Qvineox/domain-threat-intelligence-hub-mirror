import {IBlacklistedSource} from "@/entities/blacklists/source.ts";
import {Dayjs} from "dayjs";
import {IBlacklistImportEvent} from "@/entities/blacklists/importEvent.ts";

export interface IBlacklistedHost {
    UUID: string
    Host: string
    Description: string
    Type?: "url" | "domain" | "ip" | "email"
    Status?: "new" | "updated" | "default" | "deleted"

    Source: IBlacklistedSource
    SourceID: number

    ImportEvent?: IBlacklistImportEvent
    ImportEventID?: number

    CreatedAt: Dayjs
    UpdatedAt: Dayjs
    DeletedAt: Dayjs
}