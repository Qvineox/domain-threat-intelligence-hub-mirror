import {
    AppBar, Autocomplete, Backdrop,
    Button, ButtonGroup,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent, FormControlLabel,
    IconButton, LinearProgress, Switch,
    TextField,
    Toolbar
} from "@mui/material";
import {forwardRef, Fragment, ReactElement, Ref, useEffect, useState} from "react";
import {TransitionProps} from "@mui/material/transitions";
import Slide from '@mui/material/Slide';

import CloseIcon from '@mui/icons-material/Close';
import {IUser} from "@/entities/users/user.ts";
import UserService from "@/services/userService.ts";
import {ApiError} from "@/http/api.ts";
import {AxiosError} from "axios";
import {toast} from "react-toastify";
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import {IPermission} from "@/entities/users/permission.ts";
import {getPasswordHint, getPasswordProgressColor, PasswordChangeDialog} from "@/components/profile/profile";
import AuthService from "@/services/authService.ts";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface IUserEditDialogProps {
    userID: number | null
    onClose: () => void
}

const defaultUser: IUser = {
    ID: 0,
    FullName: "",
    Login: "",
    Email: "",
    IsActive: true,
    Permissions: []
}

export default function UserEditDialog(props: IUserEditDialogProps) {
    const [defaultUserData, setDefaultUserData] = useState<IUser>()
    const [editUserData, setEditUserData] = useState<IUser>()

    const [permissions, setPermissions] = useState<Array<IPermission>>([])

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [showPasswordDialog, setShowPasswordDialog] = useState<boolean>(false)

    const [passwordRepeat, setPasswordRepeat] = useState<string>("")
    const [passwordStrength, setPasswordStrength] = useState<number>(0)

    useEffect(() => {
        UserService.getPermissions().then((response) => {
            setPermissions(response.data)
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error)

            toast.error("Ошибка получения доступных привилегий.")
        })

        if (props.userID) {
            setIsLoading(true)

            UserService.getUser(props.userID).then((response) => {
                setDefaultUserData(response.data)
                setEditUserData(response.data)
            }).catch((error: AxiosError<ApiError>) => {
                console.error(error)

                toast.error("Ошибка получения данных о пользователе.")
            }).finally(() => {
                setIsLoading(false)
            })
        } else if (props.userID === 0) {
            setDefaultUserData(defaultUser)
            setEditUserData(defaultUser)
        }
    }, [props.userID])

    useEffect(() => {
        if (passwordRepeat.length >= 8) {
            AuthService.getPasswordStrength(passwordRepeat)
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
    }, [passwordRepeat]);

    const handleClose = () => {
        setDefaultUserData(undefined)
        setEditUserData(undefined)

        props.onClose()
    }

    const handleSubmit = () => {
        if (editUserData) {
            setIsLoading(true)

            if (editUserData.ID === 0) {
                UserService.putUser(editUserData).then(() => {
                    toast.success("Учетная запись пользователя обновлена.")
                }).catch((error: AxiosError<ApiError>) => {
                    console.error(error)

                    toast.error("Ошибка обновления учетной записи пользователя.")
                }).finally(() => {
                    setIsLoading(false)
                })
            } else {
                UserService.patchUser(editUserData).then(() => {
                    toast.success("Учетная запись пользователя создана.")
                }).catch((error: AxiosError<ApiError>) => {
                    console.error(error)

                    toast.error("Ошибка создания учетной записи пользователя.")
                }).finally(() => {
                    setIsLoading(false)
                })
            }


        }
    }

    const restoreDefaultUser = () => {
        setEditUserData(defaultUserData)
    }

    return <Dialog
        fullScreen
        open={props.userID !== null}
        onClose={props.onClose}
        TransitionComponent={Transition}
    >
        <AppBar color={'primary'} sx={{position: 'relative'}}>
            <Toolbar>
                <IconButton edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                >
                    <CloseIcon/>
                </IconButton>
                {
                    props.userID !== 0 ? <h4>Изменение пользователя ID#{props.userID}</h4> :
                        <h4>Создание нового пользователя</h4>
                }
            </Toolbar>
        </AppBar>
        {
            editUserData ? <DialogContent className={'edit-dialog'}>
                <div className="edit-dialog_primary-info">
                    <h4>Основная информация</h4>
                    <TextField label={"ФИО"}
                               variant={'filled'}
                               error={editUserData.FullName === ""}
                               value={editUserData?.FullName}
                               onChange={(event) => {
                                   // @ts-ignore
                                   setEditUserData(prevState => ({
                                       ...prevState,
                                       FullName: event.target.value
                                   }))
                               }}/>
                    <TextField label={"Имя пользователя"}
                               variant={'filled'}
                               error={editUserData.Login === ""}
                               value={editUserData?.Login}
                               onChange={(event) => {
                                   // @ts-ignore
                                   setEditUserData(prevState => ({
                                       ...prevState,
                                       Login: event.target.value
                                   }))
                               }}/>
                    <hr/>
                    <h4>Контактная информация</h4>
                    <TextField label={"Почтовый адрес"}
                               variant={'filled'}
                               value={editUserData?.Email}
                               type={'email'}
                               onChange={(event) => {
                                   // @ts-ignore
                                   setEditUserData(prevState => ({
                                       ...prevState,
                                       Email: event.target.value
                                   }))
                               }}/>
                </div>
                <div className="edit-dialog_permissions-info">
                    <h4>Модель доступа</h4>
                    <Autocomplete disablePortal fullWidth multiple
                                  id="permissions"
                                  getOptionLabel={(option) => {
                                      return `${option.ID} ${option.Description}`
                                  }}
                                  getOptionKey={(option) => {
                                      return option.ID
                                  }}
                                  onChange={(_, value) => {
                                      // @ts-ignore
                                      setEditUserData(prevState => ({
                                          ...prevState,
                                          Permissions: value
                                      }))
                                  }}
                                  value={editUserData.Permissions}
                                  isOptionEqualToValue={(option, value) => {
                                      return option.ID === value.ID
                                  }}
                                  options={permissions}
                                  renderInput={(params) => <TextField {...params} label={"Привилегии"}/>}
                    />
                </div>
                <div className="edit-dialog_security-info">
                    <h4>Настройки безопасности</h4>
                    <FormControlLabel control={
                        <Switch onChange={(event) => {
                            // @ts-ignore
                            setEditUserData(prevState => ({
                                ...prevState,
                                IsActive: event.target.checked
                            }))
                        }} checked={editUserData.IsActive}/>
                    } label="Пользователь активен"/>
                    {
                        editUserData.ID === 0 ? <Fragment>
                            <TextField label={"Пароль"}
                                       variant={'filled'}
                                       error={editUserData?.Password !== passwordRepeat}
                                       type={'password'}
                                       value={editUserData?.Password}
                                       onChange={(event) => {
                                           // @ts-ignore
                                           setEditUserData(prevState => ({
                                               ...prevState,
                                               Password: event.target.value
                                           }))
                                       }}/>
                            <TextField label={"Повторите пароль"}
                                       variant={'filled'}
                                       error={editUserData?.Password !== passwordRepeat}
                                       type={'password'}
                                       value={passwordRepeat}
                                       onChange={(event) => {
                                           if (event.target.value) {
                                               setPasswordRepeat(event.target.value)
                                           } else {
                                               setPasswordRepeat("")
                                           }
                                       }}/>
                            <div className="password-change-dialog_strength">
                                <LinearProgress variant="determinate" color={getPasswordProgressColor(passwordStrength)}
                                                value={passwordStrength != 0 ? (passwordStrength * 100) / 4 : 5}/>
                                <p>{getPasswordHint(passwordRepeat.length, passwordStrength)}</p>
                            </div>
                        </Fragment> : <Fragment>
                            <PasswordChangeDialog show={showPasswordDialog} userID={editUserData.ID}
                                                  onClose={() => {
                                                      setShowPasswordDialog(false)
                                                  }}/>
                            <ButtonGroup>
                                <Button color={'warning'} onClick={() => UserService.resetPassword(editUserData.ID)}>
                                    Сбросить пароль
                                </Button>
                                <Button color={'warning'} onClick={() => setShowPasswordDialog(true)}>
                                    Сменить пароль
                                </Button>
                            </ButtonGroup>
                        </Fragment>
                    }
                </div>
            </DialogContent> : <Backdrop
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'rgba(235,237,238,0.2)',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        }
        <hr/>
        <DialogActions>
            <IconButton edge="start"
                        color="primary"
                        aria-label="close"
                        onClick={restoreDefaultUser}
            >
                <RestartAltRoundedIcon/>
            </IconButton>
            {
                editUserData ? <Button
                    disabled={!validateUserForm(editUserData, passwordRepeat, passwordStrength)}
                    variant={'outlined'}
                    onClick={handleSubmit}>
                    Сохранить
                </Button> : <Fragment/>
            }
        </DialogActions>
    </Dialog>
}

const validateUserForm = (user: IUser, passwordRepeat: string, passwordStrength: number) => {
    if (user.ID === 0) {
        if (user.Password) {
            if (user.Password?.length <= 8 || passwordStrength <= 2) {
                return false
            }

            if (user.Password !== passwordRepeat) {
                return false
            }
        } else {
            return false
        }
    }

    return !(user.FullName === "" || user.Login === "");


}