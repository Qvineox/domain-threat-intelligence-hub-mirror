import {useEffect, useState} from "react";
import {IJobTarget} from "@/entities/queue/dialerJob.ts";
import TargetsInput from "@/components/scanning/scanner/targets/targetsInput.tsx";
import DirectivesForm from "@/components/scanning/scanner/directives/directivesForm.tsx";
import {IJobCreateParams, JobPriority, JobType, OpenSourceProviders} from "@/entities/queue/job.ts";
import {toast} from "react-toastify";
import {Backdrop, CircularProgress} from "@mui/material";
import QueueService from "@/services/queueService.ts";
import {ApiError} from "@/http/api.ts";
import {AxiosError} from "axios";
import LatestJobs from "@/components/scanning/scanner/latestJobs/latestJobs.tsx";

export default function Scanner() {
    const [targets, setTargets] = useState<Array<IJobTarget>>([])
    const [jobSettings, setJobSettings] = useState<IJobCreateParams>(defaultJob)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Сканер`
        setIsLoading(true)

        const settings = localStorage.getItem("latest_job_settings")
        if (settings != null) {
            try {
                setJobSettings(JSON.parse(settings))
            } catch (e) {
                console.error(e)
                toast.warning("Ошибка предзагрузки настроек сканирования.")
            }
        }

        setIsLoading(false)
    }, [])

    useEffect(() => {
        setJobSettings((prevState) => ({
            ...prevState,
            Targets: targets.map((value) => {
                return value.Host
            })
        }))
    }, [targets]);

    const handleQueueJob = () => {
        QueueService.postEnqueueJob(jobSettings).then((response) => {
            toast.success(`Задача отправлена.\n${response.data.UUID}`)
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error)

            let msg: string = ""

            if (error.response) {
                switch (error.response.data.ErrorMessage) {
                    case "no job targets defined":
                        msg = "Цели не обнаружены."
                }
            }


            toast.error(`Ошибка создания задачи. ${msg}`)
        })
    }

    return <div className={'scanner'}>
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={isLoading}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
        <div className={'scanner_setup'}>
            <TargetsInput targets={targets} onChange={setTargets}/>
            <DirectivesForm jobSettings={jobSettings}
                            onQueue={handleQueueJob}
                            onChange={setJobSettings}/>
        </div>
        <LatestJobs/>
    </div>
}

const defaultJob: IJobCreateParams = {
    Private: false,
    UseHomeBound: false,
    Type: JobType.JOB_TYPE_OSS,
    Priority: JobPriority.JOB_PRIORITY_MEDIUM,
    Providers: [OpenSourceProviders.OSS_PROVIDER_VIRUS_TOTAL],
    Weight: 10,
    Delay: 2000,
    Timout: 5000,
    Retries: 3,
    Targets: [],
    Exceptions: []
}