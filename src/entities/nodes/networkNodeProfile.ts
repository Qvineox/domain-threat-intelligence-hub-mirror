import {Dayjs} from "dayjs";
import {INetworkNodeScoring} from "@/entities/nodes/networkNode.ts";

export interface INetworkNodeProfile {
    Identity: string

    NodeTypeID: number

    ASN: INumberScanValue[]
    AS: IStringScanValue[]
    ISP: IStringScanValue[]
    JARM: IStringScanValue[]
    Organisation: IStringScanValue[]

    Category: IStringScanValue[]

    Tag: IStringScanValue[]
    Region: IStringScanValue[]
    Country: IStringScanValue[]
    City: IStringScanValue[]
    Longitude: number
    Latitude: number

    IsDNSValid: IBoolScanValue[]
    Registrar: IStringScanValue[]
    DomainRank: INumberScanValue[]
    DomainAge: IStringScanValue[]
    IsDomainParked: IBoolScanValue[]

    ARecords?: IDomainRecordDataScanValue[]
    AAAARecords?: IDomainRecordDataScanValue[]
    CNameRecords?: IDomainRecordDataScanValue[]
    MXRecords?: IDomainRecordDataScanValue[]
    NSRecords?: IDomainRecordDataScanValue[]
    PTRRecords?: IDomainRecordDataScanValue[]
    SOARecords?: IDomainRecordDataScanValue[]
    TXTRecords?: IDomainRecordDataScanValue[]

    IsBlacklisted: boolean
    ExternalBlacklists: IExternalBlacklistScanValue[]

    ProviderScore: INumberScanValue[]

    Scoring: INetworkNodeScoring

    IsVPN: IBoolScanValue[]
    IsProxy: IBoolScanValue[]
    IsTOR: IBoolScanValue[]
    IsDarkWeb: IBoolScanValue[]
    IsHosting: IBoolScanValue[]
    IsMailValid: IBoolScanValue[]
    IsHoneypot: IBoolScanValue[]
    IsDisposable: IBoolScanValue[]
    CanDeliverTo: IBoolScanValue[]
    IsCommon: IBoolScanValue[]
    IsGeneric: IBoolScanValue[]
    IsCatchAll: IBoolScanValue[]
    IsSPAM: IBoolScanValue[]
    IsPhishing: IBoolScanValue[]
    IsMalwareDistributor: IBoolScanValue[]
    IsCrawler: IBoolScanValue[]

    RecentLeaks: IBoolScanValue[]
    Alerts: IStringScanValue[]
    IsNSFW: IBoolScanValue[]
    CommunityScores: any

    OpenPorts: {
        [key: number]: IPortDataScanValue
    }

    WHOIS?: IStringScanValue[]
    LatestScans: IStringScanValue[]
}

export interface ICommonScanValue {
    Source: string
    Timestamp: Dayjs
}

export interface IStringScanValue extends ICommonScanValue {
    Value: string
}

export interface IBoolScanValue extends ICommonScanValue {
    Value: boolean
}

export interface INumberScanValue extends ICommonScanValue {
    Value: number
}

export interface IExternalBlacklistScanValue extends ICommonScanValue {
    Name: string
    Tag: string
}

export interface IPortDataScanValue extends ICommonScanValue {
    Application: string
    Protocol: string
    Banner: string
    Data: {}
}

export interface IDomainRecordDataScanValue extends ICommonScanValue {
    Value: string
}