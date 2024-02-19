import {AxiosResponse} from "axios";
import {api} from "@/http/api.ts";
import {IDynamicConfig} from "@/entities/dynamicConfig/dynamicConfig.ts";

export default class SystemStateService {
    static async getSystemState(): Promise<AxiosResponse<IDynamicConfig>> {
        return api.get<IDynamicConfig>('system/dynamic',)
    }

    static updateNaumenConfig(enabled: boolean, url: string, cID: number, gID: number, key: string): Promise<AxiosResponse> {
        return api.post('system/dynamic/naumen', {
            ClientGroupID: gID,
            ClientID: cID,
            ClientKey: key,
            Enabled: enabled,
            URL: url
        })
    }

    static updateNaumenServiceConfig(agreementID: number, slm: number, callType: string, hostTypes: Array<string>): Promise<AxiosResponse> {
        return api.post('system/dynamic/naumen/blacklists', {
            AgreementID: agreementID,
            SLM: slm,
            CallType: callType,
            HostTypes: hostTypes,
        })
    }

    static updateSMTPConfig(enabled: boolean, host: string, port: number, user: string, from: string, password: string, ssl: boolean, auth: boolean): Promise<AxiosResponse> {
        return api.post('system/dynamic/smtp', {
            Enabled: enabled,
            UseAuth: auth,
            Host: host,
            Port: port,
            User: user,
            From: from,
            Password: password,
            SSL: ssl,
        })
    }

    static resetConfig(): Promise<AxiosResponse> {
        return api.post('system/dynamic/reset', {})
    }
}