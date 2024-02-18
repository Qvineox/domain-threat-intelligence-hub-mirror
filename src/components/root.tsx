import {Fragment, useContext, useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {
    Backdrop, CircularProgress,
} from "@mui/material";
import "@/styles/root.scss"
import "@/styles/navigation.scss"
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Context} from "@/context.ts";
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {observer} from "mobx-react-lite";
import RootNavigationBar from "@/components/navigation/bar.tsx";
import RootNavigationDrawer from "@/components/navigation/drawer.tsx";


function Root() {
    const {store} = useContext(Context)
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        store.checkAuth()
            .then(() => {
                console.info("requesting user profile")
                store.me()
            })
            .catch((error: AxiosError<ApiError>) => {
                console.warn(error.response?.data.ErrorMessage)

                if (error.response?.data.ErrorMessage === "token expired") {
                    toast.warning("Токен сессии просрочен.")
                }

                navigate("/login")
                return
            })

    }, []);


    return <Fragment>
        <Backdrop
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(235,237,238,0.2)',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
            open={store.isLoading}
        >
            <CircularProgress color="inherit"/>
            <p>Авторизация...</p>
        </Backdrop>
        <RootNavigationDrawer isOpen={isOpen} store={store} setIsOpen={setIsOpen}/>
        <RootNavigationBar setIsOpen={setIsOpen}/>
        {
            !store.isLoading && store.isLoggedIn ? <Fragment>
                <div id={"root-content-outlet"}>
                    <Outlet/>
                </div>
            </Fragment> : <Fragment/>
        }
        <p id="version-footer">
            [{import.meta.env.VITE_APP_VERSION}_{import.meta.env.VITE_APP_BRANCH}_{import.meta.env.VITE_BUILD_ID}]
        </p>
    </Fragment>
}

export default observer(Root)