import {Grid} from "@mui/material";
import {getRiskScoreColorClass, INetworkNodeScan} from "@/entities/nodes/networkNodeScan.ts";
import {NavLink} from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {IIPAPIScanData} from "@/entities/nodes/openSourceScans/ipApi.ts";

export function IPAPIScan(props: INetworkNodeScan) {
    const data = props.Data as IIPAPIScanData;

    return <Grid item xs={12}>
        <div className={'scan-item scan-item__ip-api'}>
            <div className="scan-item_metadata">
                <div className="scan-item_metadata_id">
                    <h3>Сканирование IP API
                        <NavLink target="_blank" rel="noopener noreferrer"
                                 to={`https://ip-api.com/`}>
                            <OpenInNewIcon/>
                        </NavLink>
                    </h3>
                    <h4>{props.NodeUUID}</h4>
                    <p>{data.query}</p>
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
                                <td>ASN</td>
                                <td>{data.asname}</td>
                            </tr>
                            <tr>
                                <td>ISP</td>
                                <td>{data.isp}</td>
                            </tr>
                            <tr className="break"></tr>
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
                                <td>{data.zip}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs={4}>
                        <p><b>Приватность узла</b></p>
                        <table>
                            <tbody>
                            <tr>
                                <td>Используется как проски</td>
                                <td>{data.proxy ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            <tr>
                                <td>Хостинг провайлдер</td>
                                <td>{data.hosting ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Grid>
                </Grid>
            </div>
        </div>
    </Grid>
}