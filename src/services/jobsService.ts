import {AxiosResponse} from "axios";
import {api} from "@/http/api.ts";
import {IDialerJob} from "@/entities/queue/dialerJob.ts";

export default class JobsService {
    static async getJobsByFilter(limit: number): Promise<AxiosResponse<Array<IDialerJob>>> {
        return api.get<Array<IDialerJob>>('jobs/jobs', {
            params: {
                "limit": limit
            }
        })
    }

    static async getJobByUUID(uuid: string): Promise<AxiosResponse<IDialerJob>> {
        return api.get<IDialerJob>(`jobs/job/${uuid}`)
    }

    static async deleteJobByUUID(uuid: string): Promise<AxiosResponse> {
        return api.delete('jobs/job', {
            data: {
                "UUID": uuid,
            }
        })
    }
}