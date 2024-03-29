import {
    Backdrop,
    Button,
    CircularProgress,
    FormControl, FormControlLabel,
    styled, Switch, Tooltip
} from "@mui/material";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {ChangeEvent, Fragment, useEffect, useState} from "react";
import BlacklistService from "@/services/blacklistService.ts";
import {ApiError} from "@/http/api.ts";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {IBlacklistImportEvent} from "@/entities/blacklists/importEvent.ts";
import dayjs, {Dayjs} from "dayjs";
import {NavLink} from "react-router-dom";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function BlacklistImporter() {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [importEvents, setImportEvents] = useState<Array<IBlacklistImportEvent>>([])
    const [extractAll, setExtractAll] = useState<boolean>(true)
    const [discoveryDate, setDiscoveryDate] = useState<Dayjs | null>(dayjs())

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Импорт блокировок`
    }, []);

    const handleFilesSTIX = (event: ChangeEvent<HTMLInputElement>) => {
        const uploadFiles = event.target.files;

        if (uploadFiles && uploadFiles.length > 0) {
            const files = Array.from(uploadFiles)

            if (files.length > 0) {
                setLoading(true)

                BlacklistService.postImportSTIX(files, extractAll)
                    .then((response) => {
                        console.info(response)

                        if (response.data) {
                            setImportEvents(prevState => [response.data, ...prevState].slice(0, 8))
                        }

                        toast.success("Файлы обработаны.")
                    })
                    .catch((error: AxiosError<ApiError>) => {
                        console.error(error)

                        toast.error("Ошибка обработки.")
                    })
                    .finally(() => setLoading(false))
            }
        }
    }

    const handleFilesCSV = (event: ChangeEvent<HTMLInputElement>) => {
        const uploadFiles = event.target.files;

        if (uploadFiles && uploadFiles.length > 0) {
            const files = Array.from(uploadFiles)

            if (files.length > 0) {
                setLoading(true)

                BlacklistService.postImportCSV(files, extractAll)
                    .then((response) => {
                        console.info(response)

                        if (response.data) {
                            setImportEvents(prevState => [response.data, ...prevState].slice(0, 8))
                        }

                        toast.success("Файлы обработаны.")
                    })
                    .catch((error: AxiosError<ApiError>) => {
                        console.error(error)

                        toast.error("Ошибка обработки.")
                    })
                    .finally(() => setLoading(false))
            }
        }
    }

    return <div className={"blacklists_importer"}>
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={isLoading}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
        <div className={"blacklists_importer_form"}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl className={"blacklists_importer_input-from"} variant={'outlined'}>
                    <h2>Импорт хостов из файлов.</h2>
                    <p>Для загрузки доступны файлы в формате STIX (JSON) и ФинЦЕРТ (CSV).</p>
                    <hr/>
                    <Tooltip arrow placement="right-start"
                             title={"Из URL и почтовых адресов будут извлечены домены. Также будут извлечены IP адреса."}>
                        <FormControlLabel label="Извлекать связанные типы хостов"
                                          control={<Switch defaultChecked/>}
                                          onChange={(_event, checked) => {
                                              setExtractAll(checked)
                                          }}
                        />
                    </Tooltip>
                    <Tooltip arrow placement="right-start"
                             title={"Устанавливает дату обнаружения для хостов. Хосты, у которых дата уже установлена (например, импорт STIX), дата изменена не будет."}>
                        <DatePicker label="Дата обнаружения"
                                    sx={{marginTop: "10px"}}
                                    value={discoveryDate ?? null}
                                    onChange={(value) => {
                                        if (value) {
                                            setDiscoveryDate(value)
                                        } else {
                                            setDiscoveryDate(null)
                                        }
                                    }}
                        />
                    </Tooltip>
                    <hr/>
                    <Button component="label"
                            variant="outlined"
                            startIcon={<CloudUploadIcon/>}>
                        Загрузка файлов JSON
                        <VisuallyHiddenInput accept=".json"
                                             onChange={handleFilesSTIX}
                                             type="file"
                                             multiple={true}/>
                    </Button>
                    <Button component="label"
                            variant="outlined"
                            sx={{marginTop: "10px"}}
                            startIcon={<CloudUploadIcon/>}>
                        Загрузка файлов CSV
                        <VisuallyHiddenInput accept=".csv"
                                             onChange={handleFilesCSV}
                                             type="file"
                                             multiple={true}/>
                    </Button>
                </FormControl>
            </LocalizationProvider>
        </div>
        <div className={"blacklists_importer_info"}>
            {
                importEvents ? <Fragment>
                    {
                        importEvents.map((value) => {
                            return <ImportEventItem {...value}/>
                        })
                    }
                </Fragment> : <Fragment/>
            }
        </div>
    </div>
}

function ImportEventItem(props: IBlacklistImportEvent) {
    return <div className={"import_event__item"}>
        <h2>Импорт ID# {props.ID}</h2>
        <hr/>
        <p>Импорт из {props.Type}. {props.IsComplete ? "Завершено успешно." : "Ошибка выполнения."}</p>
        <p>Дата импорта {dayjs(props.CreatedAt).format("DD.MM.YYYY HH:mm")}.</p>
        <table className={'hosts'}>
            <thead>
            <tr>
                <td>
                    Тип
                </td>
                <td>
                    Импорт
                </td>
                <td>
                    Новые
                </td>
            </tr>
            </thead>
            <tbody>
            {
                props.Summary.Imported.IPs ? <tr>
                    <td>
                        IP
                    </td>
                    <td>
                        {props.Summary.Imported.IPs}
                    </td>
                    <td>
                        {props.Summary.New.IPs}
                    </td>
                </tr> : <Fragment/>
            }
            {
                props.Summary.Imported.Domains ? <tr>
                    <td>
                        Домен
                    </td>
                    <td>
                        {props.Summary.Imported.Domains}
                    </td>
                    <td>
                        {props.Summary.New.Domains}
                    </td>
                </tr> : <Fragment/>
            }
            {
                props.Summary.Imported.URLs ? <tr>
                    <td>
                        URL
                    </td>
                    <td>
                        {props.Summary.Imported.URLs}
                    </td>
                    <td>
                        {props.Summary.New.URLs}
                    </td>
                </tr> : <Fragment/>
            }
            {
                props.Summary.Imported.Emails ? <tr>
                    <td>
                        EMail
                    </td>
                    <td>
                        {props.Summary.Imported.Emails}
                    </td>
                    <td>
                        {props.Summary.New.Emails}
                    </td>
                </tr> : <Fragment/>
            }
            </tbody>
            <tfoot>
            <tr>
                <td>
                    Всего
                </td>
                <td>
                    {props.Summary.Imported.Total}
                </td>
                <td>
                    {props.Summary.New.Total}
                </td>
            </tr>
            </tfoot>
        </table>
        <hr/>
        <div className="import_event__item_actions">
            <NavLink to={`/blacklists/imports/${props.ID}`} target="_blank" rel="noopener noreferrer">
                Показать
            </NavLink>
            <NavLink to={`/blacklists/export?import_event_id=${props.ID}`} target="_blank" rel="noopener noreferrer">
                Экспорт
            </NavLink>
        </div>
    </div>
}