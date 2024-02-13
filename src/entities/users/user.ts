import {IPermission} from "@/entities/users/permission.ts";

export interface IUser {
    ID: number
    Login: string
    FullName: string
    Email: string
    IsActive: boolean
    Permission: Array<IPermission>
}