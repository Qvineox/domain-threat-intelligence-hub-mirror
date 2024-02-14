import {AxiosResponse} from "axios";
import {api} from "@/http/api.ts";
import {IUser} from "@/entities/users/user.ts";

export default class UserService {

    static async me(): Promise<AxiosResponse<IUser>> {
        return api.get<IUser>('users/me',)
    }

    static async changePassword(id: number, oldPassword: string, newPassword: string): Promise<AxiosResponse> {
        return api.post('users/password/change', {
            ID: id,
            NewPassword: newPassword,
            OldPassword: oldPassword,
        })
    }
}