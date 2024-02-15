import {Button, FormControl, FormHelperText, Input, InputLabel} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import "@/styles/login.scss"
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {Slide, toast, ToastContainer} from "react-toastify";
import {Context} from "@/main.tsx";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const {store} = useContext(Context)
    const navigate = useNavigate()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isEnabled, setIsEnabled] = useState<boolean>(false)

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Вход`
    }, [])

    useEffect(() => {
        if (username.length > 0 && password.length > 0) {
            setIsEnabled(true)
        }
    }, [username, password])

    const useLogin = () => {
        store.login(username, password)
            .catch((error: AxiosError<ApiError>) => {
                switch (error.response?.data.ErrorMessage) {
                    case "user not found": {
                        toast.error("Ошибка авторизации. Пользователь не найден.")
                        break
                    }
                    case "password invalid": {
                        toast.error("Ошибка авторизации. Неверный логин или пароль.")
                        break
                    }
                    default: {
                        toast.error("Ошибка авторизации.")
                    }
                }
            })
            .then(() => {
                console.info("routing home...")

                navigate("/home")
            })
    }

    return <div className={"login-page"}>
        <ToastContainer
            position="bottom-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
        />
        <div className="login-page_form">
            <h1>// {import.meta.env.VITE_HOME_NAME}</h1>
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
                    onClick={useLogin}
                    variant={'outlined'}>
                Войти
            </Button>
        </div>
    </div>
}