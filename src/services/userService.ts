import {AxiosResponse} from "axios";
import {api} from "@/http/api.ts";
import {IUser} from "@/entities/users/user.ts";
import {IPermission} from "@/entities/users/permission.ts";

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

    static async resetPassword(id: number): Promise<AxiosResponse> {
        return api.post('users/password/reset', {
            ID: id,
        })
    }

    static async getUsers(): Promise<AxiosResponse<Array<IUser>>> {
        return api.get<Array<IUser>>('users/users',)
    }

    static async getUser(id: number): Promise<AxiosResponse<IUser>> {
        return api.get<IUser>(`users/user/${id}`,)
    }

    static async patchUser(user: IUser): Promise<AxiosResponse> {
        return api.patch(`users/user`, {
            id: user.ID,
            login: user.Login,
            fullName: user.FullName,
            email: user.Email,
            isActive: user.IsActive,
            permissionIDs: user.Permissions.map((value) => {
                return value.ID
            })
        })
    }

    static async putUser(user: IUser): Promise<AxiosResponse> {
        return api.put(`users/user`, {
            login: user.Login,
            fullName: user.FullName,
            email: user.Email,
            isActive: user.IsActive,
            password: user.Password,
            permissionIDs: user.Permissions.map((value) => {
                return value.ID
            })
        })
    }

    static async getPermissions(): Promise<AxiosResponse<Array<IPermission>>> {
        return api.get<Array<IPermission>>(`users/permissions`,)
    }

}