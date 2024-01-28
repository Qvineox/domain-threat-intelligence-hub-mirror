import {Dayjs} from "dayjs";

export interface IBlacklistStatistics {
    LastEval: Dayjs
    TotalURLs: number
    TotalEmails: number
    TotalDomains: number
    TotalIPs: number
    ByDate: {
        Dates: Array<string>
        IPs: Array<number>
        Domains: Array<number>
        URLs: Array<number>
        Emails: Array<number>
    }
}