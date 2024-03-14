import {Grid} from "@mui/material";
import {getRiskScoreColorClass, INetworkNodeScan} from "@/entities/nodes/networkNodeScan.ts";
import {IShodanScanData} from "@/entities/nodes/openSourceScans/shodan";
import {Fragment} from "react";
import {NavLink} from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export function ShodanIPScan(props: INetworkNodeScan) {
    const data = props.Data as IShodanScanData

    return <Grid item xs={12}>
        <div className={'scan-item scan-item__vt'}>
            <div className="scan-item_metadata">
                <div className="scan-item_metadata_id">
                    <h3>Сканирование IP Shodan
                        <NavLink target="_blank" rel="noopener noreferrer" to={`https://www.shodan.io/host/${props.Node?.Identity}`}>
                            <OpenInNewIcon/>
                        </NavLink>
                    </h3>
                    <h4>{props.NodeUUID}</h4>
                    <p>{data.ip_str}</p>
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
                                <td>ASN</td>
                                <td>{data.asn}</td>
                            </tr>
                            <tr>
                                <td>ISP</td>
                                <td>{data.isp}</td>
                            </tr>
                            <tr>
                                <td>Организация</td>
                                <td>{data.org}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Страна</td>
                                <td>{data.country_name} ({data.country_code})</td>
                            </tr>
                            <tr>
                                <td>Город</td>
                                <td>{data.city} ({data.region_code})</td>
                            </tr>
                            {/*<tr className="break"></tr>*/}
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs={4}>
                        <p><b>Идентификация</b></p>
                        <table>
                            <tbody>
                            <tr>
                                <td>ОС</td>
                                <td>{data.os}</td>
                            </tr>
                            <tr>
                                <td>Метки</td>
                                <td>{data.tags.join("\n")}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Порты</td>
                                <td>{data.ports.join("\n")}</td>
                            </tr>
                            <tr className="break"></tr>
                            {
                                data.domains.length > 0 ? <Fragment>
                                    <tr>
                                        <td colSpan={2}><i>доменные имена</i></td>
                                    </tr>
                                    {data.domains.map((value, index) => {
                                        return <tr key={index}>
                                            <td colSpan={2}>{value}</td>
                                        </tr>
                                    })}
                                </Fragment> : <Fragment/>
                            }
                            {
                                data.hostnames.length > 0 ? <Fragment>
                                    <tr>
                                        <td colSpan={2}><i>хостовые имена</i></td>
                                    </tr>
                                    {data.hostnames.map((value, index) => {
                                        return <tr key={index}>
                                            <td colSpan={2}>{value}</td>
                                        </tr>
                                    })}
                                </Fragment> : <Fragment/>
                            }
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs={12}>
                        <p><b>Собранная информация</b></p>
                        <table>
                            <thead>
                            <tr>
                                <td>Модуль</td>
                                <td>Порт</td>
                                <td>Данные</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data.data.map((value, index) => {
                                    return <tr key={index}>
                                        <td>{value._shodan.module}</td>
                                        <td>{value.port}</td>
                                        <td>{value.data}</td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </Grid>
                </Grid>
            </div>
        </div>
    </Grid>
}