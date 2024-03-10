import {IJobSearchFilter, JobPriority, JobStatus, JobType} from "@/entities/queue/job.ts";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {toast} from "react-toastify";
import {IUser} from "@/entities/users/user.ts";
import UserService from "@/services/userService.ts";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {
    Autocomplete,
    Button,
    FormControl,
    IconButton, InputLabel, MenuItem, Select,
    TextField,
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {LocalizationProvider} from "@mui/x-date-pickers";

interface IJobsViewerFilterProps {
    filter: IJobSearchFilter
    setFilter: Dispatch<SetStateAction<IJobSearchFilter>>
    resetFilter: () => void
    onSearch: (clear: boolean) => void
}

export default function JobsViewerFilter(props: IJobsViewerFilterProps) {
    const [users, setUsers] = useState<Array<IUser>>([])

    useEffect(() => {
        UserService.getUsers().then(response => {
            setUsers(response.data)
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error)
            toast.error("Ошибка получения списка пользователей!")
        })
    }, [])

    return <div className={"jobs-viewer_filter"}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl className={"jobs-viewer_filter_form"} fullWidth variant={'outlined'}>
                <Autocomplete disablePortal
                              multiple
                              limitTags={3}
                              id={"job_types"}
                              size={"small"}
                              sx={{marginTop: "20px"}}
                              value={props.filter.TypeIDs}
                              options={
                                  [
                                      JobType.JOB_TYPE_OSS,
                                      JobType.JOB_TYPE_DISCOVERY,
                                      JobType.JOB_TYPE_DNS,
                                      JobType.JOB_TYPE_SPIDER,
                                      JobType.JOB_TYPE_WHOIS,
                                      JobType.JOB_TYPE_NMAP
                                  ]}
                              getOptionLabel={(params) => {
                                  switch (params) {
                                      case JobType.JOB_TYPE_OSS:
                                          return "Поиск по открытым источникам (OSS)"
                                      case JobType.JOB_TYPE_DISCOVERY:
                                          return "Обнаружение хостов (DISCO)"
                                      case JobType.JOB_TYPE_DNS:
                                          return "Ревизия доменных записей (DNS)"
                                      case JobType.JOB_TYPE_SPIDER:
                                          return "Сканирование кравлером (SPIDER)"
                                      case JobType.JOB_TYPE_WHOIS:
                                          return "Поиск WhoIS записей (WHOIS)"
                                      case JobType.JOB_TYPE_NMAP:
                                          return "Сканирование утилитой NMAP (NMAP)"
                                      default:
                                          return ""
                                  }
                              }}
                              onChange={(_event, value) => {
                                  if (value) {
                                      props.setFilter(prevState => ({
                                          ...prevState,
                                          TypeIDs: value
                                      }))
                                  }
                              }}
                              renderInput={(params) => <TextField {...params} label="Типы задачи (все)"/>}
                />
                <FormControl sx={{marginTop: "10px"}} fullWidth>
                    <InputLabel id="job_priority-label">Приоритет</InputLabel>
                    <Select autoWidth labelId="job_priority-label"
                            id="job_priority"
                            value={props.filter.Priority}
                            size={'small'}
                            onChange={(event) => {
                                props.setFilter((prevState) => ({
                                    ...prevState,
                                    Priority: event.target.value as JobPriority
                                }))
                            }}
                            label="Приоритет">
                        <MenuItem value={JobPriority.JOB_PRIORITY_CRITICAL}>Срочный</MenuItem>
                        <MenuItem value={JobPriority.JOB_PRIORITY_HIGH}>Высокий</MenuItem>
                        <MenuItem defaultChecked value={JobPriority.JOB_PRIORITY_MEDIUM}>Средний</MenuItem>
                        <MenuItem value={JobPriority.JOB_PRIORITY_LOW}>Низкий</MenuItem>
                        <MenuItem value={JobPriority.JOB_PRIORITY_ANY}>Любой</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="job_status-label">Статус</InputLabel>
                    <Select autoWidth labelId="job_status-label"
                            id="job_status"
                            value={props.filter.Status}
                            size={'small'}
                            onChange={(event) => {
                                props.setFilter((prevState) => ({
                                    ...prevState,
                                    Status: event.target.value as JobStatus
                                }))
                            }}
                            label="Статус">
                        <MenuItem defaultChecked value={JobStatus.JOB_STATUS_DONE}>Завершена</MenuItem>
                        <MenuItem value={JobStatus.JOB_STATUS_WORKING}>В работе</MenuItem>
                        <MenuItem value={JobStatus.JOB_STATUS_ERROR}>Ошибка</MenuItem>
                        <MenuItem value={JobStatus.JOB_STATUS_PANIC}>Крит. ошибка</MenuItem>
                        <MenuItem value={JobStatus.JOB_STATUS_CANCELLED}>Отменена</MenuItem>
                        <MenuItem value={JobStatus.JOB_STATUS_ANY}>Любой</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{marginTop: "10px"}} fullWidth>
                    <InputLabel id="job_creator-label">Владелец</InputLabel>
                    <Select fullWidth labelId="job_creator-label"
                            id="job_creator"
                            value={props.filter.CreatedByID}
                            label="Создана"
                            size={'small'}
                            onChange={(event) => {
                                props.setFilter((prevState) => ({
                                    ...prevState,
                                    CreatedByID: event.target.value as number
                                }))
                            }}>
                        <MenuItem value={0}>
                            <p className={'user-option'}>Любой</p>
                        </MenuItem>
                        {users.map((value, index) => {
                            return <MenuItem key={index} value={value.ID}>
                                <p className={'user-option'}>{value.FullName} <i>{value.Login}</i></p>
                            </MenuItem>
                        })}
                    </Select>
                </FormControl>
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
                <div className="search-buttons">
                    <Button fullWidth onClick={() => props.onSearch(true)} variant={"outlined"} color={"info"}>
                        Поиск
                    </Button>
                    <IconButton color={'primary'} onClick={props.resetFilter}>
                        <RestartAltIcon/>
                    </IconButton>
                </div>
            </FormControl>
        </LocalizationProvider>
    </div>
}