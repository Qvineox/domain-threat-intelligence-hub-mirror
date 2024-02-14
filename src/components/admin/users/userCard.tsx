import {IUser} from "@/entities/users/user.ts";

export interface IUserCardProps {
    user: IUser
    onEdit: (id: number) => void
}

export default function UserCard(props: IUserCardProps) {
    return <li onClick={() => props.onEdit(props.user.ID)}
               className={`user-card ${props.user.IsActive ? 'user-card__active' : 'user-card__inactive'}`}>
        <h3>{props.user.FullName}</h3>
        <p>{props.user.Email}</p>
    </li>
}