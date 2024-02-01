import BlacklistExportFilter from "@/components/blacklists/export/blacklistExportFilter.tsx";
import BlacklistService, {IBlacklistedExportFilter} from "@/services/blacklistService.ts";
import dayjs from "dayjs";
import {Fragment, useEffect, useState} from "react";
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {toast} from "react-toastify";
import {Backdrop, CircularProgress} from "@mui/material";
import {SetURLSearchParams, useSearchParams} from "react-router-dom";

const defaultExportFilter: IBlacklistedExportFilter = {
    IsActive: true,
    SourceIDs: [],
    CreatedBefore: null,
    CreatedAfter: null
}

interface PreloadInfo {
    Total: number
    IPs: number
    Domains: number
    URLs: number
    Emails: number
}

export default function BlacklistExporter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filter, setFilter] = useState<IBlacklistedExportFilter>(getFilterFromSearchParams(searchParams))
    const [isLoading, setLoading] = useState<boolean>(false)
    const [preloadedInfo, setPreloadedInfo] = useState<PreloadInfo>()

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Экспорт блокировок`
    }, []);

    useEffect(() => {
        if (filter) {
            handlePreload(filter)
        }
    }, [filter]);

    const handlePreload = (filter: IBlacklistedExportFilter) => {
        setLoading(true)

        BlacklistService.getHostsByFilter({
            ImportEventID: filter.ImportEventID ?? null,
            SourceIDs: filter.SourceIDs,
            Offset: 0,
            Limit: 5000,
            IsActive: filter.IsActive,
            SearchString: "",
            CreatedAfter: filter.CreatedAfter,
            CreatedBefore: filter.CreatedBefore,
        }).then(response => {
            let info: PreloadInfo = {
                Total: 0,
                IPs: 0,
                Domains: 0,
                URLs: 0,
                Emails: 0
            }

            if (response.data) {
                response.data.forEach((value) => {
                    switch (value.Type) {
                        case 'ip':
                            info.IPs++
                            break
                        case 'domain':
                            info.Domains++
                            break
                        case 'url':
                            info.URLs++
                            break
                        case 'email':
                            info.Emails++
                            break
                    }
                })
            }

            info.Total = info.IPs + info.Domains + info.URLs + info.Emails
            setPreloadedInfo(info)


        }).catch((error: AxiosError<ApiError>) => {
            console.error(error)
            toast.error("Ошибка предзагрузки данных.")
        }).finally(() => {
            setSearchParamsFromFilter(filter, setSearchParams)
            setLoading(false)
        })
    }

    const handleExport = () => {
        setLoading(true)

        BlacklistService.postExportCSV(filter).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', `export_${dayjs().unix()}.csv`); //or any other extension

            document.body.appendChild(link);
            link.click();

            toast.success("Данные экспортированы.")

        }).catch((error: AxiosError<ApiError>) => {
            console.error(error)
            toast.error("Ошибка экспорта!")
        }).finally(() => {
            setSearchParamsFromFilter(filter, setSearchParams)
            setLoading(false)
        })
    }

    return <div className={"blacklists_exporter"}>
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={isLoading}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
        <BlacklistExportFilter filter={filter}
                               setFilter={setFilter}
                               onExport={handleExport}/>
        <div className={"blacklists_exporter_content"}>
            {
                preloadedInfo ? <Fragment>
                    <h2>Будет экспортировано</h2>
                    {
                        preloadedInfo.Total === 5000 ? <p>Лимит предпросмотра: 5000</p> : <Fragment/>
                    }
                    <table className={"preloaded_hosts"}>
                        <thead>
                        <tr>
                            <td>
                                Тип
                            </td>
                            <td>
                                К экспорту
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            preloadedInfo.IPs ? <tr>
                                <td>
                                    IP
                                </td>
                                <td>
                                    {preloadedInfo.IPs}
                                </td>
                            </tr> : <Fragment/>
                        }
                        {
                            preloadedInfo.Domains ? <tr>
                                <td>
                                    Домен
                                </td>
                                <td>
                                    {preloadedInfo.Domains}
                                </td>
                            </tr> : <Fragment/>
                        }
                        {
                            preloadedInfo.URLs ? <tr>
                                <td>
                                    URL
                                </td>
                                <td>
                                    {preloadedInfo.URLs}
                                </td>
                            </tr> : <Fragment/>
                        }
                        {
                            preloadedInfo.Emails ? <tr>
                                <td>
                                    EMail
                                </td>
                                <td>
                                    {preloadedInfo.Emails}
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
                                {preloadedInfo.Total}
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </Fragment> : <Fragment/>
            }
        </div>
    </div>
}

function getFilterFromSearchParams(params: URLSearchParams) {
    let filter = defaultExportFilter

    const importEventID = params.get("import_event_id")
    if (importEventID) {
        filter.ImportEventID = parseInt(importEventID)
    }

    return filter
}

function setSearchParamsFromFilter(filter: IBlacklistedExportFilter, setParams: SetURLSearchParams) {
    setParams({
        import_event_id: filter.ImportEventID ? filter.ImportEventID.toString() : "",
    })
}