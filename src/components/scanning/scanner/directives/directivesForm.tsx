import {
    Button,
    ButtonGroup,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField, Tooltip
} from "@mui/material";
import {Dispatch, Fragment, SetStateAction} from "react";
import {IJob, JobPriority, JobType, OpenSourceProviders} from "@/entities/queue/job.ts";
import {toast} from "react-toastify";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';

interface IDirectivesFormProps {
    jobSettings: IJob
    onChange: Dispatch<SetStateAction<IJob>>
    onQueue: () => void
}

export default function DirectivesForm(props: IDirectivesFormProps) {
    const handleSettingsSave = () => {
        localStorage.setItem("latest_job_settings", JSON.stringify(props.jobSettings))

        toast.success("Настройки сохранены.")
    }

    return <div className={'directives-form'}>
        <div className={'directives-form_segment'}>
            <FormControl sx={{flexBasis: "50%", flexGrow: 1}}>
                <InputLabel id="directives-form_job-type-label">Тип задачи</InputLabel>
                <Select labelId="directives-form_job-type-label"
                        id="directives-form_job-type"
                        value={props.jobSettings.Type}
                        onChange={(event) => {
                            props.onChange((prevState) => ({
                                ...prevState,
                                Type: event.target.value as JobType
                            }))
                        }}
                        label="Тип задачи">
                    <MenuItem defaultChecked value={JobType.JOB_TYPE_OSS}>Поиск по открытым источникам</MenuItem>
                    <MenuItem disabled value={JobType.JOB_TYPE_DISCOVERY}>Обнаружение хостов</MenuItem>
                    <MenuItem disabled value={JobType.JOB_TYPE_DNS}>Ревизия доменных записей</MenuItem>
                    <MenuItem disabled value={JobType.JOB_TYPE_SPIDER}>Сканирование кравлером</MenuItem>
                    <MenuItem disabled value={JobType.JOB_TYPE_WHOIS}>Поиск WhoIS записей</MenuItem>
                    <MenuItem disabled value={JobType.JOB_TYPE_NMAP}>Сканирование утилитой NMAP</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{flexBasis: "25%"}}>
                <InputLabel id="directives-form_priority-label">Приоритет</InputLabel>
                <Select autoWidth labelId="directives-form_priority-label"
                        id="directives-form_priority"
                        value={props.jobSettings.Priority}
                        onChange={(event) => {
                            props.onChange((prevState) => ({
                                ...prevState,
                                Priority: event.target.value as JobPriority
                            }))
                        }}
                        label="Приоритет">
                    <MenuItem value={JobPriority.JOB_PRIORITY_CRITICAL}>Срочный</MenuItem>
                    <MenuItem value={JobPriority.JOB_PRIORITY_HIGH}>Высокий</MenuItem>
                    <MenuItem defaultChecked value={JobPriority.JOB_PRIORITY_MEDIUM}>Средний</MenuItem>
                    <MenuItem value={JobPriority.JOB_PRIORITY_LOW}>Низкий</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{flexBasis: "15%", flexGrow: 0.5}}>
                <TextField id="directives-form_weight"
                           type={'number'}
                           value={props.jobSettings.Weight}
                           onChange={(event) => {
                               if (event.target.value) {
                                   const val = parseInt(event.target.value)

                                   if (!isNaN(val) && val >= 1 && val <= 100) {
                                       props.onChange((prevState) => ({
                                           ...prevState,
                                           Weight: parseInt(event.target.value)
                                       }))
                                   }
                               }
                           }}
                           label="Вес">
                </TextField>
            </FormControl>
        </div>
        <hr/>
        <div className={'directives-form_segment'}>
            <FormControl sx={{flexBasis: "15%", flexGrow: 0.25}}>
                <TextField id="directives-form_delay"
                           type={'number'}
                           value={props.jobSettings.Delay}
                           onChange={(event) => {
                               if (event.target.value) {
                                   const val = parseInt(event.target.value)

                                   if (!isNaN(val) && val >= 1000) {
                                       props.onChange((prevState) => ({
                                           ...prevState,
                                           Delay: parseInt(event.target.value)
                                       }))
                                   }
                               }
                           }}
                           label="Задержка (мс)">
                </TextField>
            </FormControl>
            <FormControl sx={{flexBasis: "15%", flexGrow: 0.25}}>
                <TextField id="directives-form_timeout"
                           type={'number'}
                           value={props.jobSettings.Timout}
                           onChange={(event) => {
                               if (event.target.value) {
                                   const val = parseInt(event.target.value)

                                   if (!isNaN(val) && val >= 1) {
                                       props.onChange((prevState) => ({
                                           ...prevState,
                                           Timout: parseInt(event.target.value)
                                       }))
                                   }
                               }
                           }}
                           label="Таймаут (мс)">
                </TextField>
            </FormControl>
            <FormControl sx={{flexBasis: "15%", flexGrow: 0.05}}>
                <TextField id="directives-form_retries"
                           type={'number'}
                           value={props.jobSettings.Retries}
                           onChange={(event) => {
                               if (event.target.value) {
                                   const val = parseInt(event.target.value)

                                   if (!isNaN(val) && val >= 1 && val <= 10) {
                                       props.onChange((prevState) => ({
                                           ...prevState,
                                           Retries: parseInt(event.target.value)
                                       }))
                                   }
                               }
                           }}
                           label="Попыток">
                </TextField>
            </FormControl>
        </div>
        <div className={'directives-form_segment'}>

            <Tooltip className={'hint-tooltip'}
                     title={"Будут использованы в том числе агенты, находящиеся в домашней сети. " +
                         "Могут находиться за NAT. Используйте данную функцию с осторожностью."}
                     placement="bottom">
                <FormControlLabel control={<Switch onChange={(event) => {
                    props.onChange((prevState) => ({
                        ...prevState,
                        UseHomeBound: event.target.checked
                    }))
                }} checked={props.jobSettings.UseHomeBound}/>} label="Использовать домашние агенты"/>
            </Tooltip>
            <Tooltip className={'hint-tooltip'}
                     title={"Будут использованы только Ваши персональные агенты. " +
                         "У других пользователей не будет доступа к управлению созданной задачи."}
                     placement="bottom">
                <FormControlLabel control={<Switch onChange={(event) => {
                    props.onChange((prevState) => ({
                        ...prevState,
                        Private: event.target.checked
                    }))
                }} checked={props.jobSettings.Private}/>} label="Только приватные агенты"/>
            </Tooltip>
        </div>
        <hr/>
        {
            props.jobSettings.Type === JobType.JOB_TYPE_OSS ?
                <div className={'directives-form_segment directives-form_segment__oss'}>
                    <h4>Настройки поиска по открытым источникам</h4>
                    <FormControl sx={{flexBasis: "100%"}}>
                        <InputLabel id="directives-form_oss-providers-label">Провайдеры данных</InputLabel>
                        <Select multiple autoWidth labelId="directives-form_oss-providers-label"
                                id="directives-form_oss-providers"
                                value={props.jobSettings.Providers}
                                onChange={(event) => {
                                    if (event.target.value) {
                                        props.onChange((prevState) => ({
                                            ...prevState,
                                            Providers: event.target.value as Array<OpenSourceProviders>
                                        }))
                                    }
                                }}
                                label="Провайдеры данных">
                            <MenuItem value={OpenSourceProviders.OSS_PROVIDER_VIRUS_TOTAL}>VirusTotal</MenuItem>
                            <MenuItem value={OpenSourceProviders.OSS_PROVIDER_IP_QUALITY_SCORE}>IP Quality
                                Score</MenuItem>
                            <MenuItem value={OpenSourceProviders.OSS_PROVIDER_CROWD_SEC}>CrowdSec CTI</MenuItem>
                            <MenuItem value={OpenSourceProviders.OSS_PROVIDER_SHODAN}>Shodan</MenuItem>
                            <MenuItem disabled value={OpenSourceProviders.OSS_PROVIDER_IP_WHO_IS}>IP WhoIS</MenuItem>
                        </Select>
                    </FormControl>
                </div> : <Fragment/>
        }
        <ButtonGroup fullWidth variant={'outlined'}>
            <Button onClick={props.onQueue} endIcon={<PlayArrowOutlinedIcon/>}>
                Запуск
            </Button>
            <Button onClick={handleSettingsSave} endIcon={<SaveAsOutlinedIcon/>}>
                Сохранить настройки
            </Button>
        </ButtonGroup>
    </div>
}