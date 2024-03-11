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
    CreatedAt: Dayjs
    UpdatedAt: Dayjs
    DeletedAt?: Dayjs
}

export enum NetworkNodeScanType {
    SCAN_TYPE_OSS_VT = 1,
    SCAN_TYPE_OSS_IPQS = 2,
    SCAN_TYPE_OSS_SHD = 3,
    SCAN_TYPE_OSS_CS = 4,
    SCAN_TYPE_OSS_IPWS = 5
}