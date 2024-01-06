import {Typography} from "@mui/material";
import {PlanetData} from "@/components/web_map/models/planetData.ts";
import {Fragment} from "react";

type NodeInfoProps = {
    name: string
    id?: number
    data?: PlanetData
}

export function NodeInfo(props: NodeInfoProps) {
    return <div className={props.data ? 'info' : 'info hidden'}>
        <div className="info_node-info">
            <Typography variant="h4">
                Host: {props.name}
            </Typography>
        </div>
        <div className="info_node-data">
            <Typography variant="h5">
                Displaying information on node with ID#{props.id}
            </Typography>
            <br/>
            {
                props.data ? <Fragment>
                    <Typography variant="h6">
                        Name: {props.data.name}
                    </Typography>
                    <Typography>
                        Type: {props.data.type}
                    </Typography>
                    <Typography>
                        Mass: {props.data.mass.toFixed(2)}
                    </Typography>
                    <Typography>
                        Color: {props.data.color}
                    </Typography>
                    <Typography>
                        Scoring: {props.data.scoring}
                    </Typography>
                </Fragment> : <Fragment>
                    <Typography>
                        No data.
                    </Typography>
                </Fragment>
            }
        </div>
    </div>
}