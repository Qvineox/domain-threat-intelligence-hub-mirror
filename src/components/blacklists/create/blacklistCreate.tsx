import {IBlacklistedDomain} from "@/entities/blacklists/domain.ts";
import {Fragment, useEffect, useState} from "react";
import {IBlacklistedIP} from "@/entities/blacklists/ip.ts";
import {IBlacklistedURL} from "@/entities/blacklists/url.ts";
import {
    Backdrop,
    Button, CircularProgress,
    FormControl, InputLabel, MenuItem, Select,
    TextField,
} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import BlacklistService from "@/services/blacklistService.ts";
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {toast} from "react-toastify";
import {IBlacklistedSource} from "@/entities/blacklists/source.ts";
import {IBlacklistedEmail} from "@/entities/blacklists/email.ts";


interface IBlacklistCreateParams {
    Value: string
    Description: string
    SourceID?: number
}

export function BlacklistCreate() {
    const [domainsToCreate, setDomainsToCreate] = useState<Array<IBlacklistedDomain>>([]);
    const [URLsToCreate, setURLsToCreate] = useState<Array<IBlacklistedURL>>([]);
    const [IPsToCreate, setIPsToCreate] = useState<Array<IBlacklistedIP>>([]);
    const [EmailsToCreate, setEmailsToCreate] = useState<Array<IBlacklistedEmail>>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hostTypeToCreate, setHostTypeToCreate] = useState<"ip" | "domain" | "url" | "email">("ip")

    const [creationParams, setCreationParams] = useState<IBlacklistCreateParams>({
        Value: "",
        Description: "",
        SourceID: 1
    })

    const [sources, setSources] = useState<Array<IBlacklistedSource>>([])
    useEffect(() => {
        setIsLoading(true)

        BlacklistService.getAllSources().then(r => {
            setSources(r.data)
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error)
            toast.error("Ошибка получения списка источников!")
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Внесение блокировок`
    }, [])

    const addHostToBlacklist = () => {
        switch (hostTypeToCreate) {
            case "ip":
                if (!ipPortRegex.test(creationParams.Value)) {
                    toast.error("Некорректный IP адрес!")
                    return
                }

                // @ts-ignore
                setIPsToCreate(prevState => ([
                    ...prevState,
                    {
                        IPAddress: creationParams.Value,
                        Description: creationParams.Description,
                        SourceID: creationParams.SourceID
                    }
                ]))
                break
            case "domain":
                // @ts-ignore
                setDomainsToCreate(prevState => ([
                    ...prevState,
                    {
                        URN: creationParams.Value,
                        Description: creationParams.Description,
                        SourceID: creationParams.SourceID
                    }
                ]))
                break
            case "url":
                if (!urlRegex.test(creationParams.Value)) {
                    toast.error("Некорректный URL!")
                    return
                }

                // @ts-ignore
                setURLsToCreate(prevState => ([
                    ...prevState,
                    {
                        URL: creationParams.Value,
                        Description: creationParams.Description,
                        SourceID: creationParams.SourceID
                    }
                ]))
                break
            case "email":
                if (!creationParams.Value.includes("@")) {
                    toast.error("Некорректный почтовый адрес!")
                    return
                }

                // @ts-ignore
                setEmailsToCreate(prevState => ([
                    ...prevState,
                    {
                        Email: creationParams.Value,
                        Description: creationParams.Description,
                        SourceID: creationParams.SourceID
                    }
                ]))
                break
        }

        setCreationParams(prevState => ({
            ...prevState,
            Value: ""
        }))
    }

    const addAllFromClipboard = async () => {
        let clipboardValue = await navigator.clipboard.readText();

        if (clipboardValue.length === 0) {
            return
        }

        clipboardValue = clipboardValue.replace("[.]", ".")
        clipboardValue = clipboardValue.replace(";", "\n")
        clipboardValue = clipboardValue.replace("\t", "\n")

        let hosts = clipboardValue.split("\n")

        hosts.forEach((value) => {
            let h = value.trim()

            if (h.includes("//")) {
                // @ts-ignore
                setURLsToCreate(prevState => ([
                    ...prevState,
                    {
                        URL: h,
                        Description: creationParams.Description,
                        SourceID: creationParams.SourceID ?? 5
                    }
                ]))
            } else if (cidrRegex.test(h)) {
                // @ts-ignore
                setIPsToCreate(prevState => ([
                    ...prevState,
                    {
                        IPAddress: h,
                        Description: creationParams.Description,
                        SourceID: creationParams.SourceID ?? 5
                    }
                ]))
            } else if (h.includes("@")) {
                // @ts-ignore
                setEmailsToCreate(prevState => ([
                    ...prevState,
                    {
                        Email: h,
                        Description: creationParams.Description,
                        SourceID: creationParams.SourceID ?? 5
                    }
                ]))
            } else if (h.includes(".")) {
                // @ts-ignore
                setDomainsToCreate(prevState => ([
                    ...prevState,
                    {
                        URN: h,
                        Description: creationParams.Description,
                        SourceID: creationParams.SourceID ?? 5
                    }
                ]))
            }
        })
    }

    const saveAll = () => {
        saveDomains()
        saveIPs()
        saveURLs()
        saveEmails()
    }

    const saveDomains = () => {
        if (domainsToCreate.length === 0) {
            return
        }

        BlacklistService.putDomains(domainsToCreate).then(() => {
            setDomainsToCreate([])
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error)
            toast.error("Ошибка сохранения доменов!")
        })
    }

    const saveIPs = () => {
        if (IPsToCreate.length === 0) {
            return
        }

        BlacklistService.putIPs(IPsToCreate).then(() => {
            setIPsToCreate([])
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error)
            toast.error("Ошибка сохранения IP адресов!")
        })
    }

    const saveURLs = () => {
        if (URLsToCreate.length === 0) {
            return
        }

        BlacklistService.putURLs(URLsToCreate).then(() => {
            setURLsToCreate([])
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error)
            toast.error("Ошибка сохранения URL!")
        })
    }

    const saveEmails = () => {
        if (EmailsToCreate.length === 0) {
            return
        }

        BlacklistService.putEmails(EmailsToCreate).then(() => {
            setEmailsToCreate([])
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error)
            toast.error("Ошибка сохранения почтовых адресов!")
        })
    }

    return <div className={"blacklists_create"}>
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={isLoading}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
        <div className={"blacklists_create_form"}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl fullWidth variant={'outlined'}>
                    <TextField id={"blacklist-value"}
                               label={"Значение"}
                               variant={"outlined"}
                               size={"small"}
                               type={"search"}
                               sx={{marginTop: "20px"}}
                               value={creationParams.Value ?? ""}
                               onKeyUp={(e) => {
                                   if (e.key == 'Enter') {
                                       addHostToBlacklist()
                                   }
                               }}
                               onChange={(event) => {
                                   setCreationParams(prevState => ({
                                       ...prevState,
                                       Value: event.target.value
                                   }))
                               }}
                    />
                    <TextField id={"blacklist-description"}
                               label={"Описание"}
                               variant={"outlined"}
                               size={"small"}
                               type={"search"}
                               sx={{marginTop: "10px"}}
                               value={creationParams.Description ?? ""}
                               onKeyUp={(e) => {
                                   if (e.key == 'Enter') {
                                       addHostToBlacklist()
                                   }
                               }}
                               onChange={(event) => {
                                   setCreationParams(prevState => ({
                                       ...prevState,
                                       Description: event.target.value
                                   }))
                               }}
                    />
                    <FormControl sx={{marginTop: "10px"}} fullWidth>
                        <InputLabel id="blacklist_source-label">Источник</InputLabel>
                        <Select fullWidth labelId="blacklist_source-label"
                                id="blacklist_source"
                                value={creationParams.SourceID}
                                label="Источник"
                                size={'small'}
                                onChange={(event) => {
                                    setCreationParams((prevState) => ({
                                        ...prevState,
                                        SourceID: event.target.value as number
                                    }))
                                }}>
                            {sources.map((value, index) => {
                                return <MenuItem key={index} value={value.ID}>
                                    <p className={'source-option'}>{value.Name}</p>
                                </MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <hr/>
                    <FormControl sx={{marginTop: "10px"}} fullWidth>
                        <InputLabel id="blacklist_type-label">Тип узла</InputLabel>
                        <Select fullWidth labelId="blacklist_type-label"
                                id="blacklist_type"
                                value={hostTypeToCreate}
                                label="Тип узла"
                                size={'small'}
                                onChange={(event) => {
                                    setHostTypeToCreate(event.target.value as "ip" | "domain" | "url" | "email")
                                }}>
                            <MenuItem value={'ip'}>
                                IP адрес
                            </MenuItem>
                            <MenuItem value={'domain'}>
                                Домен
                            </MenuItem>
                            <MenuItem value={'url'}>
                                URL
                            </MenuItem>
                            <MenuItem value={'email'}>
                                EMail
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <hr/>
                    <div className="create-buttons">
                        <Button fullWidth
                                sx={{marginTop: '10px'}}
                                disabled={creationParams.Value.length === 0}
                                onClick={addHostToBlacklist}
                                variant={"outlined"} color={"info"}>
                            Добавить
                        </Button>
                        <Button fullWidth
                                sx={{marginTop: '10px'}}
                                onClick={addAllFromClipboard}
                                variant={"outlined"} color={"info"}>
                            Извлечь все из буфера обмена
                        </Button>
                        <Button fullWidth
                                sx={{marginTop: '20px'}}
                                onClick={saveAll}
                                variant={"outlined"} color={"success"}>
                            Сохранить все
                        </Button>
                    </div>
                </FormControl>
            </LocalizationProvider>
        </div>
        <div className={"blacklists_create_content"}>
            <h2>Новые записи к блокировке</h2>
            <h3>Домены к блокировке (всего {domainsToCreate.length})</h3>
            {
                domainsToCreate.length > 0 ? <Fragment>
                    <ol>
                        {
                            domainsToCreate.map((value, index) => {
                                return <li key={index}>
                                    <h4>{value.URN}</h4>
                                    <p>{value.Description}</p>
                                </li>
                            })
                        }
                    </ol>
                    <Button onClick={saveDomains}
                            variant={"outlined"}
                            size={'small'}
                            color={"success"}>
                        Сохранить домены
                    </Button>
                </Fragment> : <p className={'hint'}>Пока пусто.</p>
            }
            <h3>IP адреса к блокировке (всего {IPsToCreate.length})</h3>
            {
                IPsToCreate.length > 0 ? <Fragment>
                    <ol>
                        {
                            IPsToCreate.map((value, index) => {
                                return <li key={index}>
                                    <h4>{value.IPAddress}</h4>
                                    <p>{value.Description}</p>
                                </li>
                            })
                        }
                    </ol>
                    <Button onClick={saveIPs}
                            variant={"outlined"}
                            size={'small'}
                            color={"success"}>
                        Сохранить IP адреса
                    </Button>
                </Fragment> : <p className={'hint'}>Пока пусто.</p>
            }
            <h3>URL к блокировке (всего {URLsToCreate.length})</h3>
            {
                URLsToCreate.length > 0 ? <Fragment>
                    <ol>
                        {
                            URLsToCreate.map((value, index) => {
                                return <li key={index}>
                                    <h4>{value.URL}</h4>
                                    <p>{value.Description}</p>
                                </li>
                            })
                        }
                    </ol>
                    <Button onClick={saveURLs}
                            variant={"outlined"}
                            size={'small'}
                            color={"success"}>
                        Сохранить URL ссылки
                    </Button>
                </Fragment> : <p className={'hint'}>Пока пусто.</p>
            }
            <h3>Почтовые адреса к блокировке (всего {EmailsToCreate.length})</h3>
            {
                EmailsToCreate.length > 0 ? <Fragment>
                    <ol>
                        {
                            EmailsToCreate.map((value, index) => {
                                return <li key={index}>
                                    <h4>{value.Email}</h4>
                                    <p>{value.Description}</p>
                                </li>
                            })
                        }
                    </ol>
                    <Button onClick={saveEmails}
                            variant={"outlined"}
                            size={'small'}
                            color={"success"}>
                        Сохранить почтовые адреса
                    </Button>
                </Fragment> : <p className={'hint'}>Пока пусто.</p>
            }
        </div>
    </div>

}

const ipPortRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
const cidrRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/;