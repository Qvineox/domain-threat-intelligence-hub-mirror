import {useEffect, useState} from "react";
import BlacklistService, {IBlacklistedSearchFilter} from "@/services/blacklistService.ts";
import dayjs from "dayjs";
import BlacklistsViewerFilter from "@/components/blacklists/view/blacklistViewFilter.tsx";
import {IBlacklistedHost} from "@/entities/blacklists/host.ts";
import BlacklistTable from "@/components/blacklists/view/blacklistTable.tsx";
import {toast} from "react-toastify";
import {SetURLSearchParams, useSearchParams} from "react-router-dom";


const defaultFilter: IBlacklistedSearchFilter = {
    IsActive: true,
    Limit: 100,
    Offset: 0,
    SourceIDs: [],
    SearchString: "",
    ImportEventID: 0,
    CreatedBefore: dayjs().add(1, "day"),
    CreatedAfter: dayjs().subtract(3, "months")
}

export default function BlacklistsViewer() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filter, setFilter] = useState<IBlacklistedSearchFilter>(getFilterFromSearchParams(searchParams))
    const [rows, setRows] = useState<Array<IBlacklistedHost>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Блокировки`
    }, [])

    useEffect(() => {
        handleSearch(false)
    }, [filter.Offset]);

    const handlePaginationChange = (size: number, page: number) => {
        if (rows.length === size * (page + 1)) {
            setFilter(prevState => ({
                ...prevState,
                Offset: prevState.Offset + prevState.Limit
            }))
        }
    }

    const handleReset = () => {
        setFilter(defaultFilter)
    }

    const handleSearch = (clear: boolean) => {
        setIsLoading(true)

        if (clear) {
            setFilter(prevState => ({
                ...prevState,
                Offset: 0,
                Limit: 100
            }))
        }

        BlacklistService.getHostsByFilter(filter).then((response) => {
            if (response.data) {
                if (clear) {
                    setRows(response.data)
                } else {
                    setRows(prevState => [
                        ...prevState,
                        ...response.data
                    ])
                }
            } else {
                setRows([])
            }
        }).catch((response) => {
            console.error(response)
            toast.error("Ошибка получения данных!")
        }).finally(() => {
            setIsLoading(false)
            setSearchParamsFromFilter(filter, setSearchParams)
        })
    }

    const handleDelete = (type: "url" | "domain" | "ip" | "email", uuid: string) => {
        switch (type) {
            case "ip":
                BlacklistService.deleteIP(uuid).then((response) => {
                    if (response) {
                        console.info("ip deleted!")
                        toast.info("IP адрес удален.")

                        handleSearch(true)
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

                        handleSearch(true)
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

                        handleSearch(true)
                    }
                }).catch((response) => {
                    console.error(response)
                    toast.error("Ошибка удаления!")
                })
                break
            case "email":
                BlacklistService.deleteEmail(uuid).then((response) => {
                    if (response) {
                        console.info("email deleted!")
                        toast.info("Почтовый адрес удален.")

                        handleSearch(true)
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
                                resetFilter={handleReset}
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

function getFilterFromSearchParams(params: URLSearchParams) {
    let filter = {...defaultFilter}

    const sourceIDs = params.get("source_ids")
    if (sourceIDs) {
        filter.SourceIDs = sourceIDs.split(",").map((value) => {
            return parseInt(value)
        })
    }

    const limit = params.get("limit")
    if (limit) {
        filter.Limit = parseInt(limit)
    }

    filter.SearchString = params.get("search_string") || ""

    const importEventID = params.get("import_event_id")
    if (importEventID) {
        filter.ImportEventID = parseInt(importEventID)
    }

    return filter
}

function setSearchParamsFromFilter(filter: IBlacklistedSearchFilter, setParams: SetURLSearchParams) {
    let params: URLSearchParams = new URLSearchParams()

    if (filter.Limit !== 0) {
        params.append("limit", filter.Limit.toString())
    }

    if (filter.SearchString) {
        params.append("search_string", filter.SearchString)
    }

    if (filter.SourceIDs && filter.SourceIDs.length > 0) {
        params.append("source_ids", filter.SourceIDs.join(","))
    }

    if (filter.ImportEventID) {
        params.append("import_event_id", filter.ImportEventID.toString())
    }

    setParams(params)


    // setParams(prev => ({
    //     limit: filter.Limit ? filter.Limit.toString() : (prev.get("limit") || "100"),
    //     source_ids: filter.SourceIDs ? filter.SourceIDs.join(",") : "",
    //     search_string: filter.SearchString ? filter.SearchString.toString() : "",
    //     import_event_id: filter.ImportEventID ? filter.ImportEventID.toString() : "",
    // }))
}


