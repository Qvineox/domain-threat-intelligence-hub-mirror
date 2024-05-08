import React, {Dispatch, SetStateAction, useState} from "react";
import {INodesSearchFilter} from "@/components/nodes/nodesViewer.tsx";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {
    Button,
    FormControl, FormControlLabel, Popover, Switch,
    TextField
} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import SettingsIcon from '@mui/icons-material/Settings';

interface INodeSearchFilterProps {
    filter: INodesSearchFilter
    setFilter: Dispatch<SetStateAction<INodesSearchFilter>>
}

export default function NodeSearchFilter(props: INodeSearchFilterProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'search-parameters-button' : undefined;

    return <div className="node-search-filter">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl fullWidth variant={'outlined'}>
                <TextField id={"nodes-search-string"}
                           label={"Поиск по значению"}
                           variant={"outlined"}
                           size={"small"}
                           type={"search"}
                           sx={{marginTop: '10px'}}
                           value={props.filter.searchString ?? ""}
                           onChange={(event) => {
                               props.setFilter(prevState => ({
                                   ...prevState,
                                   searchString: event.target.value
                               }))
                           }}
                />
                <Button sx={{marginTop: '10px'}} variant={'outlined'} color={'info'} size={'small'}
                        aria-describedby={id} onClick={handleClick}
                        endIcon={<SettingsIcon/>}>
                    Настройки поиска
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                >
                    <div className={'settings-popover'}>
                        <h4>Настройки поиска</h4>
                        <FormControlLabel control={<Switch size={'medium'} value={props.filter.searchIPs}
                                                           defaultChecked={props.filter.searchIPs}/>}
                                          label="Искать IP"/>
                        <FormControlLabel control={<Switch size={'medium'} value={props.filter.searchDomains}
                                                           defaultChecked={props.filter.searchDomains}/>}
                                          label="Искать домены"/>
                        <FormControlLabel control={<Switch size={'medium'} value={props.filter.searchURLs}
                                                           defaultChecked={props.filter.searchURLs}/>}
                                          label="Искать URL"/>
                        <FormControlLabel control={<Switch size={'medium'} value={props.filter.searchEmails}
                                                           defaultChecked={props.filter.searchEmails}/>}
                                          label="Искать почту"/>
                        <br/>
                        <FormControlLabel disabled control={<Switch size={'medium'} value={props.filter.searchInactive}
                                                                    defaultChecked={props.filter.searchInactive}/>}
                                          label="Искать неактивные"/>
                    </div>
                </Popover>
            </FormControl>
        </LocalizationProvider>
    </div>
}