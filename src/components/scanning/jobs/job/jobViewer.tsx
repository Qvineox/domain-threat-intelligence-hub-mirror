import {useParams} from "react-router-dom";
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

export default function JobViewer() {
    const {uuid} = useParams();

    const [jobData, setJobData] = useState<IDialerJob>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedNodeScan, setSelectedNodeScan] = useState<INetworkNodeScan>()

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Задача ${uuid}`
    }, [])

    useEffect(() => {
        if (uuid) {
            setIsLoading(true)

            JobsService.getJobByUUID(uuid).then((response) => {
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
    }, [uuid]);


    return <div className={'job-viewer'}>
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={isLoading}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
        {jobData ? <Fragment>
            <JobMetadata {...jobData.Meta} />
            <div className={'job-viewer_content'}>
                <JobNodeScans nodes={jobData.NodeScans ? jobData.NodeScans : []} isLoading={isLoading}
                              setSelectedNodeScan={setSelectedNodeScan}/>
                <JobNodeScanData data={selectedNodeScan}/>
            </div>
        </Fragment> : <Fragment/>}
    </div>
}