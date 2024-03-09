import {
    Backdrop,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Tooltip
} from "@mui/material";
import {IAgent, IAgentUpdateParams} from "@/entities/agents/agent.ts";
import {Dispatch, Fragment, SetStateAction, useEffect, useState} from "react";
import AgentService from "@/services/agentsService.ts";
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {toast} from "react-toastify";
import {JobPriority} from "@/entities/queue/job.ts";
import {IUser} from "@/entities/users/user.ts";
import UserService from "@/services/userService.ts";
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';

interface IAgentDialog {
    uuid: string | null
    onHide: () => void
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

const defaultAgent: IAgent = {
    Description: "",
    UUID: "",
    IsActive: false,
    IsConnected: false,
    IsPrivate: false,
    IsHomeBound: true,
    MinPriority: JobPriority.JOB_PRIORITY_MEDIUM,
    Name: "",
    OwnerID: 0,
    Host: "example.com",
    IPAddress: {
        IPNet: {
            IP: "",
        }
    }
}

export default function AgentDialog(props: IAgentDialog) {
    const [originalAgent, setOriginalAgent] = useState<IAgent>(defaultAgent)
    const [agent, setAgent] = useState<IAgent>(defaultAgent)

    const [availableUsers, setAvailableUsers] = useState<Array<IUser>>([])

    useEffect(() => {
        UserService.getUsers().then((response) => {
            if (response.data) {
                setAvailableUsers(response.data)
            }
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error.message)
            toast.error("Ошибка получения данных о пользователях")
        })
    }, []);

    useEffect(() => {
        if (props.uuid) {
            props.setIsLoading(true)

            AgentService.getAgentByUUID(props.uuid).then((response) => {
                if (response.data) {
                    setAgent(response.data)
                    setOriginalAgent(response.data)
                }
            }).catch((error: AxiosError<ApiError>) => {
                console.error(error.message)
                toast.error("Ошибка получения данных об агенте")
            }).finally(() => {
                props.setIsLoading(false)
            })
        } else if (props.uuid == "") {
            setOriginalAgent(defaultAgent)
            setAgent(defaultAgent)
        }
    }, [props.uuid]);

    const handleReset = () => {
        setAgent(originalAgent)
    }

    const handleUpdate = () => {
        if (agent) {
            let params: IAgentUpdateParams = {
                UUID: agent.UUID,
                Name: agent.Name,
                Description: agent.Description,
                Host: agent.Host,
                IP: agent.IPAddress.IPNet.IP,
                IsActive: agent.IsActive,
                IsPrivate: agent.IsPrivate,
                IsHomeBound: agent.IsHomeBound,
                MinPriority: agent.MinPriority,
                OwnerID: agent.OwnerID,
            }

            AgentService.patchAgent(params).then((response) => {
                props.setIsLoading(true)

                if (response.data) {
                    setAgent(response.data)
                    setOriginalAgent(response.data)
                }

                toast.success("Агент обновлен.")
            }).catch((error: AxiosError<ApiError>) => {
                console.error(error.message)

                if (error.message === "agent is busy") {
                    toast.error("Ошибка обновления. В данный момент агент занят.")
                }

                toast.error("Ошибка обновления агента.")
            }).finally(() => {
                props.setIsLoading(false)
            })
        }
    }

