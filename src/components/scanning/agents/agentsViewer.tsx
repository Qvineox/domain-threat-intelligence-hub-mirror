import {Fragment, useEffect, useState} from "react";
import {IAgent} from "@/entities/agents/agent.ts";
import AgentService from "@/services/agentsService.ts";
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {toast} from "react-toastify";
import AgentCard from "@/components/scanning/agents/agentCard.tsx";
import "@/styles/agents.scss"
import AgentDialog from "@/components/scanning/agents/agentDialog.tsx";
import {Button, ButtonGroup} from "@mui/material";

export default function AgentsViewer() {
    const [agents, setAgents] = useState<Array<IAgent>>([])
    const [selectedAgentUUID, setSelectedAgentUUID] = useState<string | null>(null)

    useEffect(() => {
        handleAgentsFetch()
    }, [])

    const handleAgentsFetch = () => {
        AgentService.getAgents().then((response) => {
            if (response.data) {
                setAgents(response.data)
            }
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error.message)
            toast.error("Ошибка получения списка агентов")
        })
    }

    return <div className={'agents-viewer'}>
        <h2>Доступные агенты</h2>
        <AgentDialog uuid={selectedAgentUUID} onHide={() => {
            setSelectedAgentUUID(null)
            handleAgentsFetch()
        }}/>
        {
            agents.length ? <ul className="agent-cards-list">
                {agents.map((value, index) => {
                    return <AgentCard key={index}
                                      agent={value} onClick={(uuid) => {
                        setSelectedAgentUUID(uuid)
                    }}/>
                })}
            </ul> : <Fragment/>
        }
        <ButtonGroup>
            <Button onClick={() => {
                setSelectedAgentUUID("")
            }}>Новый агент</Button>
        </ButtonGroup>
    </div>
}