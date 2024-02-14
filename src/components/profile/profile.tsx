import {Fragment, useContext, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    LinearProgress,
    Skeleton,
    TextField
} from "@mui/material";
import {IUser} from "@/entities/users/user.ts";
import "@/styles/profile.scss"
import {IPermission} from "@/entities/users/permission.ts";
import UserService from "@/services/userService.ts";
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {toast} from "react-toastify";
import AuthService from "@/services/authService.ts";
import {useNavigate} from "react-router-dom";
import {Context} from "@/main.tsx";

const defaultUser: IUser = {
    FullName: "Тест Тест Тест",
    Email: "test@email.ru",
    ID: 1,
    Login: "test",
    IsActive: true,
    Permissions: [
        {
            ID: 1002,
            IsActive: true,
            Name: "auth::login",
            Description: "Может входить в систему"
        }
    ],
}

export default function Profile() {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [userData, setUserData] = useState<IUser>(defaultUser)
    const [showPasswordDialog, setShowPasswordDialog] = useState<boolean>(false)

    const {store} = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Мой профиль`

        fetchUser()
    }, [])

    const fetchUser = () => {
        setLoading(true)

        UserService.me().then((response) => {
            if (response.data) {
                setUserData(response.data)
            }
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error)
            toast.error("Ошибка получения данных о пользователе")
        }).finally(() => {
            setLoading(false)
        })
    }

    const logout = () => {
        AuthService.logout().then(() => {
            store.logout().finally(() => {
                navigate("/login")
            })
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error)
            toast.error("Ошибка получения данных о пользователе")
        })
    }

    return <div className={'my-profile'}>
        <PasswordChangeDialog show={showPasswordDialog}
                              onClose={() => setShowPasswordDialog(false)}
                              userID={userData.ID}/>
        <div className={'my-profile_actions'}>
            <Button onClick={() => setShowPasswordDialog(true)}
                    variant={'outlined'}
                    color={'info'}>
                Сменить пароль
            </Button>
            <Button onClick={logout}
                    variant={'outlined'}
                    color={'warning'}>
                Выйти
            </Button>
        </div>
        <div className={'my-profile_info'}>
            <div className={'my-profile_info_icon'}>
            </div>
            <div className={'my-profile_info_about'}>
                {
                    isLoading ? <Fragment>
                        <Skeleton variant="text" width={'30vw'} height={75}/>
                        <Skeleton variant="text" width={250} height={40}/>
                        <Skeleton variant="text" width={110} height={40}/>
                    </Fragment> : <Fragment>
                        <h2>{userData.FullName}</h2>
                        <h3>{userData.Email}</h3>
                        <h4>ID#{userData.ID}</h4>
                    </Fragment>
                }
            </div>
            <div className={'my-profile_info_status'}>
                {
                    isLoading ? <Fragment>
                        <Skeleton variant="text" width={'15vw'} height={45}/>
                        <Skeleton variant="text" width={250} height={30}/>
                    </Fragment> : <Fragment>
                        <h3 className={userData.IsActive ? "active" : "not-active"}>{userData.IsActive ? "активен" : "не активен"}</h3>
                        {
                            isAdmin(userData.Permissions) ?
                                <h3 className={"admin"}>доступ администратора</h3> :
                                <Fragment/>
                        }
                    </Fragment>
                }
            </div>
        </div>
        <div className={'my-profile_activity'}>

        </div>
    </div>
}

const isAdmin = (permissions: Array<IPermission>) => {
    return permissions.findIndex(value => {
        return value.ID === 1002
    }) !== -1
}

interface IPasswordChangeDialogProps {
    show: boolean
    onClose: () => void
    userID: number
}

function PasswordChangeDialog(props: IPasswordChangeDialogProps) {
    const [oldPassword, setOldPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [passwordStrength, setPasswordStrength] = useState<number>(0)

    const {store} = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        if (newPassword.length >= 8) {
            AuthService.getPasswordStrength(newPassword)
                .then((response) => {
                    if (response.data) {
                        setPasswordStrength(response.data.Level)
                    } else {
                        setPasswordStrength(0)
                    }
                })
                .catch((error: AxiosError<ApiError>) => {
                    console.error(error)

                    setPasswordStrength(0)
                })
        } else {
            setPasswordStrength(0)
        }
    }, [newPassword]);

    const changePassword = () => {
        UserService.changePassword(props.userID, oldPassword, newPassword).then(() => {
            AuthService.logout().then(() => {
                store.logout().finally(() => {
                    navigate("/login")
                })
            })
        }).catch((error: AxiosError<ApiError>) => {
            if (error.response) {
                console.error(error.response.data.ErrorMessage)
            }

            toast.error("Ошибка смены пароля.")
        })
    }

    return <Dialog open={props.show} onClose={() => {
        setNewPassword("")
        setOldPassword("")

        props.onClose()
    }}>
        <DialogTitle>
            Смена пароля пользователя
        </DialogTitle>
        <DialogContent className={"password-change-dialog"}>
            <TextField id="old-password" autoFocus
                       type={'password'}
                       value={oldPassword}
                       onChange={(event) => {
                           if (event.target.value) {
                               setOldPassword(event.target.value)
                           } else {
                               setOldPassword("")
                           }
                       }}
                       label="Старый пароль"
                       variant={"filled"}/>
            <TextField id="new-password"
                       type={'password'}
                       value={newPassword}
                       onChange={(event) => {
                           if (event.target.value) {
                               setNewPassword(event.target.value)
                           } else {
                               setNewPassword("")
                           }
                       }}
                       label="Новый пароль"
                       variant={"filled"}/>
            <div className="password-change-dialog_strength">
                <LinearProgress variant="determinate" color={getPasswordProgressColor(passwordStrength)}
                                value={passwordStrength != 0 ? (passwordStrength * 100) / 4 : 5}/>
                <p>{getPasswordHint(newPassword.length, passwordStrength)}</p>
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={changePassword}
                    disabled={newPassword.length < 8 || passwordStrength < 2}
                    color={'primary'}
                    autoFocus>
                Сменить пароль
            </Button>
        </DialogActions>
    </Dialog>
}

export const getPasswordProgressColor = (level: number) => {
    if (level < 2) {
        return "error"
    }

    if (level > 3) {
        return "success"
    }

    return "warning"
}

export const getPasswordHint = (length: number, level: number) => {
    if (length < 8) {
        return "Новый пароль слишком короткий"
    }

    if (level < 2) {
        return "Новый пароль слишком слабый"
    }

    return ""
}