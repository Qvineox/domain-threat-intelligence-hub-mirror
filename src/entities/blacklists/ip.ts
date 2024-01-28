import {IBlacklistedSource} from "@/entities/blacklists/source.ts";
import {Dayjs} from "dayjs";
import {IBlacklistImportEvent} from "@/entities/blacklists/importEvent.ts";

export interface IBlacklistedIP {
    IPAddress: string
    Description: string

    ImportEvent?: IBlacklistImportEvent
    ImportEventID?: number

    Source: IBlacklistedSource
    SourceID: number

    UUID: string
    CreatedAt: Dayjs
    UpdatedAt: Dayjs
    DeletedAt: Dayjs
}