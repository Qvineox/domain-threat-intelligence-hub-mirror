import dayjs, {Dayjs} from "dayjs";
import {TargetType} from "@/entities/queue/dialerJob.ts";
import {Fragment} from "react";

interface INodeProfileInfoPanelProps {
    UUID: string
    Identity: string
    NodeTypeId: TargetType
    DiscoveredAt: Dayjs
    CreatedAt: Dayjs
    UpdatedAt: Dayjs
    DeletedAt?: Dayjs
}

export default function NodeProfileInfoPanel(props: INodeProfileInfoPanelProps) {
    let nodeType: string

    switch (props.NodeTypeId) {
        case TargetType.HOST_TYPE_CIDR:
            nodeType = 'IP адрес'
            break
        case TargetType.HOST_TYPE_DOMAIN:
            nodeType = 'Домен'
            break
        case TargetType.HOST_TYPE_URL:
            nodeType = 'Ссылка URL'
            break
        case TargetType.HOST_TYPE_EMAIL:
            nodeType = 'Почтовый адрес'
            break

    }

    return <div className={'panel panel__identity'}>
        <h2 className={'identity'}>{props.Identity}</h2>
        <p className={'uuid'}>{props.UUID}</p>
        <i>{nodeType}</i>
        <table>
            <tbody>
            <tr>
                <td>Дата обнаружения</td>
                <td>{dayjs(props.DiscoveredAt).format("DD.MM.YYYY hh:mm")}</td>
            </tr>
            <tr>
                <td>Дата создания</td>
                <td>{dayjs(props.CreatedAt).format("DD.MM.YYYY hh:mm")}</td>
            </tr>
            <tr>
                <td>Дата обновления</td>
                <td>{dayjs(props.UpdatedAt).format("DD.MM.YYYY hh:mm")}</td>
            </tr>
            {
                props.DeletedAt ? <tr>
                    <td>Дата удаления</td>
                    <td>{dayjs(props.DeletedAt).format("DD.MM.YYYY hh:mm")}</td>
                </tr> : <Fragment/>
            }
            </tbody>
        </table>
    </div>
}