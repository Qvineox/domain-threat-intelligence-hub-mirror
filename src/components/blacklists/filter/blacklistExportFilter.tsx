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
import dayjs from "dayjs";
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
                <Autocomplete disablePortal
                              multiple
                              limitTags={3}
                              sx={{marginTop: "20px"}}
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
                            onChange={(value) => {
                                if (value) {
                                    props.setFilter(prevState => ({
                                        ...prevState,
                                        CreatedAfter: value
                                    }))
                                }
                            }}
                />
                <DatePicker label="Обнаружены до"
                            value={props.filter.CreatedBefore ?? dayjs()}
                            onChange={(value) => {
                                if (value) {
                                    props.setFilter(prevState => ({
                                        ...prevState,
                                        CreatedBefore: value
                                    }))
                                }
                            }}
                />
                <hr/>
                <FormControlLabel label="Только активные"
                                  control={<Switch defaultChecked/>}
                                  onChange={(_event, checked) => {
                                      props.setFilter(prevState => ({
                                          ...prevState,
                                          IsActive: checked
                                      }))
                                  }}
                />
                <FormControlLabel label="Только новые"
                                  control={<Switch defaultChecked/>}
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