import dayjs from "dayjs";
import {
    IBoolScanValue,
    IDomainRecordDataScanValue,
    INumberScanValue,
    IStringScanValue
} from "@/entities/nodes/networkNodeProfile.ts";

interface INodeProfileDNSPanelProps {
    IsDNSValid?: IBoolScanValue[]
    Registrar?: IStringScanValue[]
    DomainRank?: INumberScanValue[]
    DomainAge?: IStringScanValue[]
    IsDomainParked?: IBoolScanValue[]

    ARecords?: IDomainRecordDataScanValue[]
    AAAARecords?: IDomainRecordDataScanValue[]
    CNameRecords?: IDomainRecordDataScanValue[]
    MXRecords?: IDomainRecordDataScanValue[]
    NSRecords?: IDomainRecordDataScanValue[]
    PTRRecords?: IDomainRecordDataScanValue[]
    SOARecords?: IDomainRecordDataScanValue[]

    TXTRecords?: IDomainRecordDataScanValue[]
}

export function NodeProfileDNSPanel(props: INodeProfileDNSPanelProps) {
    return <div className={'panel panel__dns'}>
        <h4>DNS</h4>

        <table className={'dns-info'}>
            <tbody>
            <tr>
                <td>DNS верен</td>
                <td>{props.IsDNSValid ? (props.IsDNSValid[0].Value ? 'Да' : 'Нет') : '???'}</td>
            </tr>
            <tr>
                <td>Регистратор</td>
                <td>{props.Registrar ? props.Registrar[0].Value : '???'}</td>
            </tr>
            <tr>
                <td>Ранг домена</td>
                <td>{props.DomainRank ? props.DomainRank[0].Value : '???'}</td>
            </tr>
            <tr>
                <td>Возраст домена</td>
                <td>{props.DomainAge ? dayjs(props.DomainAge[0].Value).format("DD.MM.YYYY hh:mm") : '???'}</td>
            </tr>
            <tr>
                <td>Парковка домена</td>
                <td>{props.IsDomainParked ? (props.IsDomainParked[0].Value ? 'Да' : 'Нет') : '???'}</td>
            </tr>
            </tbody>
        </table>

        <table className={'records'}>
            <thead>
            <tr>
                <td width={100}>Тип записи</td>
                <td>Ресурс</td>
            </tr>
            </thead>
            <tbody>
            {
                props.ARecords && props.ARecords.map((record, index) => {
                    return <tr key={index}
                               title={`${record.Source} от ${dayjs(record.Timestamp).format("DD.MM.YYYY hh:mm")}`}>
                        <td>
                            A
                        </td>
                        <td>
                            {record.Value}
                        </td>
                    </tr>
                })
            }
            {
                props.AAAARecords && props.AAAARecords.map((record, index) => {
                    return <tr key={index}
                               title={`${record.Source} от ${dayjs(record.Timestamp).format("DD.MM.YYYY hh:mm")}`}>
                        <td>
                            AAAA
                        </td>
                        <td>
                            {record.Value}
                        </td>
                    </tr>
                })
            }
            <tr className={'break'}>
                <td colSpan={2}></td>
            </tr>
            {
                props.MXRecords && props.MXRecords.map((record, index) => {
                    return <tr key={index}
                               title={`${record.Source} от ${dayjs(record.Timestamp).format("DD.MM.YYYY hh:mm")}`}>
                        <td>
                            MX
                        </td>
                        <td>
                            {record.Value}
                        </td>
                    </tr>
                })
            }
            {
                props.CNameRecords && props.CNameRecords.map((record, index) => {
                    return <tr key={index}
                               title={`${record.Source} от ${dayjs(record.Timestamp).format("DD.MM.YYYY hh:mm")}`}>
                        <td>
                            CNAME
                        </td>
                        <td>
                            {record.Value}
                        </td>
                    </tr>
                })
            }
            {
                props.NSRecords && props.NSRecords.map((record, index) => {
                    return <tr key={index}
                               title={`${record.Source} от ${dayjs(record.Timestamp).format("DD.MM.YYYY hh:mm")}`}>
                        <td>
                            NS
                        </td>
                        <td>
                            {record.Value}
                        </td>
                    </tr>
                })
            }
            {
                props.PTRRecords && props.PTRRecords.map((record, index) => {
                    return <tr key={index}
                               title={`${record.Source} от ${dayjs(record.Timestamp).format("DD.MM.YYYY hh:mm")}`}>
                        <td>
                            PTR
                        </td>
                        <td>
                            {record.Value}
                        </td>
                    </tr>
                })
            }
            {
                props.SOARecords && props.SOARecords.map((record, index) => {
                    return <tr key={index}
                               title={`${record.Source} от ${dayjs(record.Timestamp).format("DD.MM.YYYY hh:mm")}`}>
                        <td>
                            SOA
                        </td>
                        <td>
                            {record.Value}
                        </td>
                    </tr>
                })
            }
            <tr className={'break'}>
                <td colSpan={2}></td>
            </tr>
            {
                props.TXTRecords && props.TXTRecords.map((record, index) => {
                    return <tr key={index}
                               title={`${record.Source} от ${dayjs(record.Timestamp).format("DD.MM.YYYY hh:mm")}`}>
                        <td>
                            TXT
                        </td>
                        <td>
                            {record.Value}
                        </td>
                    </tr>
                })
            }
            </tbody>
        </table>
    </div>
}