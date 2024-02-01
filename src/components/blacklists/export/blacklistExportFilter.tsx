import {Dispatch, SetStateAction, useEffect, useState} from "react";
import BlacklistService, {IBlacklistedExportFilter} from "@/services/blacklistService.ts";
import {IBlacklistedSource} from "@/entities/blacklists/source.ts";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {
    Autocomplete,
    Button,
    FormControl,
    FormControlLabel,
    Switch,
    TextField
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {toast} from "react-toastify";


interface IBlacklistExportFilterProps {
    filter: IBlacklistedExportFilter
    setFilter: Dispatch<SetStateAction<IBlacklistedExportFilter>>
    onExport: () => void
}

export default function BlacklistExportFilter(props: IBlacklistExportFilterProps) {
    const [sources, setSources] = useState<Array<IBlacklistedSource>>([])
    const [selectedSourceOptions, setSelectedSourceOptions] = useState<Array<{ "label": string, "value": number }>>([])

    useEffect(() => {
        BlacklistService.getAllSources()
            .then(r => {
                setSources(r.data)
            })
            .catch((error: AxiosError<ApiError>) => {
                console.error(error)
                toast.error("Ошибка получения списка источников!")
            })
    }, [])

    return <div className={"blacklists_exporter_filter"}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl className={"blacklists_viewer_filter_form"} fullWidth variant={'outlined'}>
                <TextField id={"search-string"}
                           label={"ID события импорта"}
                           variant={"outlined"}
                           size={"small"}
                           type={"number"}
                           sx={{marginTop: "20px"}}
                           value={props.filter.ImportEventID ?? ""}
                           onChange={(event) => {
                               if (event.target.value.length > 0) {
                                   props.setFilter({
                                       SourceIDs: [],
                                       CreatedAfter: null,
                                       CreatedBefore: null,
                                       OnlyNew: true,
                                       IsActive: true,
                                       ImportEventID: parseInt(event.target.value)
                                   })

                                   setSelectedSourceOptions([])
                               } else {
                                   props.setFilter(prevState => ({
                                       ...prevState,
                                       ImportEventID: undefined
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
                              disabled={props.filter.ImportEventID !== undefined}
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
                <DatePicker label="Созданы после"
                            value={props.filter.CreatedAfter ?? null}
                            disabled={props.filter.ImportEventID !== undefined}
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
                <DatePicker label="Созданы до"
                            value={props.filter.CreatedBefore ?? null}
                            disabled={props.filter.ImportEventID !== undefined}
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
                <FormControlLabel label="Только активные"
                                  control={<Switch defaultChecked/>}
                                  disabled={props.filter.ImportEventID !== undefined}
                                  onChange={(_event, checked) => {
                                      props.setFilter(prevState => ({
                                          ...prevState,
                                          IsActive: checked
                                      }))
                                  }}
                />
                <FormControlLabel label="Только новые"
                                  control={<Switch defaultChecked/>}
                                  disabled={props.filter.ImportEventID !== undefined}
                                  onChange={(_event, checked) => {
                                      props.setFilter(prevState => ({
                                          ...prevState,
                                          OnlyNew: checked
                                      }))
                                  }}
                />
                <Button onClick={props.onExport} variant={"outlined"} color={"info"}>
                    Экспортировать в CSV
                </Button>
                <Button variant={"outlined"} color={"info"} disabled>
                    Отправить в Naumen
                </Button>
            </FormControl>
        </LocalizationProvider>
    </div>
}