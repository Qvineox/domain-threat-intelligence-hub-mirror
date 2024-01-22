import {Backdrop, Button, CircularProgress, FormControl, styled} from "@mui/material";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {ChangeEvent, useState} from "react";
import dayjs from "dayjs";
import BlacklistService from "@/services/blacklistService.ts";
import {ApiError} from "@/http/api.ts";
import {toast} from "react-toastify";
import {AxiosError} from "axios";

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
    const [log, setLog] = useState<Array<string>>([])
    const [isLoading, setLoading] = useState<boolean>(false)

    const handleLogEntry = (value: string) => {
        let now = dayjs()

        setLog(prevState => [
            ...prevState,
            now.format("HH:mm:ss\t") + value
        ])
    }

    const handleFilesSTIX = (event: ChangeEvent<HTMLInputElement>) => {
        handleLogEntry(`начат импорт в формате STIX (JSON)`)

        const uploadFiles = event.target.files;

        if (uploadFiles && uploadFiles.length > 0) {
            let files = Array.from(uploadFiles)

            if (files.length > 1) {
                handleLogEntry(`добавлено ${uploadFiles.length} файлов:${files.map((value) => {
                    return `\n > ${value.name} (${(value.size / 1024).toFixed(2)} KB)`
                })}`)
            } else {
                handleLogEntry(`добавлен ${uploadFiles.length} файл:${files.map((value) => {
                    return `\n > ${value.name} (${(value.size / 1024).toFixed(2)} KB)`
                })}`)
            }

            if (files.length > 0) {
                handleLogEntry(`отправка на сервер...`)
                setLoading(true)

                BlacklistService.postImportSTIX(files)
                    .then((response) => {
                        console.info(response)

                        let message = `Файлы (${files.length}) обработаны. Обновлено сущностей: ${response.data.RowsAffected}`

                        response.data.Warnings?.map((value) => {
                            message += `\n > warn: ${value}`
                        })

                        handleLogEntry(message)

                        if (files.length > 1) {
                            toast.success("Файлы обработаны.")
                        } else {
                            toast.success("Файы обработан.")
                        }
                    })
                    .catch((error: AxiosError<ApiError>) => {
                        if (error.response) {
                            handleLogEntry(`ошибка обработки: ${error.response.data.ErrorMessage} (код ошибки: ${error.response.data.ErrorCode})`)
                        }

                        toast.error("Ошибка обработки.")
                    })
                    .finally(() => setLoading(false))
            }


        } else {
            handleLogEntry(`файлы не найдены.`)
        }
    }

    const handleFilesCSV = (event: ChangeEvent<HTMLInputElement>) => {
        handleLogEntry(`начат импорт в формате ФинЦЕРТ (CSV)`)

        const uploadFiles = event.target.files;

        if (uploadFiles && uploadFiles.length > 0) {
            let files = Array.from(uploadFiles)

            if (files.length > 1) {
                handleLogEntry(`добавлено ${uploadFiles.length} файлов:${files.map((value) => {
                    return `\n > ${value.name} (${(value.size / 1024).toFixed(2)} KB)`
                })}`)
            } else {
                handleLogEntry(`добавлен ${uploadFiles.length} файл:${files.map((value) => {
                    return `\n > ${value.name} (${(value.size / 1024).toFixed(2)} KB)`
                })}`)
            }

            if (files.length > 0) {
                handleLogEntry(`отправка на сервер...`)
                setLoading(true)

                BlacklistService.postImportCSV(files)
                    .then((response) => {
                        console.info(response)

                        let message = `Файлы (${files.length}) обработаны. Обновлено сущностей: ${response.data.RowsAffected}`

                        response.data.Warnings?.map((value) => {
                            message += `\n > warn: ${value}`
                        })

                        handleLogEntry(message)

                        if (files.length > 1) {
                            toast.success("Файлы обработаны.")
                        } else {
                            toast.success("Файы обработан.")
                        }
                    })
                    .catch((error: AxiosError<ApiError>) => {
                        if (error.response) {
                            handleLogEntry(`ошибка обработки: ${error.response.data.ErrorMessage} (код ошибки: ${error.response.data.ErrorCode})`)
                        }

                        toast.error("Ошибка обработки.")
                    })
                    .finally(() => setLoading(false))
            }
        } else {
            handleLogEntry(`файлы не найдены.`)
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
            <FormControl className={"blacklists_importer_input-from"} variant={'outlined'}>
                <h2>Импорт хостов из файлов.</h2>
                <p>Для загрузки доступны файлы в формате STIX (JSON) и ФинЦЕРТ (CSV).</p>
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
        </div>
        <div className={"blacklists_importer_info"}>
            <ul>
                {log?.map((value, index) => {
                    return <li key={index}>{value}</li>
                })}
            </ul>
        </div>
    </div>
}