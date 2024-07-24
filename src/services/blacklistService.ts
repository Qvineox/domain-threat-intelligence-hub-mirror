import {AxiosResponse} from "axios";
import {IBlacklistedURL} from "@/entities/blacklists/url.ts";
import {Dayjs} from "dayjs";
import {IBlacklistedSource} from "@/entities/blacklists/source.ts";
import {IBlacklistedDomain} from "@/entities/blacklists/domain.ts";
import {IBlacklistedIP} from "@/entities/blacklists/ip.ts";
import {IBlacklistedHost} from "@/entities/blacklists/host.ts";
import {IDatabaseResponse} from "@/http/responses.ts";
import {IBlacklistStatistics} from "@/entities/blacklists/statistics.ts";
import {IBlacklistImportEvent} from "@/entities/blacklists/importEvent.ts";
import {api} from "@/http/api";
import {IBlacklistedEmail} from "@/entities/blacklists/email.ts";

export default class BlacklistService {
    static async getURLsByFilter(filter: IBlacklistedSearchFilter): Promise<AxiosResponse<Array<IBlacklistedURL>>> {
        return api.get<Array<IBlacklistedURL>>('blacklists/urls', {
            params: {
                'limit': filter.Limit,
                'offset': filter.Offset,
                'source_id': filter.SourceIDs,
                'import_event_id': filter.ImportEventID,
                'search_string': filter.SearchString,
                'created_after': filter.CreatedAfter ? filter.CreatedAfter.format("YYYY-MM-DD") : null,
                'created_before': filter.CreatedBefore ? filter.CreatedBefore.format("YYYY-MM-DD") : null,
                'is_active': filter.IsActive,
            }
        })
    }

    static async getDomainsByFilter(filter: IBlacklistedSearchFilter): Promise<AxiosResponse<Array<IBlacklistedDomain>>> {
        return api.get<Array<IBlacklistedDomain>>('blacklists/domain', {
            params: {
                'limit': filter.Limit,
                'offset': filter.Offset,
                'source_id': filter.SourceIDs,
                'import_event_id': filter.ImportEventID,
                'search_string': filter.SearchString,
                'created_after': filter.CreatedAfter ? filter.CreatedAfter.format("YYYY-MM-DD") : null,
                'created_before': filter.CreatedBefore ? filter.CreatedBefore.format("YYYY-MM-DD") : null,
                'is_active': filter.IsActive,
            }
        })
    }

    static async getIPsByFilter(filter: IBlacklistedSearchFilter): Promise<AxiosResponse<Array<IBlacklistedIP>>> {
        return api.get<Array<IBlacklistedIP>>('blacklists/ip', {
            params: {
                'limit': filter.Limit,
                'offset': filter.Offset,
                'source_id': filter.SourceIDs,
                'import_event_id': filter.ImportEventID,
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
                UUID: uuid
            }
        })
    }

    static async deleteURL(uuid: string): Promise<AxiosResponse<IDatabaseResponse>> {
        return api.delete<IDatabaseResponse>('blacklists/url', {
            data: {
                UUID: uuid
            }
        })
    }

    static async deleteDomain(uuid: string): Promise<AxiosResponse<IDatabaseResponse>> {
        return api.delete<IDatabaseResponse>('blacklists/domain', {
            data: {
                UUID: uuid
            }
        })
    }

    static async deleteEmail(uuid: string): Promise<AxiosResponse<IDatabaseResponse>> {
        return api.delete<IDatabaseResponse>('blacklists/email', {
            data: {
                UUID: uuid
            }
        })
    }

    static async getHostsByFilter(filter: IBlacklistedSearchFilter): Promise<AxiosResponse<Array<IBlacklistedHost>>> {
        return api.get<Array<IBlacklistedHost>>('blacklists/host', {
            params: {
                'limit': filter.Limit,
                'offset': filter.Offset,
                'source_id': filter.SourceIDs,
                'import_event_id': filter.ImportEventID,
                'search_string': filter.SearchString,
                'created_after': filter.CreatedAfter ? filter.CreatedAfter.format("YYYY-MM-DD") : null,
                'created_before': filter.CreatedBefore ? filter.CreatedBefore.format("YYYY-MM-DD") : null,
                'is_active': filter.IsActive,
            }
        })
    }

    static async getImportEventsByFilter(filter: IBlacklistImportEventsFilter): Promise<AxiosResponse<Array<IBlacklistImportEvent>>> {
        return api.get<Array<IBlacklistImportEvent>>('blacklists/import/event', {
            params: {
                'limit': filter.Limit,
                'offset': filter.Offset,
                'type': filter.Type,
                'created_after': filter.CreatedAfter ? filter.CreatedAfter.format("YYYY-MM-DD") : null,
                'created_before': filter.CreatedBefore ? filter.CreatedBefore.format("YYYY-MM-DD") : null,
            }
        })
    }

    static async deleteImportEvent(id: number): Promise<AxiosResponse<IDatabaseResponse>> {
        return api.delete<IDatabaseResponse>(`blacklists/import/event`, {
            data: {
                "ID": id
            }
        })
    }

