import {Dayjs} from "dayjs";
import {TargetType} from "@/entities/queue/dialerJob.ts";
import {INetworkNodeScan} from "@/entities/nodes/networkNodeScan.ts";
import {INetworkNodeProfile} from "@/entities/nodes/networkNodeProfile.ts";

export interface INetworkNode {
    UUID: string
    Identity: string
    NodeTypeId: TargetType
    Scans?: Array<INetworkNodeScan>
    Profile?: INetworkNodeProfile
    Scoring?: INetworkNodeScoring
    DiscoveredAt: Dayjs
    CreatedAt: Dayjs
    UpdatedAt: Dayjs
    DeletedAt?: Dayjs
}

export interface INetworkNodeSearchFilter {
    TypeIDs?: Array<1 | 2 | 3 | 4>
    DiscoveredAfter?: Dayjs
    DiscoveredBefore?: Dayjs
    CreatedAfter?: Dayjs
    CreatedBefore?: Dayjs
    SearchString?: string
    Limit: number
    Offset?: number
}

export interface INetworkNodeScoring {
    DGAScore: number
    DNSScore: number
    FinalScore: number
    IsMalicious: boolean
    LatestScoreEvaluation: string
    SemanticScore: number
    Tag: ScoreTag
}

export enum ScoreTag {
    DOMAIN_SCORE_BENIGN,
    DOMAIN_SCORE_DUBIOUS,
    DOMAIN_SCORE_SUSPICIOUS,
    DOMAIN_SCORE_MALICIOUS,
}
