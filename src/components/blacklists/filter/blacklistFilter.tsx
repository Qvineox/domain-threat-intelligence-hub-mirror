import BlacklistService, {IBlacklistedFilter} from "@/services/blacklistService.ts";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {IBlacklistedSource} from "@/entities/blacklists/source.ts";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {
    Autocomplete,
    Button,
    ButtonGroup,
    FormControl,
    FormControlLabel,
    Switch,
    TextField
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GetAppIcon from '@mui/icons-material/GetApp';

interface IBlacklistsViewerFilterProps {
    filter: IBlacklistedFilter
    setFilter: Dispatch<SetStateAction<IBlacklistedFilter>>
    onSearch: () => void
}

export default function BlacklistsViewerFilter(props: IBlacklistsViewerFilterProps) {
    const [sources, setSources] = useState<Array<IBlacklistedSource>>([])

    useEffect(() => {
        BlacklistService.getAllSources().then(r => {
            setSources(r.data)
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
                           value={props.filter.SearchString ?? ""}
                           sx={{marginTop: "20px"}}
                           onChange={(event) => {
                               props.setFilter(prevState => ({
                                   ...prevState,
                                   SearchString: event.target.value
                               }))
                           }}
                />
                <Autocomplete disablePortal
                              multiple
                              limitTags={3}
                              id={"host_types"}
                              size={"small"}
                              options={sources?.map((value) => {
                                  return {"label": value.Name, "value": value.ID}
                              })}
                              onChange={(_event, value) => {
                                  if (value) {
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
                <Button onClick={props.onSearch} variant={"outlined"} color={"info"}>
                    Поиск
                </Button>
                <ButtonGroup fullWidth variant="outlined">
                    <Button color={"info"} startIcon={<GetAppIcon/>}>
                        Импорт
                    </Button>
                    <Button color={"info"} startIcon={<FileUploadIcon/>}>
                        Экспорт
                    </Button>
                </ButtonGroup>
            </FormControl>
        </LocalizationProvider>
    </div>
}