import {INetworkNode} from "@/entities/nodes/networkNode.ts";

export interface IOpenSourceScan {
    ID: number
    IsComplete: boolean
    Node: INetworkNode
    NodeUUID: string
    TypeID: number
    RiskScore: number
    JobUUID: string
}