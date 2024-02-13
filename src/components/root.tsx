import {Fragment, useContext, useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {
    Backdrop, CircularProgress,
} from "@mui/material";
import "@/styles/root.scss"
import "@/styles/navigation.scss"
import {ToastContainer, Slide} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Context} from "@/main.tsx";
import {AxiosError} from "axios";
import {ApiError} from "@/http/api.ts";
import {RootNavigationDrawer} from "@/components/navigation/drawer.tsx";
import {observer} from "mobx-react-lite";
import RootNavigationBar from "@/components/navigation/bar.tsx";


function Root() {
    const {store} = useContext(Context)
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        store.checkAuth()
            .catch((error: AxiosError<ApiError>) => {
                console.warn(error)

                navigate("/login")
            })
            .then(() => {
                store.me()
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
        <RootNavigationDrawer isOpen={isOpen} setIsOpen={setIsOpen}/>
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
        <ToastContainer
            position="bottom-left"
            autoClose={1300}
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
    </Fragment>
}

export default observer(Root)