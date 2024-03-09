import {Fragment, useEffect, useState} from "react";
import {IAgent} from "@/entities/agents/agent.ts";
import AgentService from "@/services/agentsService.ts";
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {toast} from "react-toastify";
import AgentCard from "@/components/scanning/agents/agentCard.tsx";
import "@/styles/agents.scss"
import AgentDialog from "@/components/scanning/agents/agentDialog.tsx";
import {Backdrop, Button, ButtonGroup, CircularProgress} from "@mui/material";

export default function AgentsViewer() {
    const [readyAgents, setReadyAgents] = useState<Array<IAgent>>([])
    const [idleAgents, setIdleAgents] = useState<Array<IAgent>>([])
    const [erroredAgents, setErroredAgents] = useState<Array<IAgent>>([])
    const [selectedAgentUUID, setSelectedAgentUUID] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        handleAgentsFetch()
    }, [])

    const handleAgentsFetch = () => {
        setIsLoading(true)

        AgentService.getAgents().then((response) => {
            if (response.data) {
                let readyAgents_: Array<IAgent> = []
                let idleAgents_: Array<IAgent> = []
                let erroredAgents_: Array<IAgent> = []

                response.data.forEach((value) => {
                    if (value.IsActive) {
                        if (value.IsConnected) {
                            readyAgents_.push(value)
                        } else {
                            erroredAgents_.push(value)
                        }
                    } else {
                        idleAgents_.push(value)
                    }
                })

                setReadyAgents(readyAgents_)
                setIdleAgents(idleAgents_)
                setErroredAgents(erroredAgents_)
            }
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error.message)
            toast.error("Ошибка получения списка агентов")
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return <div className={'agents-viewer'}>
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={isLoading}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
        <h1>Панель управления агентами сканирования</h1>
        <AgentDialog isLoading={isLoading}
                     setIsLoading={setIsLoading}
                     uuid={selectedAgentUUID}
                     onHide={() => {
                         setSelectedAgentUUID(null)
                         handleAgentsFetch()
                     }}/>
        <ButtonGroup sx={{marginBottom: '2vh'}}>
            <Button onClick={() => {
                setSelectedAgentUUID("")
            }}>Подключение нового агента</Button>
        </ButtonGroup>
        {
            readyAgents.length ? <Fragment>
                <h2>Активные агенты</h2>
                <ul className="agent-cards-list agent-cards-list__ready">
                    {readyAgents.map((value, index) => {
                        return <AgentCard key={index}
                                          agent={value} onClick={(uuid) => {
                            setSelectedAgentUUID(uuid)
                        }}/>
                    })}
                </ul>
            </Fragment> : <Fragment/>
        }
        {
            erroredAgents.length ? <Fragment>
                <h2>Поврежденные агенты</h2>
                <ul className="agent-cards-list agent-cards-list__error">
                    {erroredAgents.map((value, index) => {
                        return <AgentCard key={index}
                                          agent={value} onClick={(uuid) => {
                            setSelectedAgentUUID(uuid)
                        }}/>
                    })}
                </ul>
            </Fragment> : <Fragment/>
        }
        {
            idleAgents.length ? <Fragment>
                <h2>Неактивные агенты</h2>
                <ul className="agent-cards-list agent-cards-list__idle">
                    {idleAgents.map((value, index) => {
                        return <AgentCard key={index}
                                          agent={value} onClick={(uuid) => {
                            setSelectedAgentUUID(uuid)
                        }}/>
                    })}
                </ul>
            </Fragment> : <Fragment/>
        }
    </div>
}