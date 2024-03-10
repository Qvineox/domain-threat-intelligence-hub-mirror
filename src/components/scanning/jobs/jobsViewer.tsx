import {useEffect, useState} from "react";
import {IJobSearchFilter, JobPriority, JobStatus} from "@/entities/queue/job.ts";
import dayjs from "dayjs";
import {SetURLSearchParams, useSearchParams} from "react-router-dom";
import {toast} from "react-toastify";
import JobsService from "@/services/jobsService.ts";
import JobsViewerFilter from "@/components/scanning/jobs/jobsViewerFilter.tsx";
import JobsTable from "@/components/scanning/jobs/jobsTable.tsx";
import {IDialerJob} from "@/entities/queue/dialerJob.ts";

const defaultFilter: IJobSearchFilter = {
    Limit: 100,
    Offset: 0,
    Priority: JobPriority.JOB_PRIORITY_ANY,
    Status: JobStatus.JOB_STATUS_ANY,
    CreatedByID: 0,
    CreatedBefore: dayjs().add(1, "day"),
    CreatedAfter: dayjs().subtract(3, "months")
}


export default function JobsViewer() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filter, setFilter] = useState<IJobSearchFilter>(getFilterFromSearchParams(searchParams))
    const [rows, setRows] = useState<Array<IDialerJob>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Задачи`
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

    const handleSearch = (clear: boolean) => {
        setIsLoading(true)

        if (clear) {
            setFilter(prevState => ({
                ...prevState,
                Offset: 0,
                Limit: 100
            }))
        }

        JobsService.getJobsByFilter(filter).then((response) => {
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
                if (clear) {
                    setRows([])
                }
            }
        }).catch((response) => {
            console.error(response)
            toast.error("Ошибка получения данных!")
        }).finally(() => {
            setIsLoading(false)
            setSearchParamsFromFilter(filter, setSearchParams)
        })
    }

    const handleDelete = (uuid: string) => {
        setIsLoading(true)

        JobsService.deleteJobByUUID(uuid).then(() => {
            toast.info("Задача удалена")
        }).catch((response) => {
            console.error(response)
            toast.error("Ошибка удаления!")
        }).finally(() => {
            setIsLoading(false)
            handleSearch(true)
        })
    }

    const handleReset = () => {
        setFilter(defaultFilter)
    }

    return <div className={'jobs-viewer'}>
        <JobsViewerFilter setFilter={setFilter} filter={filter} resetFilter={handleReset} onSearch={handleSearch}/>
        <JobsTable rows={rows}
                   isLoading={isLoading}
                   onPaginationChange={handlePaginationChange}
                   onDelete={handleDelete}/>
    </div>
}

function getFilterFromSearchParams(params: URLSearchParams) {
    let filter = {...defaultFilter}

    const limit = params.get("limit")
    if (limit) {
        filter.Limit = parseInt(limit)
    }

    const priority = params.get("priority")
    if (priority) {
        filter.Priority = parseInt(priority)
    }

    const status = params.get("status")
    if (status) {
        filter.Status = parseInt(status)
    }

    const createdByID = params.get("created_by")
    if (createdByID) {
        filter.CreatedByID = parseInt(createdByID)
    }

    const isFinished = params.get("is_finished")
    if (isFinished) {
        filter.IsFinished = isFinished === "true"
    }

    const typeIDs = params.get("type_ids")
    if (typeIDs) {
        filter.TypeIDs = typeIDs.split(",").map((value) => {
            return parseInt(value)
        })
    }

    return filter
}

function setSearchParamsFromFilter(filter: IJobSearchFilter, setParams: SetURLSearchParams) {
    let params: URLSearchParams = new URLSearchParams()


    if (filter.Limit !== 0) {
        params.append("limit", filter.Limit.toString())
    }

    if (filter.Priority && filter.Priority != JobPriority.JOB_PRIORITY_ANY) {
        params.append("priority", filter.Priority.toString())
    }

    if (filter.Status && filter.Status != JobStatus.JOB_STATUS_ANY) {
        params.append("status", filter.Status.toString())
    }

    if (filter.CreatedByID) {
        params.append("created_by", filter.CreatedByID.toString())
    }

    if (filter.IsFinished) {
        params.append("is_finished", filter.IsFinished.toString())
    }

    if (filter.TypeIDs && filter.TypeIDs.length > 0) {
        params.append("type_ids", filter.TypeIDs.join(","))
    }


    setParams(params)
}