import {AxiosResponse} from "axios";
import {api} from "@/http/api.ts";
import {INetworkNode, INetworkNodeScoring, INetworkNodeSearchFilter} from "@/entities/nodes/networkNode.ts";

export default class NodesService {
    static async getNodesByFilter(filter: INetworkNodeSearchFilter): Promise<AxiosResponse<Array<INetworkNode>>> {
        return api.get<Array<INetworkNode>>('nodes/nodes', {
            params: {
                "limit": filter.Limit,
                "offset": filter.Offset,
                "types": filter.TypeIDs,
                "search_string": filter.SearchString,
                "discovered_after": filter.DiscoveredAfter ? filter.DiscoveredAfter.format("YYYY-MM-DD") : null,
                "discovered_before": filter.DiscoveredBefore ? filter.DiscoveredBefore.format("YYYY-MM-DD") : null,
                "created_after": filter.CreatedAfter ? filter.CreatedAfter.format("YYYY-MM-DD") : null,
                "created_before": filter.CreatedBefore ? filter.CreatedBefore.format("YYYY-MM-DD") : null,
            }
        })
    }

    static async getNodeByUUID(uuid: string): Promise<AxiosResponse<INetworkNode>> {
        return api.get<INetworkNode>(`nodes/node/${uuid}`)
    }

    static async evaluateNodeScoringByUUID(uuid: string): Promise<AxiosResponse<INetworkNodeScoring>> {
        return api.post<INetworkNodeScoring>(`nodes/evaluate/${uuid}`)
    }
}