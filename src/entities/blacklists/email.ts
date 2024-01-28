import {Dayjs} from "dayjs";
import {IBlacklistedSource} from "@/entities/blacklists/source.ts";
import {IBlacklistImportEvent} from "@/entities/blacklists/importEvent.ts";

export interface IBlacklistedEmail {
    Email: string
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