import {Backdrop, Button, CircularProgress, FormControlLabel, Switch, TextField, Tooltip} from "@mui/material";
import {Fragment, useContext, useEffect, useState} from "react";
import {IDynamicConfig} from "@/entities/dynamicConfig/dynamicConfig.ts";
import SystemStateService from "@/services/systemStateService.ts";
import {ApiError} from "@/http/api.ts";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {Context} from "@/context.ts";
import {observer} from "mobx-react-lite";

const defaultDynamicConfig: IDynamicConfig = {
    SMTP: {
        Enabled: false,
        Host: "",
        Port: 25,
        From: "",
        UseAuth: false,
        User: "",
        Password: "",
        SSL: false,
    },
    Integrations: {
        Naumen: {
            Enabled: false,
            URL: "",
            ClientKey: "",
            ClientID: 0,
            ClientGroupID: 0,
            BlacklistsService: {
                SLM: 0,
                AgreementID: 0,
                CallType: "",
                Types: [],
            }
        }
    }
}

function Configuration() {
    const [editSystemState, setEditSystemState] = useState<IDynamicConfig>(defaultDynamicConfig)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const {auth} = useContext(Context)

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Параметры`
        handleConfigFetch()
    }, []);

    const handleConfigFetch = () => {
        setIsLoading(true)

        SystemStateService.getSystemState().then((response) => {
            if (response.data) {
                setEditSystemState(response.data)
            }
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error.response?.data.ErrorMessage)
            toast.error("Ошибка получения динамической конфигурации.")
        }).finally(() => {
            setIsLoading(false)
        })
    }
    const handleSMTPConfigUpdate = () => {
        setIsLoading(true)

        SystemStateService.updateSMTPConfig(
            editSystemState.SMTP.Enabled,
            editSystemState.SMTP.Host,
            editSystemState.SMTP.Port,
            editSystemState.SMTP.User,
            editSystemState.SMTP.From,
            editSystemState.SMTP.Password,
            editSystemState.SMTP.SSL,
            editSystemState.SMTP.UseAuth,
        ).then(() => {
            toast.success("Конфигурация SMTP обновлена")
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error.response?.data.ErrorMessage)
            toast.error("Ошибка обновления конфигурации.")
        }).finally(() => {
            handleConfigFetch()
        })
    }

    const handleNaumenConfigUpdate = () => {
        SystemStateService.updateNaumenConfig(
            editSystemState.Integrations.Naumen.Enabled,
            editSystemState.Integrations.Naumen.URL,
            editSystemState.Integrations.Naumen.ClientID,
            editSystemState.Integrations.Naumen.ClientGroupID,
            editSystemState.Integrations.Naumen.ClientKey,
        ).then(() => {
            toast.success("Конфигурация интеграции Naumen обновлена")
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error.response?.data.ErrorMessage)
            toast.error("Ошибка обновления конфигурации.")
        }).finally(() => {
            handleConfigFetch()
        })
    }

    const handleNaumenServiceConfigUpdate = () => {
        SystemStateService.updateNaumenServiceConfig(
            editSystemState.Integrations.Naumen.BlacklistsService.AgreementID,
            editSystemState.Integrations.Naumen.BlacklistsService.SLM,
            editSystemState.Integrations.Naumen.BlacklistsService.CallType,
            editSystemState.Integrations.Naumen.BlacklistsService.Types ? editSystemState.Integrations.Naumen.BlacklistsService.Types : [],
        ).then(() => {
            toast.success("Конфигурация интеграции Naumen обновлена")
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error.response?.data.ErrorMessage)
            toast.error("Ошибка обновления конфигурации.")
        }).finally(() => {
            handleConfigFetch()
        })
    }

    const handleConfigReset = () => {
        if (confirm("Вы уверены? Сделанного не воротишь.")) {
            SystemStateService.resetConfig()
                .then(() => {
                    toast.success("Конфигурация успешно сброшена")
                })
                .catch((error: AxiosError<ApiError>) => {
                    console.error(error.response?.data.ErrorMessage)
                    toast.error("Ошибка сброса конфигурации.")
                })
                .finally(() => {
                    handleConfigFetch()
                })
        }
    }

    return <div className={"configuration"}>
        {
            editSystemState ? <Fragment>
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={isLoading}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                <div className="configuration_config-block">
                    <h2>Настройка SMTP</h2>
                    <FormControlLabel control={<Switch onChange={(event) => {
                        setEditSystemState(prevState => ({
                            ...prevState,
                            SMTP: {
                                ...prevState.SMTP,
                                Enabled: event.target.checked
                            }
                        }))
                    }} checked={editSystemState.SMTP.Enabled}/>} label="Активен"/>
                    <hr/>
                    <TextField required label={'Адрес сервера'}
                               disabled={!editSystemState.SMTP.Enabled}
                               value={editSystemState.SMTP.Host}
                               onChange={(event) => {
                                   setEditSystemState(prevState => ({
                                       ...prevState,
                                       SMTP: {
                                           ...prevState.SMTP,
                                           Host: event.target.value
                                       }
                                   }))
                               }}
                               variant={'filled'}
                               size={'small'}
                               fullWidth/>
                    <TextField required label={'Порт'}
                               disabled={!editSystemState.SMTP.Enabled}
                               type={'number'}
                               value={editSystemState.SMTP.Port ? editSystemState.SMTP.Port : ""}
                               onChange={(event) => {
                                   setEditSystemState(prevState => ({
                                       ...prevState,
                                       SMTP: {
                                           ...prevState.SMTP,
                                           Port: parseInt(event.target.value)
                                       }
                                   }))
                               }}
                               sx={{marginBottom: '20px'}}
                               variant={'filled'}
                               size={'small'}
                               fullWidth/>
                    <TextField label={'Отправитель'}
                               disabled={!editSystemState.SMTP.Enabled}
                               value={editSystemState.SMTP.From}
                               onChange={(event) => {
                                   setEditSystemState(prevState => ({
                                       ...prevState,
                                       SMTP: {
                                           ...prevState.SMTP,
                                           From: event.target.value
                                       }
                                   }))
                               }}
                               variant={'filled'}
                               size={'small'}
                               sx={{marginBottom: '20px'}}
                               fullWidth required/>
                    <FormControlLabel control={<Switch onChange={(event) => {
                        setEditSystemState(prevState => ({
                            ...prevState,
                            SMTP: {
                                ...prevState.SMTP,
                                UseAuth: event.target.checked
                            }
                        }))
                    }} checked={editSystemState.SMTP.UseAuth}/>} label="Авторизация"/>
                    <TextField label={'Пользователь'}
                               disabled={!editSystemState.SMTP.Enabled || !editSystemState.SMTP.UseAuth}
                               value={editSystemState.SMTP.User}
                               onChange={(event) => {
                                   setEditSystemState(prevState => ({
                                       ...prevState,
                                       SMTP: {
                                           ...prevState.SMTP,
                                           User: event.target.value
                                       }
                                   }))
                               }}
                               variant={'filled'}
                               size={'small'}
                               fullWidth/>
                    <TextField label={'Пароль'} type={'password'}
                               disabled={!editSystemState.SMTP.Enabled || !editSystemState.SMTP.UseAuth}
                               value={editSystemState.SMTP.Password}
                               onChange={(event) => {
                                   setEditSystemState(prevState => ({
                                       ...prevState,
                                       SMTP: {
                                           ...prevState.SMTP,
                                           Password: event.target.value
                                       }
                                   }))
                               }}
                               sx={{marginBottom: '20px'}}
                               variant={'filled'}
                               size={'small'}
                               fullWidth/>

                    <FormControlLabel label="SSL" control={<Switch disabled={!editSystemState.SMTP.Enabled}
                                                                   onChange={(event) => {
                                                                       setEditSystemState(prevState => ({
                                                                           ...prevState,
                                                                           SMTP: {
                                                                               ...prevState.SMTP,
                                                                               SSL: event.target.checked
                                                                           }
                                                                       }))
                                                                   }}
                                                                   checked={editSystemState.SMTP.SSL}/>}
                    />
                    <Button sx={{marginTop: "10px"}}
                            variant={'outlined'}
                            disabled={!auth.hasPermissionOrAdmin(6002)}
                            onClick={handleSMTPConfigUpdate}>
                        {auth.hasPermissionOrAdmin(6002) ? "Обновить" : "Недостаточно прав для изменения"}
                    </Button>
                </div>
                <div className="configuration_config-block">
                    <h2>Настройка интеграции Naumen</h2>
                    <FormControlLabel control={
                        <Switch onChange={(event) => {
                            setEditSystemState(prevState => ({
                                ...prevState,
                                Integrations: {
                                    ...prevState.Integrations,
                                    Naumen: {
                                        ...prevState.Integrations.Naumen,
                                        Enabled: event.target.checked
                                    }
                                }
                            }))
                        }} checked={editSystemState.Integrations.Naumen.Enabled}/>
                    }
                                      label="Активен"/>
                    <hr/>
                    <Tooltip title={"Полный адрес сервера со схемой, например: https://naumen.example.ru"}
                             placement={"right"}>
                        <TextField label={'Адрес сервера'}
                                   disabled={!editSystemState.Integrations.Naumen.Enabled}
                                   value={editSystemState.Integrations.Naumen.URL}
                                   onChange={(event) => {
                                       setEditSystemState(prevState => ({
                                           ...prevState,
                                           Integrations: {
                                               ...prevState.Integrations,
                                               Naumen: {
                                                   ...prevState.Integrations.Naumen,
                                                   URL: event.target.value
                                               }
                                           }
                                       }))
                                   }}
                                   sx={{marginBottom: '20px'}}
                                   variant={'filled'}
                                   size={'small'}
                                   fullWidth/>
                    </Tooltip>
                    <TextField label={'ID клиента'}
                               disabled={!editSystemState.Integrations.Naumen.Enabled}
                               type={'number'}
                               value={editSystemState.Integrations.Naumen.ClientID ? editSystemState.Integrations.Naumen.ClientID : ""}
                               onChange={(event) => {
                                   setEditSystemState(prevState => ({
                                       ...prevState,
                                       Integrations: {
                                           ...prevState.Integrations,
                                           Naumen: {
                                               ...prevState.Integrations.Naumen,
                                               ClientID: parseInt(event.target.value)
                                           }
                                       }
                                   }))
                               }}
                               variant={'filled'}
                               size={'small'}
                               fullWidth/>
                    <TextField label={'ID группы клиента'}
                               disabled={!editSystemState.Integrations.Naumen.Enabled}
                               type={'number'}
                               value={editSystemState.Integrations.Naumen.ClientGroupID ? editSystemState.Integrations.Naumen.ClientGroupID : ""}
                               onChange={(event) => {
                                   setEditSystemState(prevState => ({
                                       ...prevState,
                                       Integrations: {
                                           ...prevState.Integrations,
                                           Naumen: {
                                               ...prevState.Integrations.Naumen,
                                               ClientGroupID: parseInt(event.target.value)
                                           }
                                       }
                                   }))
                               }}
                               variant={'filled'}
                               size={'small'}
                               fullWidth/>
                    <TextField label={'API ключ клиента'}
                               disabled={!editSystemState.Integrations.Naumen.Enabled}
                               value={editSystemState.Integrations.Naumen.ClientKey}
                               onChange={(event) => {
                                   setEditSystemState(prevState => ({
                                       ...prevState,
                                       Integrations: {
                                           ...prevState.Integrations,
                                           Naumen: {
                                               ...prevState.Integrations.Naumen,
                                               ClientKey: event.target.value
                                           }
                                       }
                                   }))
                               }}
                               type={'password'}
                               variant={'filled'}
                               size={'small'} fullWidth/>
                    <Button sx={{marginTop: "10px", marginBottom: "30px"}}
                            variant={'outlined'}
                            disabled={!auth.hasPermissionOrAdmin(6002)}
                            onClick={handleNaumenConfigUpdate}>
                        {auth.hasPermissionOrAdmin(6002) ? "Обновить" : "Недостаточно прав для изменения"}
                    </Button>
                    <h2>Параметры заявки</h2>
                    <hr/>
                    <TextField label={'ID согласования'}
                               disabled={!editSystemState.Integrations.Naumen.Enabled}
                               type={'number'}
                               value={editSystemState.Integrations.Naumen.BlacklistsService.AgreementID ? editSystemState.Integrations.Naumen.BlacklistsService.AgreementID : ""}
                               onChange={(event) => {
                                   setEditSystemState(prevState => ({
                                       ...prevState,
                                       Integrations: {
                                           ...prevState.Integrations,
                                           Naumen: {
                                               ...prevState.Integrations.Naumen,
                                               BlacklistsService: {
                                                   ...prevState.Integrations.Naumen.BlacklistsService,
                                                   AgreementID: parseInt(event.target.value)
                                               }
                                           }
                                       }
                                   }))
                               }}
                               variant={'filled'}
                               size={'small'}
                               fullWidth/>
                    <TextField label={'SLM'}
                               disabled={!editSystemState.Integrations.Naumen.Enabled}
                               type={'number'}
                               value={editSystemState.Integrations.Naumen.BlacklistsService.SLM ? editSystemState.Integrations.Naumen.BlacklistsService.SLM : ""}
                               onChange={(event) => {
                                   setEditSystemState(prevState => ({
                                       ...prevState,
                                       Integrations: {
                                           ...prevState.Integrations,
                                           Naumen: {
                                               ...prevState.Integrations.Naumen,
                                               BlacklistsService: {
                                                   ...prevState.Integrations.Naumen.BlacklistsService,
                                                   SLM: parseInt(event.target.value)
                                               }
                                           }
                                       }
                                   }))
                               }}
                               variant={'filled'}
                               size={'small'}
                               fullWidth/>
                    <TextField label={'Тип вызова (CallType)'}
                               disabled={!editSystemState.Integrations.Naumen.Enabled}
                               value={editSystemState.Integrations.Naumen.BlacklistsService.CallType}
                               onChange={(event) => {
                                   setEditSystemState(prevState => ({
                                       ...prevState,
                                       Integrations: {
                                           ...prevState.Integrations,
                                           Naumen: {
                                               ...prevState.Integrations.Naumen,
                                               BlacklistsService: {
                                                   ...prevState.Integrations.Naumen.BlacklistsService,
                                                   CallType: event.target.value
                                               }
                                           }
                                       }
                                   }))
                               }}
                               variant={'filled'}
                               size={'small'}
                               fullWidth/>
                    <TextField label={'Типы хостов'}
                               disabled={!editSystemState.Integrations.Naumen.Enabled}
                               value={editSystemState.Integrations.Naumen.BlacklistsService.Types ? editSystemState.Integrations.Naumen.BlacklistsService.Types.join(",") : []}
                               onChange={(event) => {
                                   setEditSystemState(prevState => ({
                                       ...prevState,
                                       Integrations: {
                                           ...prevState.Integrations,
                                           Naumen: {
                                               ...prevState.Integrations.Naumen,
                                               BlacklistsService: {
                                                   ...prevState.Integrations.Naumen.BlacklistsService,
                                                   Types: event.target.value.split(",")
                                               }
                                           }
                                       }
                                   }))
                               }}
                               placeholder={"id, domain, url, email"}
                               variant={'filled'}
                               size={'small'} fullWidth/>
                    <Button sx={{marginTop: "10px"}}
                            variant={'outlined'}
                            disabled={!auth.hasPermissionOrAdmin(6002)}
                            onClick={handleNaumenServiceConfigUpdate}>
                        {auth.hasPermissionOrAdmin(6002) ? "Обновить" : "Недостаточно прав для изменения"}
                    </Button>

                </div>
            </Fragment> : <Fragment/>
        }
        <Button onClick={handleConfigReset}
                disabled={!auth.hasPermissionOrAdmin(6003)}
                className={'save-configuration'}
                color={'warning'}
                variant={'outlined'}>
            Восстановить исходные настройки
        </Button>
    </div>
}

export default observer(Configuration)