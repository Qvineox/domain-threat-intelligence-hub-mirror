import {IVirusTotalDomainScanData, IVirusTotalIPScanData} from "@/entities/nodes/openSourceScans/virusTotal.ts";
import {Grid} from "@mui/material";
import {getRiskScoreColorClass, INetworkNodeScan} from "@/entities/nodes/networkNodeScan.ts";
import {Fragment} from "react";
import {NavLink} from "react-router-dom";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export function VirusTotalIPScan(props: INetworkNodeScan) {
    const data = props.Data as IVirusTotalIPScanData
    const detections = Object.entries(data.attributes.last_analysis_results).filter((value) => {
        return value[1].result !== 'unrated' && value[1].result !== 'clean'
    })

    return <Grid item xs={12}>
        <div className={'scan-item scan-item__vt'}>
            <div className="scan-item_metadata">
                <div className="scan-item_metadata_id">
                    <h3>Сканирование IP VirusTotal
                        <NavLink target="_blank" rel="noopener noreferrer" to={`https://www.virustotal.com/gui/ip-address/${props.Node?.Identity}`}>
                            <OpenInNewIcon/>
                        </NavLink>
                    </h3>
                    <h4>{props.NodeUUID}</h4>
                    <p>{data.id}</p>
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
                                <td>{data.attributes.asn}</td>
                            </tr>
                            <tr>
                                <td>JARM</td>
                                <td>{data.attributes.jarm}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Регион</td>
                                <td>{data.attributes.continent}</td>
                            </tr>
                            <tr>
                                <td>Страна</td>
                                <td>{data.attributes.country}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Владелец</td>
                                <td>{data.attributes.as_owner}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs={3}>
                        <p><b>Статус</b></p>
                        <table>
                            <tbody>
                            <tr>
                                <td>Вредоносный</td>
                                <td>{data.attributes.last_analysis_stats.malicious > 0 ?
                                    <b className={'warning'}>{data.attributes.last_analysis_stats.malicious}</b> :
                                    data.attributes.last_analysis_stats.malicious}
                                </td>
                            </tr>
                            <tr>
                                <td>Подозрительный</td>
                                <td>{data.attributes.last_analysis_stats.suspicious > 0 ?
                                    <b className={'warning'}>{data.attributes.last_analysis_stats.suspicious}</b> :
                                    data.attributes.last_analysis_stats.suspicious}
                                </td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Безопасный</td>
                                <td>{data.attributes.last_analysis_stats.harmless > 0 ?
                                    <b className={'safe'}>{data.attributes.last_analysis_stats.harmless}</b> :
                                    data.attributes.last_analysis_stats.harmless}
                                </td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Таймаут</td>
                                <td>{data.attributes.last_analysis_stats.timeout}</td>
                            </tr>
                            <tr>
                                <td>Не зафиксирован</td>
                                <td>{data.attributes.last_analysis_stats.undetected}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}><i>оценка сообщества</i></td>
                            </tr>
                            <tr>
                                <td>Репутация сообщества</td>
                                <td>{data.attributes.reputation}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Голоса за</td>
                                <td>{data.attributes.total_votes.harmless}</td>
                            </tr>
                            <tr>
                                <td>Голоса против</td>
                                <td>{data.attributes.total_votes.malicious}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Grid>
                    {
                        detections.length > 0 ? <Grid item xs={5}>
                            <p><b>Обнаружения</b></p>
                            <ul className={'detections'}>
                                {detections.map((value, index) => {
                                    return <li key={index}>
                                        {value[0]}: {value[1].result}
                                    </li>
                                })}
                            </ul>
                        </Grid> : <Grid item xs={5}>
                            <p><b>Обнаружения</b></p>
                            <i>Срабатываний не найдено</i>
                        </Grid>
                    }
                </Grid>
            </div>
        </div>
    </Grid>
}

