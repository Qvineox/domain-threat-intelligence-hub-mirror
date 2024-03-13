import {Dayjs} from "dayjs";
import {INetworkNode} from "@/entities/nodes/networkNode.ts";

export interface INetworkNodeScan {
    ID: number
    IsComplete: boolean
    NodeUUID: string
    Node?: INetworkNode
    TypeID: NetworkNodeScanType
    JobUUID?: string
    Data?: any
    RiskScore: number
    CreatedAt: Dayjs
    UpdatedAt: Dayjs
    DeletedAt?: Dayjs
}

export enum NetworkNodeScanType {
    SCAN_TYPE_OSS_VT_IP = 101,
    SCAN_TYPE_OSS_VT_DOMAIN = 102,
    SCAN_TYPE_OSS_VT_URL = 103,
    SCAN_TYPE_OSS_IPQS_IP = 201,
    SCAN_TYPE_OSS_IPQS_DOMAIN = 202,
    SCAN_TYPE_OSS_IPQS_URL = 203,
    SCAN_TYPE_OSS_IPQS_EMAIL = 204,
    SCAN_TYPE_OSS_SHODAN_IP = 301,
    SCAN_TYPE_OSS_CS_IP = 401,
    SCAN_TYPE_OSS_IPWH_IP = 501,
}

export function getRiskScoreColorClass(score: number) {
    let scanScoreClass: string
    if (score < 10) {
        scanScoreClass = 'proven'
    } else if (score > 75) {
        scanScoreClass = 'danger'
    } else {
        if (score >= 50) {
            scanScoreClass = 'neutral'
        } else {
            scanScoreClass = 'warning'
        }
    }

    return scanScoreClass
}