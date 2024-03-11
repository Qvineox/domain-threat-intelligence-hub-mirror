import {INetworkNodeScan} from "@/entities/nodes/networkNodeScan.ts";
import {Fragment} from "react";

interface IJobNodeScanData {
    data?: INetworkNodeScan
}

export default function JobNodeScanData(props: IJobNodeScanData) {
    return <div className={'node-data'}>
        {
            props.data ? <pre>
            {JSON.stringify(props)}
        </pre> : <Fragment/>
        }
    </div>
}