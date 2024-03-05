import {Fragment, useEffect, useState} from "react";
import {IAgent} from "@/entities/agents/agent.ts";
import AgentService from "@/services/agentsService.ts";
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {toast} from "react-toastify";
import AgentCard from "@/components/scanning/agents/agentCard.tsx";
import "@/styles/agents.scss"

export default function AgentsViewer() {
    const [agents, setAgents] = useState<Array<IAgent>>([])

    useEffect(() => {
        AgentService.getAgents().then((response) => {
            if (response.data) {
                setAgents(response.data)
            }
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error.message)
            toast.error("Ошибка получения списка агентов")
        })
    }, [])

    return <div className={'agents-viewer'}>
        <h2>Доступные агенты</h2>
        {
            agents.length ? <ul className="agent-cards-list">
                {agents.map((value, index) => {
                    return <AgentCard key={index} {...value}/>
                })}
            </ul> : <Fragment/>
        }
    </div>
}