export function VirusTotalDomainScan(props: INetworkNodeScan) {
    const data = props.Data as IVirusTotalDomainScanData
    const detections = Object.entries(data.attributes.last_analysis_results).filter((value) => {
        return value[1].result !== 'unrated' && value[1].result !== 'clean'
    })

    const categories = Object.entries(data.attributes.categories).map((value) => {
        return value[1] as string
    })

    return <Grid item xs={12}>
        <div className={'scan-item scan-item__vt'}>
            <div className="scan-item_metadata">
                <div className="scan-item_metadata_id">
                    <h3>Сканирование домена VirusTotal
                        <NavLink target="_blank" rel="noopener noreferrer" to={`https://www.virustotal.com/gui/domain/${props.Node?.Identity}`}>
                            <OpenInNewIcon/>
                        </NavLink>
                    </h3>
                    <h4>{props.NodeUUID}</h4>
                    <p>{data.id}</p>
                </div>
                <div
                    className={`scan-item_metadata_scoring scan-item_metadata_scoring__${getRiskScoreColorClass(props.RiskScore)}`}>
                    <p>{props.RiskScore}</p>
                </div>
            </div>
            <div className="scan-item_content">
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <p><b>Инфо</b></p>
                        <table>
                            <tbody>
                            <tr>
                                <td>TLD</td>
                                <td>{data.attributes.tld}</td>
                            </tr>
                            <tr>
                                <td>JARM</td>
                                <td>{data.attributes.jarm}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Категории</td>
                                <td>{categories.join("\n")}</td>
                            </tr>
                            <tr>
                                <td>Метки</td>
                                <td>{data.attributes.tags.join("\n")}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Регистратор</td>
                                <td>{data.attributes.registrar}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Grid>
                    {
                        data.attributes.last_dns_records.length > 0 ? <Grid item xs={6}>
                            <p><b>DNS записи</b></p>
                            <table>
                                <thead>
                                <tr>
                                    <td>Значение</td>
                                    <td>TTL</td>
                                    <td>Тип</td>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    data.attributes.last_dns_records.map((value, index) => {
                                        return <tr key={index}>
                                            <td>{value.value}</td>
                                            <td>{value.ttl}</td>
                                            <td>{value.type}</td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                        </Grid> : <Fragment/>
                    }
                    <Grid item xs={3}>
                        <p><b>Статус</b></p>
                        <table>
                            <tbody>
                            <tr>
                                <td>Вредоносный</td>
                                <td>{data.attributes.last_analysis_stats.malicious > 0 ?
                                    <b className={'warning'}>{data.attributes.last_analysis_stats.malicious}</b> :
                                    data.attributes.last_analysis_stats.malicious}
                                </td>
                            </tr>
                            <tr>
                                <td>Подозрительный</td>
                                <td>{data.attributes.last_analysis_stats.suspicious > 0 ?
                                    <b className={'warning'}>{data.attributes.last_analysis_stats.suspicious}</b> :
                                    data.attributes.last_analysis_stats.suspicious}
                                </td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Безопасный</td>
                                <td>{data.attributes.last_analysis_stats.harmless > 0 ?
                                    <b className={'safe'}>{data.attributes.last_analysis_stats.harmless}</b> :
                                    data.attributes.last_analysis_stats.harmless}
                                </td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Таймаут</td>
                                <td>{data.attributes.last_analysis_stats.timeout}</td>
                            </tr>
                            <tr>
                                <td>Не зафиксирован</td>
                                <td>{data.attributes.last_analysis_stats.undetected}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}><i>оценка сообщества</i></td>
                            </tr>
                            <tr>
                                <td>Репутация сообщества</td>
                                <td>{data.attributes.reputation < 0 ?
                                    <b className={'warning'}>{data.attributes.reputation}</b> : data.attributes.reputation}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Голоса за</td>
                                <td>{data.attributes.total_votes.harmless}</td>
                            </tr>
                            <tr>
                                <td>Голоса против</td>
                                <td>{data.attributes.total_votes.malicious}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Grid>
                    {
                        detections.length > 0 ? <Grid item xs={6}>
                            <p><b>Обнаружения</b></p>
                            <ul className={'detections'}>
                                {detections.map((value, index) => {
                                    return <li key={index}>
                                        {value[0]}: {value[1].result}
                                    </li>
                                })}
                            </ul>
                        </Grid> : <Grid item xs={6}>
                            <p><b>Обнаружения</b></p>
                            <i>Срабатываний не найдено</i>
                        </Grid>
                    }
                </Grid>
            </div>
        </div>
    </Grid>
}