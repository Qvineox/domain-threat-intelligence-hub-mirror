import {Fragment, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BlacklistService from "@/services/blacklistService.ts";
import {IBlacklistImportEvent} from "@/entities/blacklists/importEvent.ts";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {Backdrop, Button, ButtonGroup, CircularProgress} from "@mui/material";
import dayjs from "dayjs";
import {BarChart} from "@mui/x-charts";

export default function BlacklistImportEventViewer() {
    const {id} = useParams();
    const navigate = useNavigate()

    const [eventData, setEventData] = useState<IBlacklistImportEvent>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Событие импорта #${id}`
    }, [])

    useEffect(() => {
        if (id) {
            setIsLoading(true)

            const eventID = parseInt(id)

            if (isNaN(eventID)) {
                toast.error("Ошибка параметров запроса")
                return
            }

            BlacklistService.getImportEvent(eventID).then((response) => {
                if (response.data) {
                    setEventData(response.data)
                }
            }).catch((error: AxiosError<ApiError>) => {
                console.error(error)
                toast.error("Ошибка получения данных")
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }, [id]);

    return <div className={"blacklists_event"}>
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={isLoading}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
        {eventData ? <Fragment>
            <div className="blacklists_event_info">
                <h2>Событие импорта ID#{eventData?.ID}</h2>
                <h3>Дата импорта: {dayjs(eventData?.CreatedAt).format("DD.MM.YYYY HH:mm")}</h3>
                <h3>Тип импорта: {eventData?.Type}</h3>
                <h3>Завершено: {eventData.IsComplete ? "да" : "нет"}</h3>
                <hr/>
                <div className="blacklists_event_info_summary">
                    <h3>Всего импортировано: {eventData.Summary.Imported.Total}</h3>
                    <p>- IP адреса: {eventData.Summary.Imported.IPs}</p>
                    <p>- домены: {eventData.Summary.Imported.Domains}</p>
                    <p>- ссылки: {eventData.Summary.Imported.URLs}</p>
                    <p>- почтовые адреса: {eventData.Summary.Imported.Emails}</p>
                    <h3 style={{marginTop: "20px"}}>Новые записи: {eventData.Summary.New.Total}</h3>
                    <p>- IP адреса: {eventData.Summary.New.IPs}</p>
                    <p>- домены: {eventData.Summary.New.Domains}</p>
                    <p>- ссылки: {eventData.Summary.New.URLs}</p>
                    <p>- почтовые адреса: {eventData.Summary.New.Emails}</p>
                    <h3 style={{marginTop: "20px"}}>Пропущено: {eventData.Summary.Skipped}</h3>
                </div>

                <hr/>
                <div className="blacklists_event_info_actions">
                    <ButtonGroup>
                        <Button
                            onClick={() => navigate(`/blacklists/view?limit=${eventData.Summary.Imported.Total + 100}&import_event_id=${eventData.ID}`)}>
                            Посмотреть добавленные блокировки
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button onClick={() => navigate(`/blacklists/export?import_event_id=${eventData.ID}`)}>
                            Экспортировать событие
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="blacklists_event_stats">
                <BarChart
                    xAxis={[{scaleType: 'band', data: ['IP адреса', 'Домены', 'Ссылки', 'Почтовые адреса', 'Другое']}]}
                    series={[
                        {
                            data: [eventData.Summary.Imported.IPs, eventData.Summary.Imported.Domains, eventData.Summary.Imported.URLs, eventData.Summary.Imported.Emails, eventData.Summary.Skipped],
                            label: 'Импортировано',
                            id: 'importedId',
                            stack: 'total',
                            color: "#70aae7"
                        },
                        {
                            data: [eventData.Summary.New.IPs, eventData.Summary.New.Domains, eventData.Summary.New.URLs, eventData.Summary.New.Emails, 0],
                            label: 'Новые',
                            id: 'newId',
                            stack: 'total',
                            color: "#79C99E"
                        },
                    ]}
                    width={1200}
                    height={400}
                />
            </div>
        </Fragment> : <h2>Данные отсутсвуют</h2>}
    </div>
}