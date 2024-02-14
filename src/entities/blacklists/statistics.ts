import {Dayjs} from "dayjs";

export interface IBlacklistStatistics {
    LastEval: Dayjs
    TotalURLs: number
    TotalEmails: number
    TotalDomains: number
    TotalIPs: number
    CreatedByDate: {
        Dates: Array<Dayjs>
        IPs: Array<number>
        Domains: Array<number>
        URLs: Array<number>
        Emails: Array<number>
    }
    DiscoveredByDate: {
        Dates: Array<Dayjs>
        IPs: Array<number>
        Domains: Array<number>
        URLs: Array<number>
        Emails: Array<number>
    }
}