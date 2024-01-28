import {Dispatch, SetStateAction} from "react";
import {IBlacklistImportEventsFilter} from "@/services/blacklistService.ts";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Button, FormControl, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";


interface IBlacklistImportEventsFilterProps {
    filter: IBlacklistImportEventsFilter
    setFilter: Dispatch<SetStateAction<IBlacklistImportEventsFilter>>
    onSearch: () => void
}

export default function BlacklistImportEventsFilter(props: IBlacklistImportEventsFilterProps) {
    return <div className={"blacklists_viewer_filter"}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl className={"blacklists_viewer_filter_form"} fullWidth variant={'outlined'}>
                <TextField id={"search-string"}
                           label={"Поиск по типу импорта"}
                           variant={"outlined"}
                           size={"small"}
                           type={"search"}
                           sx={{marginTop: "20px"}}
                           value={props.filter.Type ?? ""}
                           onChange={(event) => {
                               props.setFilter(prevState => ({
                                   ...prevState,
                                   Type: event.target.value
                               }))
                           }}
                />
                <hr/>
                <DatePicker label="Создан после"
                            value={props.filter.CreatedBefore ?? null}
                            format={"DD/MM/YYYY"}
                            onChange={(value) => {
                                if (value) {
                                    props.setFilter(prevState => ({
                                        ...prevState,
                                        CreatedAfter: value
                                    }))
                                }
                            }}
                />
                <DatePicker label="Создан до"
                            value={props.filter.CreatedBefore ?? null}
                            format={"DD/MM/YYYY"}
                            onChange={(value) => {
                                if (value) {
                                    props.setFilter(prevState => ({
                                        ...prevState,
                                        CreatedBefore: value
                                    }))
                                }
                            }}
                />
                <Button onClick={props.onSearch} variant={"outlined"} color={"info"}>
                    Поиск
                </Button>
            </FormControl>
        </LocalizationProvider>
    </div>
}