import {Grid} from "@mui/material";
import {getRiskScoreColorClass, INetworkNodeScan} from "@/entities/nodes/networkNodeScan.ts";
import {IWHOISScanData} from "@/entities/nodes/whois/whoisLookup.ts";

export function WhoisScan(props: INetworkNodeScan) {
    const data = props.Data as IWHOISScanData

    return <Grid item xs={12}>
        <div className={'scan-item scan-item__whois'}>
            <div className="scan-item_metadata">
                <div className="scan-item_metadata_id">
                    <h3>Сканирование Whois</h3>
                    <h4>{props.NodeUUID}</h4>
                </div>
                <div
                    className={`scan-item_metadata_scoring scan-item_metadata_scoring__${getRiskScoreColorClass(props.RiskScore)}`}>
                    <p>{props.RiskScore}</p>
                </div>
            </div>
            <div className="scan-item_content">
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <p><b>Инфо</b></p>
                        <table>
                            <tbody>
                            <tr>
                                <td>Имя хоста</td>
                                <td>{data.Host}</td>
                            </tr>
                            <tr>
                                <td>Источник</td>
                                <td>{data.Server}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs={12}>
                        <p><b>Содержание WHOIS записи</b></p>
                        <pre>{data.Raw}</pre>
                    </Grid>
                </Grid>
            </div>
        </div>
    </Grid>
}