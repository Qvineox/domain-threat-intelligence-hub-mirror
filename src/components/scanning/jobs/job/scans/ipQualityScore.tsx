import {Grid} from "@mui/material";
import {getRiskScoreColorClass, INetworkNodeScan} from "@/entities/nodes/networkNodeScan.ts";
import {
    IIPQualityScoreMaliciousScan,
    IIPQualityScorePrivacyScan
} from "@/entities/nodes/openSourceScans/ipQualityScore.ts";
import dayjs from "dayjs";

export function IPQualityScoreIPScan(props: INetworkNodeScan) {
    const data = props.Data as IIPQualityScorePrivacyScan

    return <Grid item xs={12}>
        <div className={'scan-item scan-item__ipqs'}>
            <div className="scan-item_metadata">
                <div className="scan-item_metadata_id">
                    <h3>Сканирование IP IPQualityScore</h3>
                    <h4>{props.NodeUUID}</h4>
                    <p>{data.host}</p>
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
                                <td>{data.ASN}</td>
                            </tr>
                            <tr>
                                <td>ISP</td>
                                <td>{data.ISP}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Страна</td>
                                <td>{data.country_code}</td>
                            </tr>
                            <tr>
                                <td>Регион</td>
                                <td>{data.region}</td>
                            </tr>
                            <tr>
                                <td>Город</td>
                                <td>{data.city}</td>
                            </tr>
                            <tr>
                                <td>Зона</td>
                                <td>{data.timezone}</td>
                            </tr>
                            <tr>
                                <td>Индекс</td>
                                <td>{data.zip_code}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Организация</td>
                                <td>{data.organization}</td>
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
                                <td>Часть TOR сети</td>
                                <td>{data.tor ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            <tr>
                                <td>VPN шлюз</td>
                                <td>{data.vpn ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            <tr>
                                <td>Ботнет</td>
                                <td>{data.is_crawler ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs={4}>
                        <p><b>Оценка узла</b></p>
                        <table>
                            <tbody>
                            <tr>
                                <td>Потенциал мошеннической активности</td>
                                <td>{data.fraud_score}</td>
                            </tr>
                            <tr>
                                <td>Недавние инциденты</td>
                                <td>{data.recent_abuse ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Grid>
                </Grid>
            </div>
        </div>
    </Grid>
}

export function IPQualityScoreURLScan(props: INetworkNodeScan) {
    const data = props.Data as IIPQualityScoreMaliciousScan

    return <Grid item xs={12}>
        <div className={'scan-item scan-item__ipqs'}>
            <div className="scan-item_metadata">
                <div className="scan-item_metadata_id">
                    <h3>Сканирование URL IPQualityScore</h3>
                    <h4>{props.NodeUUID}</h4>
                    <p>{data.domain} <i>({data.final_url})</i></p>
                    <br/>
                    <i>{data.page_title}</i>
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
                                <td>IP</td>
                                <td>{data.ip_address}</td>
                            </tr>
                            <tr>
                                <td>Корневой домен</td>
                                <td>{data.root_domain}</td>
                            </tr>
                            <tr>
                                <td>Страна</td>
                                <td>{data.country_code}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Категория</td>
                                <td>{data.category}</td>
                            </tr>
                            <tr>
                                <td>Тех. средства</td>
                                <td>{data.technologies.join("\n")}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>А записи</td>
                                <td>{data.a_records.join("\n")}</td>
                            </tr>
                            <tr>
                                <td>DMARC запись</td>
                                <td>{data.dmarc_record}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Парковка домена</td>
                                <td>{data.parking}</td>
                            </tr>
                            <tr>
                                <td>Ранг домена</td>
                                <td>{data.domain_rank}</td>
                            </tr>
                            <tr>
                                <td>Регистрация домена</td>
                                <td>{dayjs(data.domain_age.iso).format("DD.MM.YYYY")}</td>
                            </tr>
                            {/*<tr>*/}
                            {/*    <td>Доверие к домену</td>*/}
                            {/*    <td>{data.domain_trust}</td>*/}
                            {/*</tr>*/}
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs={4}>
                        <p><b>Активность</b></p>
                        <table>
                            <tbody>
                            <tr>
                                <td>Распространение ВПО</td>
                                <td>{data.malware ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            <tr>
                                <td>Контент NSFW</td>
                                <td>{data.adult ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            <tr>
                                <td>Спам</td>
                                <td>{data.spamming ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            <tr>
                                <td>Фишинг</td>
                                <td>{data.phishing ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            <tr className="break"></tr>
                            <tr>
                                <td>Переадресация</td>
                                <td>{data.redirected ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs={4}>
                        <p><b>Оценка узла</b></p>
                        <table>
                            <tbody>
                            <tr>
                                <td>Уровень риска</td>
                                <td>{data.risk_score}</td>
                            </tr>
                            <tr>
                                <td>Подозрительная активность</td>
                                <td>{data.suspicious ? <b className={'warning'}>да</b> : 'нет'}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Grid>
                </Grid>
            </div>
        </div>
    </Grid>
}