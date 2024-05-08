import dayjs, {Dayjs} from "dayjs";

interface INodeProfileWhoisPanelProps {
    Value: string
    Source: string
    Timestamp: Dayjs
}

export function NodeProfileWhoisPanel(props: INodeProfileWhoisPanelProps) {
    return <div className={'panel panel__whois'}>
        <h4>WHOIS</h4>
        <pre>
            {props.Value}
        </pre>
        <p className={'source'}>{dayjs(props.Timestamp).format("DD.MM.YYYY hh:mm")}</p>
    </div>
}