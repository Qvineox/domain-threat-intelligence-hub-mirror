import {IUser} from "@/entities/users/user.ts";

export interface IUserCardProps {
    user: IUser
    onEdit: (id: number) => void
}

export default function UserCard(props: IUserCardProps) {
    let className: string = 'user-card__inactive'

    if (props.user.IsActive) {
        className = 'user-card__active'
    }

    return <li onClick={() => props.onEdit(props.user.ID)}
               className={`user-card ${className}`}>
        <h3>{props.user.FullName}</h3>
        <p>{props.user.Email}</p>
        <hr/>
    </li>
}