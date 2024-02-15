import {IPermission} from "@/entities/users/permission.ts";

export interface IUser {
    ID: number
    Login: string
    FullName: string
    Email: string
    Password?: string
    IsActive: boolean
    Permissions: Array<IPermission>
}

export function doesUserHasRoleOrAdmin(user: IUser, roleID: number): boolean {
    return user.Permissions.findIndex((value) => {
        return value.ID === roleID || value.ID === 1002
    }) != -1
}