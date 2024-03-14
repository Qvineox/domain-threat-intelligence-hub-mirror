import {useParams, useSearchParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import {Backdrop, CircularProgress} from "@mui/material";
import JobsService from "@/services/jobsService.ts";
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {toast} from "react-toastify";
import {IDialerJob} from "@/entities/queue/dialerJob.ts";
import JobMetadata from "@/components/scanning/jobs/job/jobMetadata.tsx";
import "@/styles/jobs.scss"
import JobNodeScans from "@/components/scanning/jobs/job/jobNodeScans.tsx";
import JobNodeScanData from "@/components/scanning/jobs/job/jobNodeScanData.tsx";
import {INetworkNodeScan} from "@/entities/nodes/networkNodeScan.ts";
import JobSummary from "@/components/scanning/jobs/job/jobSummary.tsx";

export default function JobViewer() {
    const {job_uuid} = useParams();
    let [searchParams, setSearchParams] = useSearchParams();

    const [jobData, setJobData] = useState<IDialerJob>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // const [selectedNodeScanUUID, setSelectedNodeScanUUID] = useState<string>()
    const [selectedNodeScans, setSelectedNodeScans] = useState<Array<INetworkNodeScan>>([])

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Задача ${job_uuid}`
    }, [job_uuid])

    useEffect(() => {
        if (!isLoading) {
            const scanID = searchParams.get("scan_id")
            if (scanID != null && jobData?.NodeScans) {
                const id = parseInt(scanID)

                const index = jobData.NodeScans.findIndex((value) => {
                    return value.ID === id
                })

                if (index !== -1) {
                    setSelectedNodeScans([jobData?.NodeScans[index]])
                }
            }
        }
    }, [searchParams, isLoading])

    useEffect(() => {
        if (job_uuid) {
            setIsLoading(true)

            JobsService.getJobByUUID(job_uuid).then((response) => {
                if (response.data) {
                    setJobData(response.data)
                }
            }).catch((error: AxiosError<ApiError>) => {
                console.error(error)
                if (error.response?.data.ErrorCode === 6) {
                    toast.warning("Объект не найден")
                } else {
                    toast.error("Ошибка получения данных")
                }
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }, [job_uuid]);

    const handleScanSelect = (id: number) => {
        if (id == 0) {
            return
        }

        let params = new URLSearchParams
        params.set("scan_id", id.toString())
        setSearchParams(params)
    }

    const handleNodeSelect = (uuid: string) => {
        if (jobData?.NodeScans) {
            setSelectedNodeScans(jobData.NodeScans.filter((value) => {
                return value.NodeUUID === uuid && value.IsComplete
            }).sort((a, b) => {
                return b.RiskScore - a.RiskScore
            }))

            setSearchParams()
        }
    }

    return <div className={'job-viewer'}>
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={isLoading}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
        {jobData ? <Fragment>
            <JobMetadata {...jobData.Meta} />
            <JobSummary nodes={jobData.NodeScans ? jobData.NodeScans : []} isLoading={isLoading}
                        setSelectedNodeUUID={handleNodeSelect}/>
            <div className={'job-viewer_content'}>
                <JobNodeScans nodes={jobData.NodeScans ? jobData.NodeScans : []} isLoading={isLoading}
                              setSelectedNodeScanID={handleScanSelect}/>
                <JobNodeScanData scans={selectedNodeScans}/>
            </div>
        </Fragment> : <Fragment/>}
    </div>
}