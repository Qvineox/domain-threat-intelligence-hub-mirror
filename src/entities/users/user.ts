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