    const handleDelete = () => {
        AgentService.deleteAgentByUUID(agent.UUID).then((response) => {
            props.setIsLoading(true)

            if (response.data) {
                setAgent(response.data)
                setOriginalAgent(response.data)
            }

            toast.success(`Агент ${agent.Name} успешно удален.`)
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error.message)

            if (error.message === "agent is busy") {
                toast.error("Ошибка удаления. В данный момент агент занят.")
            }

            toast.error("Ошибка удаления агента.")
        }).finally(() => {
            props.setIsLoading(false)
        })
    }

    const handleCreate = () => {
        if (agent) {
            let params: IAgentUpdateParams = {
                Name: agent.Name,
                Description: agent.Description,
                Host: agent.Host,
                IP: agent.IPAddress.IPNet.IP,
                IsActive: agent.IsActive,
                IsPrivate: agent.IsPrivate,
                IsHomeBound: agent.IsHomeBound,
                MinPriority: agent.MinPriority,
                OwnerID: agent.OwnerID,
            }

            AgentService.putAgent(params).then((response) => {
                props.setIsLoading(true)

                if (response.data) {
                    setAgent(response.data)
                    setOriginalAgent(response.data)
                }

                toast.success(`Агент ${params.Name} успешно создан.`)
            }).catch((error: AxiosError<ApiError>) => {
                console.error(error.message)
                toast.error("Ошибка создания агента.")
            }).finally(() => {
                props.setIsLoading(false)
            })
        }
    }

    const getStatusValue = () => {
        if (agent === undefined) {
            return "не создан"
        }

        if (agent.UUID) {
            if (agent.IsActive) {
                if (agent.IsConnected) {
                    return <b className={'success'}>соединение установлено</b>
                } else {
                    return <b className={'error'}>соединение не установлено</b>
                }
            } else {
                return "не активен"
            }
        } else {
            return "неизвестен"
        }
    }

    return <div className={'agent-dialog'}>

        {
            !props.isLoading && agent ? <Dialog open={props.uuid === "" || props.uuid != null}
                                          fullWidth
                                          onClose={() => {
                                              setOriginalAgent(defaultAgent)
                                              props.onHide()
                                          }}>
                <DialogTitle>
                    {
                        agent.UUID !== "" ? <Fragment>
                            Настройка агента
                        </Fragment> : <Fragment>
                            Создание агента
                        </Fragment>
                    }
                    {
                        agent.UUID !== "" ? <Fragment>
                            <p className={'agent-uuid'}>{agent.UUID}</p>
                            <p className={'agent-status'}>Статус: {getStatusValue()}</p>
                        </Fragment> : <Fragment/>
                    }
                </DialogTitle>
                <DialogContent>
                    <Grid container rowSpacing={2} columnSpacing={1}>
                        <Grid item xs={12}>
                            <TextField autoFocus
                                       required
                                       margin="dense"
                                       id="name"
                                       name="name"
                                       label="Имя агента"
                                       fullWidth
                                       variant={"filled"}
                                       value={agent.Name}
                                       onChange={(event) => {
                                           setAgent((prevState) => ({
                                               ...prevState,
                                               Name: event.target.value
                                           }))
                                       }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required
                                       margin="dense"
                                       id="description"
                                       name="description"
                                       label="Описание"
                                       fullWidth
                                       variant={"filled"}
                                       value={agent.Description}
                                       onChange={(event) => {
                                           setAgent((prevState) => ({
                                               ...prevState,
                                               Description: event.target.value
                                           }))
                                       }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required
                                       margin="dense"
                                       id="host"
                                       name="host"
                                       label="Хост"
                                       fullWidth
                                       variant={"filled"}
                                       value={agent.Host}
                                       onChange={(event) => {
                                           setAgent((prevState) => ({
                                               ...prevState,
                                               Host: event.target.value
                                           }))
                                       }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required
                                       margin="dense"
                                       id="ip"
                                       name="ip"
                                       label="IP адрес"
                                       fullWidth
                                       variant={"filled"}
                                       error={!ipPortRegex.test(agent.IPAddress.IPNet.IP)}
                                       value={agent.IPAddress.IPNet.IP}
                                       onChange={(event) => {
                                           setAgent((prevState) => ({
                                               ...prevState,
                                               IPAddress: {
                                                   IPNet: {
                                                       IP: event.target.value
                                                   }
                                               }
                                           }))
                                       }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="agent-min-priority-label">Минимальный приоритет</InputLabel>
                                <Select fullWidth labelId="agent-min-priority-label"
                                        id="agent-min-priority"
                                        value={agent.MinPriority}
                                        label="Минимальный приоритет"
                                        onChange={(event) => {
                                            setAgent((prevState) => ({
                                                ...prevState,
                                                MinPriority: event.target.value as JobPriority
                                            }))
                                        }}>
                                    <MenuItem value={JobPriority.JOB_PRIORITY_CRITICAL}>Срочный</MenuItem>
                                    <MenuItem value={JobPriority.JOB_PRIORITY_HIGH}>Высокий</MenuItem>
                                    <MenuItem defaultChecked value={JobPriority.JOB_PRIORITY_MEDIUM}>Средний</MenuItem>
                                    <MenuItem value={JobPriority.JOB_PRIORITY_LOW}>Низкий</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="agent-owner-label">Владелец</InputLabel>
                                <Select fullWidth labelId="agent-owner-label"
                                        id="agent-owner"
                                        value={agent.OwnerID}
                                        label="Владелец"
                                        onChange={(event) => {
                                            setAgent((prevState) => ({
                                                ...prevState,
                                                OwnerID: event.target.value as number
                                            }))
                                        }}>
                                    <MenuItem value={0}>
                                        <p className={'user-option'}>Нет владельца</p>
                                    </MenuItem>
                                    {availableUsers.map((value, index) => {
                                        return <MenuItem key={index} value={value.ID}>
                                            <p className={'user-option'}>{value.FullName} <i>{value.Login}</i></p>
                                        </MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item container xs={12}>
                            <Grid item xs={5}>
                                <Tooltip className={'hint-tooltip'}
                                         title={"Определяет, будет ли сервер производить попытки соединения с агентом."}
                                         placement="top">
                                    <FormControlLabel control={<Switch onChange={(event) => {
                                        setAgent((prevState) => ({
                                            ...prevState,
                                            IsActive: event.target.checked
                                        }))
                                    }} checked={agent.IsActive}/>}
                                                      label="Активен"/>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={5}>
                                <Tooltip className={'hint-tooltip'}
                                         title={"Будут ли другие пользователи иметь доступ к данному агенту."}
                                         placement="top">
                                    <FormControlLabel control={<Switch onChange={(event) => {
                                        setAgent((prevState) => ({
                                            ...prevState,
                                            IsPrivate: event.target.checked
                                        }))
                                    }} checked={agent.IsPrivate}/>} label="Приватный"/>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={2}>
                                <Tooltip className={'hint-tooltip'}
                                         title={"Размещен ли данный агент внутри сети, за NAT или не имеет выделенного адреса. " +
                                             "Включение данной функции ограничит набор инструментов, но снизить вероятность блокировки " +
                                             "Вашего IP провайдерами и целями."}
                                         placement="top">
                                    <FormControlLabel control={<Switch onChange={(event) => {
                                        setAgent((prevState) => ({
                                            ...prevState,
                                            IsHomeBound: event.target.checked
                                        }))
                                    }} checked={agent.IsHomeBound}/>}
                                                      label="NAT"/>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {/*{*/}
                    {/*    agent.UUID !== "" ?*/}
                    {/*        <Button variant={'outlined'}*/}
                    {/*                sx={{marginRight: "10px"}}*/}
                    {/*                disabled={!agent.IsActive && !agent.IsConnected}*/}
                    {/*                color={'warning'}>*/}
                    {/*            Переподключить*/}
                    {/*        </Button> :*/}
                    {/*        <Fragment/>*/}
                    {/*}*/}
                    {
                        agent.UUID !== "" ?
                            <Button onClick={handleDelete} disabled={agent.UUID === ""} color={'error'}
                                    variant={'outlined'}>Удалить</Button> :
                            <Fragment/>
                    }

                    <Button disabled={agent.UUID === ""} startIcon={<RestartAltOutlinedIcon/>} variant={'outlined'}
                            onClick={handleReset}>Вернуть</Button>
                    {
                        agent.UUID !== "" ? <Button variant={'outlined'} onClick={handleUpdate}>Сохранить</Button> :
                            <Button color={'success'} variant={'outlined'} onClick={handleCreate}>Создать</Button>
                    }
                </DialogActions>
            </Dialog> : <Fragment/>
        }
    </div>
}

const ipPortRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/