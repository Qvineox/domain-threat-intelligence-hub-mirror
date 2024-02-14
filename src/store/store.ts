import {makeAutoObservable} from "mobx";
import AuthService from "@/services/authService.ts";
import {IUser} from "@/entities/users/user.ts";
import UserService from "@/services/userService.ts";

export default class Store {
    isLoggedIn = false
    isLoading = false
    userData = {} as IUser

    constructor() {
        makeAutoObservable(this)
    }

    setLoggedIn(value: boolean) {
        this.isLoggedIn = value
    }

    setUserData(value: IUser) {
        this.userData = value
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
            console.error(e)
        }
    }

    async login(username: string, password: string) {
        try {
            const response = await AuthService.login(username, password)

            console.warn("login access token: " + response.data.AccessToken)

            sessionStorage.setItem('access_token', response.data.AccessToken)

            this.setLoggedIn(true)
        } catch (e) {
            console.error(e)
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
            const response = await AuthService.refresh()
            sessionStorage.setItem('access_token', response.data.AccessToken)

            console.warn("refreshed access token:" + response.data.AccessToken)

            this.setLoggedIn(true)
        } finally {
            this.setLoading(false)
        }
    }
}
