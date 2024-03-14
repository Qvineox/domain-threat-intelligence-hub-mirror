import {getRiskScoreColorClass, INetworkNodeScan} from "@/entities/nodes/networkNodeScan.ts";

interface IJobSummaryProps {
    nodes: Array<INetworkNodeScan>
    setSelectedNodeUUID: (uuid: string) => void
    isLoading: boolean
}

export default function JobSummary(props: IJobSummaryProps) {
    const summaryMap = new Map<string, INetworkNodeScanSummaryCard>();
    // let summary = Array<INetworkNodeScanSummaryCard>;

    props.nodes.forEach((value) => {
        const s = summaryMap.get(value.NodeUUID)
        if (s) {
            s.scores.push(value.RiskScore)
            s.scanIDs.push(value.ID)

            summaryMap.set(value.NodeUUID, s)
        } else {
            summaryMap.set(value.NodeUUID, {
                id: value.ID,
                uuid: value.NodeUUID,
                identity: value.Node ? value.Node.Identity : "???",
                scanIDs: [value.ID],
                scores: [value.RiskScore]
            })
        }
    })

    return <div className={'job-viewer_summary'}>
        <ul>
            {Array.from(summaryMap.values()).map((value, index) => {
                return <li onClick={() => {
                    props.setSelectedNodeUUID(value.uuid)
                }} key={index} className={'host-summary'}>
                    <p className={'identity'}>{value.identity.slice(0, 25)}</p>
                    <p className={`risk-score risk-score_${getRiskScoreColorClass(Math.max(...value.scores))}`}>
                        {Math.max(...value.scores)}
                    </p>
                </li>
            })}
        </ul>
        <ul>
        </ul>
    </div>
}

interface INetworkNodeScanSummaryCard {
    id: number
    uuid: string
    identity: string
    scanIDs: Array<number>
    scores: Array<number>
    score?: number
}