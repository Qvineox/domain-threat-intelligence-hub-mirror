import {AxiosResponse} from "axios";
import {api} from "@/http/api.ts";
import {IJob, IJobUUID} from "@/entities/queue/job.ts";
import {IQueuedJobs} from "@/entities/queue/dialerJob.ts";

export default class QueueService {
    static async postEnqueueJob(job: IJob): Promise<AxiosResponse<IJobUUID>> {
        return api.post<IJobUUID>('scanning/queue/job', job)
    }

    static async getEnqueuedJob(): Promise<AxiosResponse<IQueuedJobs>> {
        return api.get<IQueuedJobs>('scanning/queue/jobs')
    }

    static async deleteEnqueuedJob(force: boolean, uuid: string): Promise<AxiosResponse> {
        return api.delete('scanning/queue/job', {
            data: {
                "Force": force,
                "UUID": uuid,
            }
        })
    }
}