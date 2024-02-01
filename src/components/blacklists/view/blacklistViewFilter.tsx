import BlacklistService, {IBlacklistedSearchFilter} from "@/services/blacklistService.ts";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {IBlacklistedSource} from "@/entities/blacklists/source.ts";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {
    Autocomplete,
    Button,
    ButtonGroup,
    FormControl,
    FormControlLabel, IconButton, Switch,
    TextField, Tooltip
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GetAppIcon from '@mui/icons-material/GetApp';
import {useNavigate} from "react-router-dom";
import {ApiError} from "@/http/api.ts";
import {AxiosError} from "axios";
import {toast} from "react-toastify";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface IBlacklistsViewerFilterProps {
    filter: IBlacklistedSearchFilter
    setFilter: Dispatch<SetStateAction<IBlacklistedSearchFilter>>
    resetFilter: () => void
    onSearch: (clear: boolean) => void
}

export default function BlacklistsViewerFilter(props: IBlacklistsViewerFilterProps) {
    const navigate = useNavigate()

    const [sources, setSources] = useState<Array<IBlacklistedSource>>([])
    const [selectedSourceOptions, setSelectedSourceOptions] = useState<Array<{ "label": string, "value": number }>>([])

    useEffect(() => {
        BlacklistService.getAllSources().then(r => {
            setSources(r.data)
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error)
            toast.error("Ошибка получения списка источников!")
        })
    }, [])

    return <div className={"blacklists_viewer_filter"}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl className={"blacklists_viewer_filter_form"} fullWidth variant={'outlined'}>
                <TextField id={"search-string"}
                           label={"Поиск по значению"}
                           variant={"outlined"}
                           size={"small"}
                           type={"search"}
                           sx={{marginTop: "20px"}}
                           value={props.filter.SearchString ?? ""}
                           onChange={(event) => {
                               props.setFilter(prevState => ({
                                   ...prevState,
                                   SearchString: event.target.value
                               }))
                           }}
                />
                <TextField id={"import-event-id"}
                           label={"Поиск по ID импорта"}
                           variant={"outlined"}
                           size={"small"}
                           inputProps={{inputMode: 'numeric'}}
                           value={props.filter.ImportEventID || ""}
                           onChange={(event) => {
                               event.preventDefault()

                               if (event.target.value.length > 0) {
                                   const value = parseInt(event.target.value)

                                   if (!isNaN(value)) {
                                       console.debug(value)

                                       props.setFilter(prevState => ({
                                           ...prevState,
                                           ImportEventID: value
                                       }))
                                   }
                               } else {
                                   props.setFilter(prevState => ({
                                       ...prevState,
                                       ImportEventID: 0
                                   }))
                               }
                           }}
                />
                <Autocomplete disablePortal
                              multiple
                              limitTags={3}
                              id={"host_types"}
                              size={"small"}
                              value={selectedSourceOptions}
                              isOptionEqualToValue={((option, value) => {
                                  return option.value === value.value
                              })}
                              options={sources?.map((value) => {
                                  return {"label": value.Name, "value": value.ID}
                              })}
                              onChange={(_event, value) => {
                                  if (value) {
                                      setSelectedSourceOptions(value)
                                      props.setFilter(prevState => ({
                                          ...prevState,
                                          SourceIDs: value.map((v) => v.value)
                                      }))
                                  }
                              }}
                              renderInput={(params) => <TextField {...params} label="Типы источников (все)"/>}
                />
                <hr/>
                <DatePicker label="Обнаружены после"
                            value={props.filter.CreatedAfter ?? null}
                            format={"DD/MM/YYYY"}
                            onChange={(value) => {
                                if (value) {
                                    props.setFilter(prevState => ({
                                        ...prevState,
                                        CreatedAfter: value
                                    }))
                                } else {
                                    props.setFilter(prevState => ({
                                        ...prevState,
                                        CreatedAfter: null
                                    }))
                                }
                            }}
                />
                <DatePicker label="Обнаружены до"
                            value={props.filter.CreatedBefore ?? null}
                            format={"DD/MM/YYYY"}
                            onChange={(value) => {
                                if (value) {
                                    props.setFilter(prevState => ({
                                        ...prevState,
                                        CreatedBefore: value
                                    }))
                                } else {
                                    props.setFilter(prevState => ({
                                        ...prevState,
                                        CreatedBefore: null
                                    }))
                                }
                            }}
                />
                <hr/>
                <Tooltip arrow placement="right-start" title={"Удаленные хосты не будут участвовать в выборке."}>
                    <FormControlLabel label="Только активные"
                                      control={<Switch defaultChecked/>}
                                      onChange={(_event, checked) => {
                                          props.setFilter(prevState => ({
                                              ...prevState,
                                              IsActive: checked
                                          }))
                                      }}
                    />
                </Tooltip>
                <div className="search-buttons">
                    <Button fullWidth onClick={() => props.onSearch(true)} variant={"outlined"} color={"info"}>
                        Поиск
                    </Button>
                    <IconButton color={'primary'} onClick={props.resetFilter}>
                        <RestartAltIcon/>
                    </IconButton>
                </div>
                <ButtonGroup fullWidth variant="outlined">
                    <Button color={"info"}
                            startIcon={<GetAppIcon/>}
                            onClick={() => {
                                navigate("/blacklists/import")
                            }}>
                        Импорт
                    </Button>
                    <Button color={"info"}
                            startIcon={<FileUploadIcon/>}
                            onClick={() => {
                                let href = `/blacklists/export`
                                let params: Array<string> = []

                                if (props.filter.ImportEventID !== 0) {
                                    params.push(`import_event_id=${props.filter.ImportEventID}`)
                                }

                                if (props.filter.SourceIDs && props.filter.SourceIDs.length > 0) {
                                    params.push(`source_ids=${props.filter.SourceIDs.join(",")}`)
                                }

                                navigate(`${href}?${params.join("&")}`)
                            }}>
                        Экспорт
                    </Button>
                </ButtonGroup>
            </FormControl>
        </LocalizationProvider>
    </div>
}