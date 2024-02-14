import {AxiosResponse} from "axios";
import {api, apiNoAuth} from "@/http/api.ts";
import {IAccessToken} from "@/entities/auth/token.ts";
import {IPasswordStrength} from "@/entities/auth/passwordStrength.ts";

export default class AuthService {
    static async login(username: string, password: string): Promise<AxiosResponse<IAccessToken>> {
        return apiNoAuth.post<IAccessToken>('auth/login', {
            'username': username,
            'password': password,
        })
    }

    static async reLogin(): Promise<AxiosResponse<IAccessToken>> {
        return apiNoAuth.post<IAccessToken>('auth/refresh',)
    }

    static async refresh(): Promise<AxiosResponse<IAccessToken>> {
        return api.post<IAccessToken>('auth/refresh',)
    }

    static async logout(): Promise<AxiosResponse> {
        return api.post('auth/logout',)
    }

    static async getPasswordStrength(password: string): Promise<AxiosResponse<IPasswordStrength>> {
        return api.post<IPasswordStrength>('auth/password-strength', {
            Password: password
        })
    }
}