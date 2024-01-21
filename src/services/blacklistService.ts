import api from "@/http/api.ts";
import {AxiosResponse} from "axios";
import {IBlacklistedURL} from "@/entities/blacklists/url.ts";
import {Dayjs} from "dayjs";
import {IBlacklistedSource} from "@/entities/blacklists/source.ts";
import {IBlacklistedDomain} from "@/entities/blacklists/domain.ts";
import {IBlacklistedIP} from "@/entities/blacklists/ip.ts";
import {IBlacklistedHost} from "@/entities/blacklists/host.ts";
import {IDatabaseResponse} from "@/http/responses.ts";

export default class BlacklistService {
    static async getURLsByFilter(filter: IBlacklistedFilter): Promise<AxiosResponse<Array<IBlacklistedURL>>> {
        return api.get<Array<IBlacklistedURL>>('blacklists/urls', {
            params: {
                'limit': filter.Limit,
                'offset': filter.Offset,
                'search_string': filter.SearchString,
                'created_after': filter.CreatedAfter ? filter.CreatedAfter.format("YYYY-MM-DD") : null,
                'created_before': filter.CreatedBefore ? filter.CreatedBefore.format("YYYY-MM-DD") : null,
                'is_active': filter.IsActive,
            }
        })
    }

    static async getDomainsByFilter(filter: IBlacklistedFilter): Promise<AxiosResponse<Array<IBlacklistedDomain>>> {
        return api.get<Array<IBlacklistedDomain>>('blacklists/domains', {
            params: {
                'limit': filter.Limit,
                'offset': filter.Offset,
                'search_string': filter.SearchString,
                'created_after': filter.CreatedAfter ? filter.CreatedAfter.format("YYYY-MM-DD") : null,
                'created_before': filter.CreatedBefore ? filter.CreatedBefore.format("YYYY-MM-DD") : null,
                'is_active': filter.IsActive,
            }
        })
    }

    static async getIPsByFilter(filter: IBlacklistedFilter): Promise<AxiosResponse<Array<IBlacklistedIP>>> {
        return api.get<Array<IBlacklistedIP>>('blacklists/ips', {
            params: {
                'limit': filter.Limit,
                'offset': filter.Offset,
                'search_string': filter.SearchString,
                'created_after': filter.CreatedAfter ? filter.CreatedAfter.format("YYYY-MM-DD") : null,
                'created_before': filter.CreatedBefore ? filter.CreatedBefore.format("YYYY-MM-DD") : null,
                'is_active': filter.IsActive,
            }
        })
    }

    static async deleteIP(uuid: string): Promise<AxiosResponse<IDatabaseResponse>> {
        return api.delete<IDatabaseResponse>('blacklists/ip', {
            data: {
                uuid: uuid
            }
        })
    }

    static async deleteURL(uuid: string): Promise<AxiosResponse<IDatabaseResponse>> {
        return api.delete<IDatabaseResponse>('blacklists/url', {
            data: {
                uuid: uuid
            }
        })
    }

    static async deleteDomain(uuid: string): Promise<AxiosResponse<IDatabaseResponse>> {
        return api.delete<IDatabaseResponse>('blacklists/domain', {
            data: {
                uuid: uuid
            }
        })
    }

    static async getHostsByFilter(filter: IBlacklistedFilter): Promise<AxiosResponse<Array<IBlacklistedHost>>> {
        return api.get<Array<IBlacklistedHost>>('blacklists/hosts', {
            params: {
                'limit': filter.Limit,
                'offset': filter.Offset,
                'search_string': filter.SearchString,
                'created_after': filter.CreatedAfter ? filter.CreatedAfter.format("YYYY-MM-DD") : null,
                'created_before': filter.CreatedBefore ? filter.CreatedBefore.format("YYYY-MM-DD") : null,
                'is_active': filter.IsActive,
            }
        })
    }

    static async getAllSources(): Promise<AxiosResponse<Array<IBlacklistedSource>>> {
        return api.get<Array<IBlacklistedSource>>('blacklists/sources')
    }
}

export interface IBlacklistedFilter {
    Limit: number

    SourceIDs?: Array<number>
    IsActive?: boolean
    CreatedAfter?: Dayjs
    CreatedBefore?: Dayjs
    SearchString?: string
    Offset: number
}

export const HostTypes: Array<{ label: string, value: number, host: "domain" | "url" | "ip" }> = [
    {value: 1, label: "Домены", host: "domain"},
    {value: 2, label: "URL", host: "url"},
    {value: 3, label: "IP адреса", host: "ip"},
]