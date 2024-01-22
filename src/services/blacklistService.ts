import api from "@/http/api.ts";
import {AxiosResponse} from "axios";
import {IBlacklistedURL} from "@/entities/blacklists/url.ts";
import {Dayjs} from "dayjs";
import {IBlacklistedSource} from "@/entities/blacklists/source.ts";
import {IBlacklistedDomain} from "@/entities/blacklists/domain.ts";
import {IBlacklistedIP} from "@/entities/blacklists/ip.ts";
import {IBlacklistedHost} from "@/entities/blacklists/host.ts";
import {IDatabaseResponse} from "@/http/responses.ts";
import {IBlacklistStatistics} from "@/entities/blacklists/statistics.ts";

export default class BlacklistService {
    static async getURLsByFilter(filter: IBlacklistedSearchFilter): Promise<AxiosResponse<Array<IBlacklistedURL>>> {
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

    static async getDomainsByFilter(filter: IBlacklistedSearchFilter): Promise<AxiosResponse<Array<IBlacklistedDomain>>> {
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

    static async getIPsByFilter(filter: IBlacklistedSearchFilter): Promise<AxiosResponse<Array<IBlacklistedIP>>> {
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

    static async getHostsByFilter(filter: IBlacklistedSearchFilter): Promise<AxiosResponse<Array<IBlacklistedHost>>> {
        return api.get<Array<IBlacklistedHost>>('blacklists/hosts', {
            params: {
                'limit': filter.Limit,
                'offset': filter.Offset,
                'source_id': filter.SourceIDs,
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

    static async postImportSTIX(files: Array<File>): Promise<AxiosResponse<IDatabaseResponse>> {
        const form = new FormData();

        files.forEach((value) => {
            form.append("file_upload", value)
        })

        return api.post<IDatabaseResponse>('blacklists/import/stix', form)
    }

    static async postImportCSV(files: Array<File>): Promise<AxiosResponse<IDatabaseResponse>> {
        const form = new FormData();

        files.forEach((value) => {
            form.append("file_upload", value)
        })

        return api.post<IDatabaseResponse>('blacklists/import/csv', form)
    }

    static async postExportCSV(filter: IBlacklistedExportFilter): Promise<AxiosResponse<Blob>> {
        return api.post<Blob>('blacklists/export/csv', {
            responseType: 'blob',
        }, {
            params: {
                'source_id': filter.SourceIDs,
                'created_after': filter.CreatedAfter ? filter.CreatedAfter.format("YYYY-MM-DD") : null,
                'created_before': filter.CreatedBefore ? filter.CreatedBefore.format("YYYY-MM-DD") : null,
                'is_active': filter.IsActive,
                'only_new': filter.OnlyNew,
            }
        })
    }

    static async getStatistics(): Promise<AxiosResponse<IBlacklistStatistics>> {
        return api.get<IBlacklistStatistics>('blacklists/stats')
    }
}

export interface IBlacklistedSearchFilter {
    Limit: number

    SourceIDs?: Array<number>
    IsActive?: boolean
    CreatedAfter?: Dayjs
    CreatedBefore?: Dayjs
    SearchString?: string
    Offset: number
}

export interface IBlacklistedExportFilter {
    SourceIDs?: Array<number>
    IsActive?: boolean
    OnlyNew?: boolean
    CreatedAfter?: Dayjs
    CreatedBefore?: Dayjs
}

export const HostTypes: Array<{ label: string, value: number, host: "domain" | "url" | "ip" }> = [
    {value: 1, label: "Домены", host: "domain"},
    {value: 2, label: "URL", host: "url"},
    {value: 3, label: "IP адреса", host: "ip"},
]