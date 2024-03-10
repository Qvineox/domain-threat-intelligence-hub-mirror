import {AxiosResponse} from "axios";
import {api} from "@/http/api.ts";
import {IJobSearchFilter, JobPriority, JobStatus} from "@/entities/queue/job.ts";
import {IDialerJob} from "@/entities/queue/dialerJob.ts";

export default class JobsService {
    static async getJobsByFilter(filter: IJobSearchFilter): Promise<AxiosResponse<Array<IDialerJob>>> {
        return api.get<Array<IDialerJob>>('jobs/jobs', {
            params: {
                "limit": filter.Limit,
                "offset": filter.Offset,
                "types": filter.TypeIDs,
                "status": filter.Status != JobStatus.JOB_STATUS_ANY ? filter.Status : null,
                "priority": filter.Priority != JobPriority.JOB_PRIORITY_ANY ? filter.Priority : null,
                "created_by": filter.CreatedByID != 0 ? filter.CreatedByID : null,
                "is_finished": filter.IsFinished,
                "created_after": filter.CreatedAfter ? filter.CreatedAfter.format("YYYY-MM-DD") : null,
                "created_before": filter.CreatedBefore ? filter.CreatedBefore.format("YYYY-MM-DD") : null,
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