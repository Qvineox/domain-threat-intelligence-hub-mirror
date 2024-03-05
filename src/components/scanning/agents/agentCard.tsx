import {IAgent} from "@/entities/agents/agent.ts";
import {JobPriority} from "@/entities/queue/job.ts";
import {Fragment} from "react";
import {Tooltip} from "@mui/material";

export default function AgentCard(props: IAgent) {
    let priority: string
    let statusColor: string
    let statusMessage: string

    if (props.IsActive) {
        statusColor = '#fcaf53'

        if (props.IsConnected) {
            statusColor = '#1fa21f'
            statusMessage = "Агент активен и подключен."
        } else {
            statusColor = '#d33939'
            statusMessage = "Агент активен, но не подключен."
        }
    } else {
        statusColor = '#979797'
        statusMessage = "Агент не активен. Статус подключения неизвестен."
    }

    switch (props.MinPriority) {
        case JobPriority.JOB_PRIORITY_CRITICAL:
            priority = "срочный"
            break
        case JobPriority.JOB_PRIORITY_HIGH:
            priority = "высокий"
            break
        case JobPriority.JOB_PRIORITY_MEDIUM:
            priority = "средний"
            break
        case JobPriority.JOB_PRIORITY_LOW:
            priority = "низкий"
    }

    return <li className={'agent-card'}>
        <div className={'agent-card_identity'}>
            <h3>{props.Name}
                <Tooltip placement={'right-end'} title={statusMessage}>
                    <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg">
                        <circle r="5" cx="5" cy="5" fill={statusColor}/>
                    </svg>
                </Tooltip>

            </h3>
            <p>{props.UUID}</p>
        </div>
        <div className={'agent-card_net'}>
            <h4>{props.Host}</h4>
            <p>{props.IPAddress.IPNet.IP}</p>
        </div>
        <div className={'agent-card_tags'}>
            <table>
                <tbody>
                <tr>
                    <td className={'keys'}>
                        доступность
                    </td>
                    <td className={'values'}>
                        {props.IsPrivate ? 'приватный' : 'публичный'}
                    </td>
                </tr>
                <tr>
                    <td className={'keys'}>
                        размещение
                    </td>
                    <td className={'values'}>
                        {props.IsHomeBound ? 'домашний (NAT)' : 'в интернете'}
                    </td>
                </tr>
                <tr>
                    <td className={'keys'}>
                        минимальный приоритет
                    </td>
                    <td className={'values'}>
                        {priority}
                    </td>
                </tr>
                {
                    props.Owner ? <tr>
                        <td className={'keys'}>
                            владелец
                        </td>
                        <td className={'values'}>
                            {props.Owner?.Login}
                        </td>
                    </tr> : <Fragment/>
                }
                </tbody>
            </table>
        </div>
    </li>
}