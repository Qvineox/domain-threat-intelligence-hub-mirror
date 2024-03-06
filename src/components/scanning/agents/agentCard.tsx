import {IAgent} from "@/entities/agents/agent.ts";
import {JobPriority} from "@/entities/queue/job.ts";
import {Fragment} from "react";
import {Tooltip} from "@mui/material";

interface IAgentCardProps {
    agent: IAgent
    onClick: (uuid: string) => void
}

export default function AgentCard(props: IAgentCardProps) {
    let priority: string
    let statusColor: string
    let statusMessage: string

    if (props.agent.IsActive) {
        statusColor = '#fcaf53'

        if (props.agent.IsConnected) {
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

    switch (props.agent.MinPriority) {
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

    return <li onClick={() => props.onClick(props.agent.UUID)} className={'agent-card'}>
        <div className={'agent-card_identity'}>
            <h3>{props.agent.Name}
                <Tooltip placement={'right-end'} title={statusMessage}>
                    <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg">
                        <circle r="5" cx="5" cy="5" fill={statusColor}/>
                    </svg>
                </Tooltip>

            </h3>
            <p>{props.agent.UUID}</p>
        </div>
        <div className={'agent-card_net'}>
            <h4>{props.agent.Host}</h4>
            <p>{props.agent.IPAddress.IPNet.IP}</p>
        </div>
        <div className={'agent-card_tags'}>
            <table>
                <tbody>
                <tr>
                    <td className={'keys'}>
                        доступность
                    </td>
                    <td className={'values'}>
                        {props.agent.IsPrivate ? 'приватный' : 'публичный'}
                    </td>
                </tr>
                <tr>
                    <td className={'keys'}>
                        размещение
                    </td>
                    <td className={'values'}>
                        {props.agent.IsHomeBound ? 'домашний (NAT)' : 'в интернете'}
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
                    props.agent.Owner ? <tr>
                        <td className={'keys'}>
                            владелец
                        </td>
                        <td className={'values'}>
                            {props.agent.Owner?.Login}
                        </td>
                    </tr> : <Fragment/>
                }
                </tbody>
            </table>
        </div>
    </li>
}