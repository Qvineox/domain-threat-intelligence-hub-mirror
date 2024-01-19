import api from "@/http/api.ts";
import {AxiosResponse} from "axios";
import {IBlacklistedURL} from "@/entities/blacklists/url.ts";

export default class BlacklistService {
    static async getURLsByFilter(): Promise<AxiosResponse<IBlacklistedURL>> {
        return api.get<IBlacklistedURL>('blacklists/urls', {
            params: {'limit': 100}
        })
    }
}
