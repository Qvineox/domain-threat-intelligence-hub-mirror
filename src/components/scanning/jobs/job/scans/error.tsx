import {INetworkNodeScan, INetworkNodeScanError} from "@/entities/nodes/networkNodeScan.ts";
import {Grid} from "@mui/material";

export default function ErrorScan(props: INetworkNodeScan) {
    const data = props.Data as INetworkNodeScanError

    return <Grid item xs={12}>
        <div className={'scan-item scan-item__vt'}>
            <div className="scan-item_metadata">
                <div className="scan-item_metadata_id">
                    <h3>Ошибка сканирования</h3>
                    <h4>{props.NodeUUID}</h4>
                    <br/>
                    <p>{data.error_message}</p>
                </div>
            </div>
        </div>
    </Grid>
}