import BlacklistExportFilter from "@/components/blacklists/filter/blacklistExportFilter.tsx";
import BlacklistService, {IBlacklistedExportFilter} from "@/services/blacklistService.ts";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {toast} from "react-toastify";
import {Backdrop, CircularProgress} from "@mui/material";

const todayExportFilter: IBlacklistedExportFilter = {
    IsActive: true,
    SourceIDs: [],
    CreatedBefore: dayjs().add(1, "day"),
    CreatedAfter: dayjs()
}

export default function BlacklistExporter() {
    const [filter, setFilter] = useState<IBlacklistedExportFilter>(todayExportFilter)
    const [isLoading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Экспорт блокировок`
    }, []);

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
        }).finally(() => setLoading(false))
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
    </div>
}