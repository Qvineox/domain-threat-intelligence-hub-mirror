import {useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import NodesService from "@/services/nodesService.ts";
import {INetworkNode, INetworkNodeScoring} from "@/entities/nodes/networkNode.ts";
import {toast} from "react-toastify";
import Grid from '@mui/material/Unstable_Grid2'
import NodeProfileInfoPanel from "@/components/nodes/nodeProfile/nodeProfilePanels/nodeProfileInfo.tsx";
import {CircularProgress} from "@mui/material";
import {
    NodeProfileMissingScoringPanel,
    NodeProfileScoringPanel
} from "@/components/nodes/nodeProfile/nodeProfilePanels/nodeProfileScoring.tsx";
import {NodeProfileWhoisPanel} from "@/components/nodes/nodeProfile/nodeProfilePanels/nodeProfileWhois.tsx";
import {NodeProfileDNSPanel} from "@/components/nodes/nodeProfile/nodeProfilePanels/nodeProfileDNS.tsx";
import {NodeProfileGeographyPanel} from "@/components/nodes/nodeProfile/nodeProfilePanels/nodeProfileGeography.tsx";

export default function NodeProfile() {
    const {node_uuid} = useParams()

    const [nodeData, setNodeData] = useState<INetworkNode | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)

        if (node_uuid) {
            NodesService.getNodeByUUID(node_uuid).then((response) => {
                if (response.data) {
                    setNodeData(response.data)
                }
            }).catch((response) => {
                console.error(response)
                toast.error("Ошибка получения данных!")
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }, [node_uuid]);

    const setScoring = (score: INetworkNodeScoring) => {
        setNodeData(prevState => {
            if (prevState) {
                return ({
                    ...prevState,
                    Scoring: score
                })
            }

            return prevState
        })
    }

    return <div className="node-profile">
        {
            isLoading ? <div className={'loading'}>
                <CircularProgress color="info"/>
            </div> : <Fragment>
                {
                    nodeData && nodeData.Profile ?
                        <Grid sx={
                            {
                                gridAutoColumns: '2fr',
                                gridAutoFlow: "column",
                                padding: "15px"
                            }
                        } container
                              spacing={2}>
                            <Grid xs={8}>
                                <NodeProfileInfoPanel {...nodeData}/>
                            </Grid>
                            <Grid xs={4}>
                                {
                                    nodeData.Scoring ? <NodeProfileScoringPanel {...nodeData.Scoring}/>
                                        :
                                        <NodeProfileMissingScoringPanel setNodeScoring={setScoring}
                                                                        uuid={nodeData.UUID}/>
                                }
                            </Grid>
                            <Grid xs={12}>
                                <NodeProfileGeographyPanel {...nodeData.Profile}/>
                            </Grid>
                            {
                                nodeData.Profile.WHOIS ? <Grid xs={6}>
                                    <NodeProfileWhoisPanel {...nodeData.Profile.WHOIS[0]}/>
                                </Grid> : null
                            }
                            <Grid xs={6}>
                                <NodeProfileDNSPanel {...nodeData.Profile}/>
                            </Grid>
                            <Grid xs={4}>
                            </Grid>
                        </Grid> : <Fragment/>
                }
            </Fragment>
        }

    </div>
}