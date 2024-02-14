import {Fragment, useEffect, useState} from "react";
import UserService from "@/services/userService.ts";
import {IUser} from "@/entities/users/user.ts";
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {toast} from "react-toastify";
import UserCard from "@/components/admin/users/userCard.tsx";
import UserEditDialog from "@/components/admin/users/editDialog.tsx";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function Users() {
    const [users, setUsers] = useState<Array<IUser>>([])
    const [selectedUserID, setSelectedUserID] = useState<number | null>(null)

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Пользователи`

        UserService.getUsers().then((response) => {
            if (response.data) {
                setUsers(response.data)
            }
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error)
            toast.error("Ошибка получения пользователей.")
        })
    }, []);

    const onEdit = (id: number) => {
        setSelectedUserID(id)
    }

    const handleNewUser = () => {
        setSelectedUserID(0)
    }

    return <div className={"users"}>
        <UserEditDialog userID={selectedUserID}
                        onClose={() => setSelectedUserID(null)}/>
        <h2>Управление пользователями</h2>
        {
            users ? <Fragment>
                <ul>
                    {users.filter((value) => {
                        return value.IsActive
                    }).map((v, index) => {
                        return <UserCard key={index} user={v} onEdit={onEdit}/>
                    })}
                    <li className="new-user" onClick={handleNewUser}>
                        <PersonAddIcon/>
                    </li>
                </ul>
                <hr/>
                <ul>
                    {users.filter((value) => {
                        return !value.IsActive
                    }).map((v, index) => {
                        return <UserCard key={index} user={v} onEdit={onEdit}/>
                    })}
                </ul>
            </Fragment> : <Fragment/>
        }
    </div>
}