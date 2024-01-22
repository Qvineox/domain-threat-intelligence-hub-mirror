import {useEffect, useState} from "react";
import BlacklistService, {IBlacklistedSearchFilter} from "@/services/blacklistService.ts";
import dayjs from "dayjs";
import BlacklistsViewerFilter from "@/components/blacklists/filter/blacklistViewFilter.tsx";
import {IBlacklistedHost} from "@/entities/blacklists/host.ts";
import BlacklistTable from "@/components/blacklists/view/blacklistTable.tsx";
import {toast} from "react-toastify";


const defaultFilter: IBlacklistedSearchFilter = {
    IsActive: true,
    Limit: 100,
    Offset: 0,
    SourceIDs: [],
    SearchString: "",
    CreatedBefore: dayjs().add(1, "day"),
    CreatedAfter: dayjs().subtract(3, "months")
}

export default function BlacklistsViewer() {
    const [filter, setFilter] = useState<IBlacklistedSearchFilter>(defaultFilter)
    const [rows, setRows] = useState<Array<IBlacklistedHost>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        handleSearch()
    }, []);

    const handlePaginationChange = (size: number, page: number) => {
        console.info(size * (page))

        if (filter.Offset < size * (page)) {
            setFilter(prevState => ({
                ...prevState,
                Offset: prevState.Offset + size * (page)
            }))

            handleSearch()
        }
    }

    const handleSearch = () => {
        setIsLoading(true)

        BlacklistService.getHostsByFilter(filter).then((response) => {
            if (response.data) {
                setRows(response.data)
            } else {
                setRows([])
            }
        }).catch((response) => {
            console.error(response)
            toast.error("Ошибка получения данных!")
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleDelete = (type: "url" | "domain" | "ip", uuid: string) => {
        switch (type) {
            case "ip":
                BlacklistService.deleteIP(uuid).then((response) => {
                    if (response) {
                        console.info("ip deleted!")
                        toast.info("IP адрес удален.")

                        handleSearch()
                    }
                }).catch((response) => {
                    console.error(response)
                    toast.error("Ошибка удаления!")
                })
                break
            case "url":
                BlacklistService.deleteURL(uuid).then((response) => {
                    if (response) {
                        console.info("url deleted!")
                        toast.info("URL удален.")

                        handleSearch()
                    }
                }).catch((response) => {
                    console.error(response)
                    toast.error("Ошибка удаления!")
                })
                break
            case "domain":
                BlacklistService.deleteDomain(uuid).then((response) => {
                    if (response) {
                        console.info("domain deleted!")
                        toast.info("Доменное имя удалено.")

                        handleSearch()
                    }
                }).catch((response) => {
                    console.error(response)
                    toast.error("Ошибка удаления!")
                })
        }
    }

    return <div className={"blacklists_viewer"}>
        <BlacklistsViewerFilter filter={filter}
                                setFilter={setFilter}
                                onSearch={handleSearch}
        />
        <div className={"blacklists_viewer_content"}>
            <BlacklistTable rows={rows}
                            onDelete={handleDelete}
                            isLoading={isLoading}
                            onPaginationChange={handlePaginationChange}
            />
        </div>
    </div>
}

export interface IBlacklistedHostsTableProps {
    filter: IBlacklistedSearchFilter
    show: boolean
}


