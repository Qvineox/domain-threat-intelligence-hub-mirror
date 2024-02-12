import {Button, FormControl, FormHelperText, Input, InputLabel} from "@mui/material";
import {useEffect, useState} from "react";
import "@/styles/login.scss"
import AuthService from "@/services/authService.ts";
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {toast} from "react-toastify";

export default function Login() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isEnabled, setIsEnabled] = useState<boolean>(false)

    useEffect(() => {
        if (username.length > 0 && password.length > 0) {
            setIsEnabled(true)
        }
    }, [username, password])

    const login = () => {
        AuthService.login(username, password).then((response) => {
            console.debug(response.data.AccessToken)
        }).catch((error: AxiosError<ApiError>) => {
            console.error(error)
            toast.error("Ошибка авторизации.")
        })
    }

    return <div className={"login-page"}>
        <div className="login-page_form">
            <FormControl variant={'outlined'}>
                <InputLabel htmlFor="username">Имя пользователя</InputLabel>
                <Input required value={username}
                       onChange={(event) => {
                           setUsername(event.target.value)
                       }}
                       id="username"
                       type={'login'}
                       aria-describedby="username-helper"/>
                <FormHelperText id="username-helper">Логин пользователя в системе</FormHelperText>
            </FormControl>
            <FormControl variant={'outlined'}>
                <InputLabel htmlFor="password">Пароль</InputLabel>
                <Input required value={password}
                       onChange={(event) => {
                           setPassword(event.target.value)
                       }}
                       id="password"
                       type={'password'}
                       aria-describedby="password-helper"/>
                <FormHelperText id="password-helper">Пароль пользователя</FormHelperText>
            </FormControl>
            <Button disabled={!isEnabled}
                    color={'success'}
                    onClick={login}
                    variant={'outlined'}>
                Войти
            </Button>
        </div>
    </div>
}