import {Grid} from "@mui/material";
import {getRiskScoreColorClass, INetworkNodeScan} from "@/entities/nodes/networkNodeScan.ts";
import {ICrowdSecIPScanData} from "@/entities/nodes/openSourceScans/crowdSec.ts";
import {Fragment} from "react";
import {NavLink} from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export function CrowdSecIPScan(props: INetworkNodeScan) {
    const data = props.Data as ICrowdSecIPScanData
    const countries: Array<string> = []

    // todo: remove this
    try {
        data.target_countries?.forEach(((value, key) => {
            countries.push(`${key} (${value})`)
        }))
    }

    return <Grid item xs={12}>
        <div className={'scan-item scan-item__vt'}>
            <div className="scan-item_metadata">
                <div className="scan-item_metadata_id">
                    <h3>Сканирование IP CrowdSec CTI
                        <NavLink target="_blank" rel="noopener noreferrer"
                                 to={`https://app.crowdsec.net/cti/${props.Node?.Identity}`}>
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
                    <Grid item xs={4}>
                        <p><b>Инфо</b></p>
                        <table>
                            <tbody>
                            <tr>
                                <td>ASN</td>
                                <td>{data.as_num}</td>
                            </tr>
                            <tr>
                                <td>Владелец</td>
                                <td>{data.as_name}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Регион</td>
                                <td>{data.location.country}</td>
                            </tr>
                            <tr>
                                <td>Город</td>
                                <td>{data.location.city}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Обратный DNS</td>
                                <td>{data.reverse_dns}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Grid>
                    {
                        data.behaviors.length > 0 || data.cves.length > 0 || data.mitre_techniques.length > 0 ?
                            <Grid item xs={4}>
                                <p><b>Угрозы</b></p>
                                <table>
                                    <tbody>
                                    {data.behaviors.length > 0 ? <Fragment>
                                        <tr>
                                            <td colSpan={2}><i>анализ поведения</i></td>
                                        </tr>
                                        {data.behaviors.map((value, index) => {
                                            return <tr title={value.description} key={index}>
                                                <td>{value.name}</td>
                                                <td>{value.label}</td>
                                            </tr>
                                        })}
                                    </Fragment> : <Fragment/>}
                                    {data.cves.length > 0 ? <Fragment>
                                        <tr>
                                            <td colSpan={2}><i>CVE</i></td>
                                        </tr>
                                        {data.cves.map((value, index) => {
                                            return <tr key={index}>
                                                <td colSpan={2}>{value}</td>
                                            </tr>
                                        })}
                                    </Fragment> : <Fragment/>}
                                    {data.mitre_techniques.length > 0 ? <Fragment>
                                        <tr>
                                            <td colSpan={2}><i>техники MITRE</i></td>
                                        </tr>
                                        {data.mitre_techniques.map((value, index) => {
                                            return <tr title={value.description} key={index}>
                                                <td>{value.name}</td>
                                                <td>{value.label}</td>
                                            </tr>
                                        })}
                                    </Fragment> : <Fragment/>}
                                    {data.classifications && data.classifications.classifications.length > 0 ?
                                        <Fragment>
                                            <tr>
                                                <td colSpan={2}><i>классификация</i></td>
                                            </tr>
                                            {data.classifications.classifications.map((value, index) => {
                                                return <tr title={value.description} key={index}>
                                                    <td>{value.name}</td>
                                                    <td>{value.label}</td>
                                                </tr>
                                            })}
                                        </Fragment> : <Fragment/>}
                                    </tbody>
                                </table>
                            </Grid> : <Fragment/>
                    }
                    <Grid item xs={4}>
                        <p><b>Статус</b></p>
                        <table>
                            <tbody>
                            <tr>
                                <td>Репутация</td>
                                <td>{data.reputation}</td>
                            </tr>
                            <tr>
                                <td>Оценка шума</td>
                                <td>{data.background_noise} ({data.background_noise_score})</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Уверенность</td>
                                <td>{data.confidence}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}><i>за все время</i></td>
                            </tr>
                            <tr>
                                <td>Агрессивность</td>
                                <td>{data.scores.overall.aggressiveness}</td>
                            </tr>
                            <tr>
                                <td>Угроза</td>
                                <td>{data.scores.overall.threat}</td>
                            </tr>
                            <tr>
                                <td>Аномальная активность</td>
                                <td>{data.scores.overall.anomaly}</td>
                            </tr>
                            <tr>
                                <td>Уверенность</td>
                                <td>{data.scores.overall.trust}</td>
                            </tr>
                            <tr>
                                <td>Общая оценка</td>
                                <td>{data.scores.overall.total}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}><i>за последний месяц</i></td>
                            </tr>
                            <tr>
                                <td>Агрессивность</td>
                                <td>{data.scores.last_month.aggressiveness}</td>
                            </tr>
                            <tr>
                                <td>Угроза</td>
                                <td>{data.scores.last_month.threat}</td>
                            </tr>
                            <tr>
                                <td>Аномальная активность</td>
                                <td>{data.scores.last_month.anomaly}</td>
                            </tr>
                            <tr>
                                <td>Уверенность</td>
                                <td>{data.scores.last_month.trust}</td>
                            </tr>
                            <tr>
                                <td>Общая оценка</td>
                                <td>{data.scores.last_month.total}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}><i>регион активности</i></td>
                            </tr>
                            {
                                countries.length > 0 ? countries.map((value) => {
                                    return <tr>
                                        <td colSpan={2}>{value}</td>
                                    </tr>
                                }) : <Fragment/>
                            }
                            </tbody>
                        </table>
                    </Grid>
                </Grid>
            </div>
        </div>
    </Grid>
}