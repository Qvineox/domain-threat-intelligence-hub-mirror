import {makeAutoObservable} from "mobx";
import AuthService from "@/services/authService.ts";
import {IUser} from "@/entities/users/user.ts";
import UserService from "@/services/userService.ts";
import {IAccessToken} from "@/entities/auth/token.ts";
import axios from "axios";
import {API_URL} from "@/http/api.ts";

export default class AuthStore {
    isLoggedIn = false
    isLoading = false
    userData = {} as IUser
    permissionIDs: Array<number> = []

    constructor() {
        makeAutoObservable(this)
    }

    setLoggedIn(value: boolean) {
        this.isLoggedIn = value
    }

    hasPermissionOrAdmin(id: number): boolean {
        if (this.permissionIDs !== undefined) {
            return (this.permissionIDs.findIndex(value => {
                return value === 1002 || value === id
            })) !== -1
        }

        return false
    }

    hasAnyOfPermissionsOrAdmin(ids: Array<number>): boolean {
        if (this.isLoggedIn && !this.isLoading && this.userData.Permissions !== undefined) {
            return (this.permissionIDs.findIndex(value => {
                return value === 1002 || ids.includes(value)
            })) !== -1
        }

        return false
    }

    setUserData(value: IUser) {
        this.userData = value

        this.permissionIDs = value.Permissions.map(value => {
            return value.ID
        })
    }

    // setUserData(value: IUser) {
    //     this.userData = value
    // }

    setLoading(value: boolean) {
        this.isLoading = value
    }

    async me() {
        try {
            const response = await UserService.me()
            this.setUserData(response.data)

        } catch (e) {
            throw e
        }
    }

    async login(username: string, password: string) {
        try {
            const response = await AuthService.login(username, password)
            sessionStorage.setItem('access_token', response.data.AccessToken)

            this.setLoggedIn(true)
        } catch (e) {
            throw e
        } finally {
            this.setLoading(false)
        }
    }

    async logout() {
        try {
            await AuthService.logout()

            sessionStorage.removeItem('access_token')
            this.setLoggedIn(false)
        } catch (e) {
            console.error(e)
        } finally {
            this.setLoading(false)
        }
    }

    async checkAuth() {
        this.setLoading(true)

        try {
            const response = await axios.post<IAccessToken>('auth/refresh', {}, {
                baseURL: API_URL,
                withCredentials: true
            })

            sessionStorage.setItem('access_token', response.data.AccessToken)

            this.setLoggedIn(true)
        } catch (e) {
            sessionStorage.removeItem('access_token')
            console.error("refresh failed")

            throw e
        } finally {
            this.setLoading(false)
        }
    }
}
