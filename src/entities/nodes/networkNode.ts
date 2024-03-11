import {Dayjs} from "dayjs";
import {TargetType} from "@/entities/queue/dialerJob.ts";
import {INetworkNodeScan} from "@/entities/nodes/networkNodeScan.ts";

export interface INetworkNode {
    UUID: string
    Identity: string
    DiscoveredAt: Dayjs
    NodeTypeId: TargetType
    Scans?: Array<INetworkNodeScan>
    CreatedAt: Dayjs
    UpdatedAt: Dayjs
    DeletedAt: Dayjs
}