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
import {Fragment, useEffect, useState} from "react";
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

    const [isLoading, setIsLoading] = useState<boolean>(false)

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
            setIsLoading(true)

            AgentService.getAgentByUUID(props.uuid).then((response) => {
                if (response.data) {
                    setAgent(response.data)
                    setOriginalAgent(response.data)
                }
            }).catch((error: AxiosError<ApiError>) => {
                console.error(error.message)
                toast.error("Ошибка получения данных об агенте")
            }).finally(() => {
                setIsLoading(false)
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
                setIsLoading(true)

                if (response.data) {
                    setAgent(response.data)
                    setOriginalAgent(response.data)
                }
            }).catch((error: AxiosError<ApiError>) => {
                console.error(error.message)
                toast.error("Ошибка обновления агенте")
            }).finally(() => {
                setIsLoading(false)
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
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={isLoading}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
        {
            !isLoading && agent ? <Dialog open={props.uuid === "" || props.uuid != null}
                                          fullWidth
                                          onClose={() => {
                                              setOriginalAgent(defaultAgent)
                                              props.onHide()
                                          }}>
                <DialogTitle>
                    {
                        agent.UUID !== "" ? <Fragment>
                            <h4>Настройка агента</h4>
                            <p className={'agent-uuid'}>{agent.UUID}</p>
                        </Fragment> : <h4>Создание агента</h4>
                    }
                    <p className={'agent-status'}>Статус: {getStatusValue()}</p>
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
                                    {availableUsers.map((value) => {
                                        return <MenuItem value={value.ID}>
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
                    <Button disabled={agent.UUID === ""} color={'error'} variant={'outlined'}>Удалить</Button>
                    <Button disabled={agent.UUID === ""} startIcon={<RestartAltOutlinedIcon/>} variant={'outlined'}
                            onClick={handleReset}>Вернуть</Button>
                    <Button variant={'outlined'} onClick={handleUpdate}>Сохранить</Button>
                </DialogActions>
            </Dialog> : <Fragment/>
        }
    </div>
}

const ipPortRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/