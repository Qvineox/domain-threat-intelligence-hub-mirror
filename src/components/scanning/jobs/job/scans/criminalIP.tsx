import {Grid} from "@mui/material";
import {getRiskScoreColorClass, INetworkNodeScan} from "@/entities/nodes/networkNodeScan.ts";
import {NavLink} from "react-router-dom";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {ICriminalIPIPScanData} from "@/entities/nodes/openSourceScans/criminalIP.ts";
import {Fragment} from "react";

export function CriminalIPScan(props: INetworkNodeScan) {
    const data = props.Data as ICriminalIPIPScanData

    // const detections = Object.entries(data.attributes.last_analysis_results).filter((value) => {
    //     return value[1].result !== 'unrated' && value[1].result !== 'clean'
    // })

    return <Grid item xs={12}>
        <div className={'scan-item scan-item__criminal'}>
            <div className="scan-item_metadata">
                <div className="scan-item_metadata_id">
                    <h3>Сканирование IP CriminalIP
                        <NavLink target="_blank" rel="noopener noreferrer"
                                 to={`https://www.criminalip.io/login?h=/asset/search?query=ip%3A${props.Node?.Identity}`}>
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
                    <Grid item xs={5}>
                        <p><b>Инфо</b></p>
                        <table>
                            <tbody>
                            <tr className="break"></tr>
                            {data.domain.data.map((value, key) => {
                                return <tr key={key}>{value.domain}</tr>
                            })}
                            {
                                data.whois.count > 0 ? <Fragment>
                                    <tr>
                                        <td colSpan={3}><i>whois</i></td>
                                    </tr>
                                    {data.whois.data.map((value, key) => {
                                        return <tr key={key}>
                                            <td>ASN {value.as_no}</td>
                                            <td>{value.region}</td>
                                            <td>{value.org_name}</td>
                                        </tr>
                                    })}</Fragment> : <Fragment/>
                            }
                            {
                                data.domain.count > 0 ? <Fragment>
                                    <tr>
                                        <td colSpan={2}><i>домены</i></td>
                                    </tr>
                                    {data.domain.data.map((value, key) => {
                                        return <tr key={key}>
                                            <td>{value.domain}</td>
                                            <td>{value.registrar}</td>
                                        </tr>
                                    })}</Fragment> : <Fragment/>
                            }
                            {
                                data.vpn.count > 0 ? <Fragment>
                                    <tr>
                                        <td colSpan={2}><i>Обнурженный VPN</i></td>
                                    </tr>
                                    <td>{data.vpn.data.map((value, key) => {
                                        return <tr key={key}>
                                            <td>{value.vpn_name}</td>
                                        </tr>
                                    })}</td>
                                </Fragment> : <Fragment/>
                            }
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs={3}>
                        <p><b>Активность</b></p>
                        <table>
                            <tbody>
                            <tr>
                                <td>VPN</td>
                                <td>{data.issues.is_vpn ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            <tr>
                                <td>Анонимный VPN</td>
                                <td>{data.issues.is_anonymous_vpn ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            <tr>
                                <td>Прокси</td>
                                <td>{data.issues.is_proxy ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            <tr>
                                <td>Тор</td>
                                <td>{data.issues.is_tor ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Облако</td>
                                <td>{data.issues.is_cloud ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            <tr>
                                <td>Хостинг</td>
                                <td>{data.issues.is_hosting ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            <tr>
                                <td>Darkweb</td>
                                <td>{data.issues.is_darkweb ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Snort</td>
                                <td>{data.issues.is_snort ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            <tr>
                                <td>Сканер</td>
                                <td>{data.issues.is_scanner ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            <tr>
                                <td>Мобильный</td>
                                <td>{data.issues.is_mobile ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs={4}>
                        <p><b>Оценка</b></p>
                        <table>
                            <tbody>
                            <tr>
                                <td>Оценка (вх. трафик)</td>
                                <td>{data.score.inbound == "Critical" ?
                                    <b className={'warning'}>{data.score.inbound}</b> :
                                    data.score.inbound}
                                </td>
                            </tr>
                            <tr>
                                <td>Оценка (исх. трафик)</td>
                                <td>{data.score.outbound == "Critical" ?
                                    <b className={'warning'}>{data.score.outbound}</b> :
                                    data.score.outbound}
                                </td>
                            </tr>
                            <tr className="break"></tr>
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs={12}>
                        <p><b>Порты</b></p>
                        <table>
                            <thead>
                            <tr>
                                <td>Номер</td>
                                <td>Приложение</td>
                                <td>Статус</td>
                                <td>Протокол</td>
                                <td>Метки</td>
                                <td>Время</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data.port.count > 0 ? <Fragment>
                                    {data.port.data.map((value, key) => {
                                        return <tr title={value.banner} key={key}>
                                            <td>{value.open_port_no}</td>
                                            <td>{value.app_name}</td>
                                            <td>{value.port_status}</td>
                                            <td>{value.protocol}</td>
                                            <td>{value.tags.join(", ")}</td>
                                            <td>{value.confirmed_time}</td>
                                        </tr>
                                    })}
                                </Fragment> : <Fragment/>
                            }
                            </tbody>
                        </table>
                        <p style={{marginTop: "10px"}} className={'hint'}>Наведите, чтобы увидеть информацию о
                            баннере.</p>
                    </Grid>
                </Grid>
            </div>
        </div>
    </Grid>
}