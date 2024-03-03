import {AxiosResponse} from "axios";
import {api} from "@/http/api.ts";
import {IAgent, IAgentUpdateParams} from "@/entities/agents/agent.ts";

export default class AgentService {
    static async getAgents(): Promise<AxiosResponse<Array<IAgent>>> {
        return api.get<Array<IAgent>>('scanning/agents/agents')
    }

    static async getAgentByUUID(uuid: string): Promise<AxiosResponse<IAgent>> {
        return api.post<IAgent>(`scanning/agents/agent/${uuid}`)
    }

    static async deleteAgentByUUID(uuid: string): Promise<AxiosResponse> {
        return api.delete('scanning/agents/agent', {
            data: {
                "UUID": uuid,
            }
        })
    }

    static async patchAgent(agent: IAgentUpdateParams): Promise<AxiosResponse> {
        return api.patch('scanning/agents/agent', agent)
    }

    static async putAgent(agent: IAgentUpdateParams): Promise<AxiosResponse> {
        return api.put('scanning/agents/agent', agent)
    }
}