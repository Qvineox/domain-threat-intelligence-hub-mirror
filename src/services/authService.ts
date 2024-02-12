import {AxiosResponse} from "axios";
import api from "@/http/api.ts";

export default class AuthService {
    static async login(username: string, password: string): Promise<AxiosResponse<Token>> {
        return api.post<Token>('auth/login', {
            'username': username,
            'password': password,
        })
    }

    static async refresh(): Promise<AxiosResponse> {
        return api.post('auth/refresh',)
    }

    static async logout(): Promise<AxiosResponse> {
        return api.post('auth/logout',)
    }
}

export interface Token {
    AccessToken: string
}