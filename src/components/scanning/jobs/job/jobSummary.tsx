import {getRiskScoreColorClass, INetworkNodeScan} from "@/entities/nodes/networkNodeScan.ts";
import {Grid} from "@mui/material";

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

    return <div className={'job-viewer_header_summary'}>
        <Grid container spacing={1}>
            {Array.from(summaryMap.values()).map((value, index) => {
                return <Grid item xs={1} onClick={() => {
                    props.setSelectedNodeUUID(value.uuid)
                }} key={index}>
                    <div className={'host-summary'}>
                        <div className="host-summary_info">
                            <p className={'identity'}>{value.identity.slice(0, 25)}</p>
                            <p className={`risk-score risk-score_${getRiskScoreColorClass(Math.max(...value.scores))}`}>
                                {Math.max(...value.scores)}
                            </p>
                        </div>
                    </div>
                </Grid>
            })}
        </Grid>
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