    static async getImportEvent(id: number): Promise<AxiosResponse<IBlacklistImportEvent>> {
        return api.get<IBlacklistImportEvent>(`blacklists/import/event/${id}`)
    }

    static async getAllSources(): Promise<AxiosResponse<Array<IBlacklistedSource>>> {
        return api.get<Array<IBlacklistedSource>>('blacklists/sources')
    }

    static async postImportSTIX(files: Array<File>, extractAll: boolean): Promise<AxiosResponse<IBlacklistImportEvent>> {
        const form = new FormData();

        form.append("extract_all", extractAll ? "true" : "false")

        files.forEach((value) => {
            form.append("file_upload", value)
        })

        return api.post<IBlacklistImportEvent>('blacklists/import/stix', form, {
            timeout: 30000
        })
    }

    static async postImportCSV(files: Array<File>, extractAll: boolean): Promise<AxiosResponse<IBlacklistImportEvent>> {
        const form = new FormData();

        form.append("extract_all", extractAll ? "true" : "false")

        files.forEach((value) => {
            form.append("file_upload", value)
        })

        return api.post<IBlacklistImportEvent>('blacklists/import/csv', form, {
            timeout: 30000
        })
    }

    static async postExportCSV(filter: IBlacklistedExportFilter): Promise<AxiosResponse<Blob>> {
        return api.post<Blob>('blacklists/export/csv', {
            responseType: 'blob',
        }, {
            timeout: 20000,
            params: {
                'source_id': filter.SourceIDs,
                'import_event_id': filter.ImportEventID,
                'created_after': filter.CreatedAfter ? filter.CreatedAfter.format("YYYY-MM-DD") : null,
                'created_before': filter.CreatedBefore ? filter.CreatedBefore.format("YYYY-MM-DD") : null,
                'is_active': filter.IsActive,
                'only_new': filter.OnlyNew,
            }
        })
    }

    static async postExportNSD(filter: IBlacklistedExportFilter): Promise<AxiosResponse<INaumenExportTicket>> {
        return api.post<INaumenExportTicket>('blacklists/export/naumen', {}, {
            timeout: 20000,
            params: {
                'source_id': filter.SourceIDs,
                'import_event_id': filter.ImportEventID,
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

    static async putDomains(domains: Array<IBlacklistedDomain>): Promise<AxiosResponse<IBlacklistUpdateResponse>> {
        return api.put<IBlacklistUpdateResponse>('blacklists/domain', {
            "hosts": domains.map((value) => {
                return {
                    "host": value.URN,
                    "description": value.Description,
                    "source_id": value.SourceID,
                }
            })
        }, {})
    }

    static async putIPs(domains: Array<IBlacklistedIP>): Promise<AxiosResponse<IBlacklistUpdateResponse>> {
        return api.put<IBlacklistUpdateResponse>('blacklists/ip', {
            "hosts": domains.map((value) => {
                return {
                    "host": value.IPAddress,
                    "description": value.Description,
                    "source_id": value.SourceID,
                }
            })
        }, {})
    }

    static async putURLs(domains: Array<IBlacklistedURL>): Promise<AxiosResponse<IBlacklistUpdateResponse>> {
        return api.put<IBlacklistUpdateResponse>('blacklists/url', {
            "hosts": domains.map((value) => {
                return {
                    "host": value.URL,
                    "description": value.Description,
                    "source_id": value.SourceID,
                }
            })
        }, {})
    }

    static async putEmails(domains: Array<IBlacklistedEmail>): Promise<AxiosResponse<IBlacklistUpdateResponse>> {
        return api.put<IBlacklistUpdateResponse>('blacklists/email', {
            "hosts": domains.map((value) => {
                return {
                    "host": value.Email,
                    "description": value.Description,
                    "source_id": value.SourceID,
                }
            })
        }, {})
    }
}

export interface IBlacklistedSearchFilter {
    Limit: number

    SourceIDs?: Array<number>
    ImportEventID: number | null
    IsActive?: boolean
    CreatedAfter: Dayjs | null
    CreatedBefore: Dayjs | null
    SearchString?: string
    Offset: number
}

export interface IBlacklistedExportFilter {
    SourceIDs?: Array<number>
    ImportEventID?: number
    IsActive?: boolean
    OnlyNew?: boolean
    CreatedAfter: Dayjs | null
    CreatedBefore: Dayjs | null
}

export interface IBlacklistImportEventsFilter {
    Limit: number

    CreatedAfter: Dayjs | null
    CreatedBefore: Dayjs | null
    Type?: string
    Offset: number
}

export interface INaumenExportTicket {
    Data: Array<string>
    System: string
    TicketID: number

    CreatedAt: Dayjs
    DeletedAt: Dayjs | null
    UpdatedAt: Dayjs | null
}

export const HostTypes: Array<{ label: string, value: number, host: "domain" | "url" | "ip" }> = [
    {value: 1, label: "Домены", host: "domain"},
    {value: 2, label: "URL", host: "url"},
    {value: 3, label: "IP адреса", host: "ip"},
]

export interface IBlacklistUpdateResponse {
    RowsAffected: number
    StatusCode: number
    Warnings: Array<string>
}