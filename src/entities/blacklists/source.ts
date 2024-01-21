import {Dayjs} from "dayjs";

export interface IBlacklistedSource {
    Name: string
    Description: string
    ID: number
    CreatedAt: Dayjs
    UpdatedAt: Dayjs
    DeletedAt?: Dayjs
}