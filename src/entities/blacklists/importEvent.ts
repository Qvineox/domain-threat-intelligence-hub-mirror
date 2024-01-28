import {Dayjs} from "dayjs";

export interface IBlacklistImportEvent {
    ID: number
    Type: string
    IsComplete: boolean

    Summary: {
        Skipped: number
        Imported: {
            Total: number
            IPs: number
            URLs: number
            Domains: number
            Emails: number
        }
        New: {
            Total: number
            IPs: number
            URLs: number
            Domains: number
            Emails: number
        }
    }

    CreatedAt: Dayjs
    DeletedAt: Dayjs
}