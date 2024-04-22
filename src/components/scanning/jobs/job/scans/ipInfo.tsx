import {Grid} from "@mui/material";
import {getRiskScoreColorClass, INetworkNodeScan} from "@/entities/nodes/networkNodeScan.ts";
import {NavLink} from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {IIPInfoIPScanData} from "@/entities/nodes/openSourceScans/ipInfo.ts";

export function IPInfoScan(props: INetworkNodeScan) {
    const data = props.Data as IIPInfoIPScanData

    return <Grid item xs={12}>
        <div className={'scan-item scan-item__ip-info'}>
            <div className="scan-item_metadata">
                <div className="scan-item_metadata_id">
                    <h3>Сканирование IP Info
                        <NavLink target="_blank" rel="noopener noreferrer"
                                 to={`https://ipinfo.io/`}>
                            <OpenInNewIcon/>
                        </NavLink>
                    </h3>
                    <h4>{props.NodeUUID}</h4>
                    <p>{data.ip}</p>
                </div>
                <div
                    className={`scan-item_metadata_scoring scan-item_metadata_scoring__${getRiskScoreColorClass(props.RiskScore)}`}>
                    <p>{props.RiskScore}</p>
                </div>
            </div>
            <div className="scan-item_content">
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <p><b>Инфо</b></p>
                        <table>
                            <tbody>
                            <tr>
                                <td>Имя хоста</td>
                                <td>{data.hostname}</td>
                            </tr>
                            <tr>
                                <td>Организация</td>
                                <td>{data.org}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Регион</td>
                                <td>{data.region}</td>
                            </tr>
                            <tr>
                                <td>Страна</td>
                                <td>{data.country}</td>
                            </tr>
                            <tr>
                                <td>Город</td>
                                <td>{data.city}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Индекс</td>
                                <td>{data.postal}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Grid>
                </Grid>
            </div>
        </div>
    </Grid>
}