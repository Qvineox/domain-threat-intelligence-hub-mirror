import {useEffect, useState} from "react";
import BlacklistService, {IBlacklistImportEventsFilter} from "@/services/blacklistService.ts";
import {toast} from "react-toastify";
import {IBlacklistImportEvent} from "@/entities/blacklists/importEvent.ts";
import BlacklistImportEventsTable from "@/components/blacklists/importEvents/blacklistImportEventsTable.tsx";
import BlacklistImportEventsFilter from "@/components/blacklists/importEvents/blacklistImportEventsFilter.tsx";

const defaultFilter: IBlacklistImportEventsFilter = {
    Limit: 100,
    Offset: 0,
    Type: "",
    CreatedBefore: null,
    CreatedAfter: null
}

export default function BlacklistImportEventsViewer() {
    const [filter, setFilter] = useState<IBlacklistImportEventsFilter>(defaultFilter)
    const [rows, setRows] = useState<Array<IBlacklistImportEvent>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | События импорта`
    }, []);

    useEffect(() => {
        handleSearch()
    }, [filter.Offset]);

    const handlePaginationChange = (size: number, page: number) => {
        if (rows.length === size * (page + 1)) {
            setFilter(prevState => ({
                ...prevState,
                Offset: prevState.Offset + prevState.Limit
            }))
        }
    }

    // TODO: handle delete
    const handleDelete = (uuid: string) => {
        let approved = confirm(`Удалить событие импорта ID#${uuid}?`)

        console.debug("deleting: " + uuid)
        console.debug(approved)
    }

    const handleSearch = () => {
        setIsLoading(true)

        BlacklistService.getImportEventsByFilter(filter).then((response) => {
            if (response.data) {
                setRows(response.data)
            }
        }).catch((response) => {
            console.error(response)
            toast.error("Ошибка получения данных!")
        }).finally(() => {
            setIsLoading(false)
        })
    }


    return <div className={"blacklists_viewer"}>
        <BlacklistImportEventsFilter filter={filter}
                                     setFilter={setFilter}
                                     onSearch={handleSearch}
        />
        <div className={"blacklists_viewer_content"}>
            <BlacklistImportEventsTable rows={rows}
                                        onDelete={handleDelete}
                                        isLoading={isLoading}
                                        onPaginationChange={handlePaginationChange}
            />
        </div>
    </div>
}