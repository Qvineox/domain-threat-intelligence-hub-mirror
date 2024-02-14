import "@/styles/admin.scss"
import {Fragment, useContext, useEffect} from "react";
import {Context} from "@/main.tsx";
import {IPermission} from "@/entities/users/permission.ts";
import {Outlet} from "react-router-dom";
import {observer} from "mobx-react-lite";

function AdminArea() {
    const {store} = useContext(Context)

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Панель администратора`
    }, []);


    return <div className={'admin-area'}>
        {
            !store.isLoading && store.isLoggedIn && store.userData.Permissions ? <Fragment>
                    {
                        canAccessAdminArea(store.userData.Permissions) ? <Outlet/>
                            :
                            <Fragment/>
                    }
                </Fragment>
                :
                <Fragment/>
        }
    </div>
}

const canAccessAdminArea = (permissions: Array<IPermission>) => {
    return permissions.findIndex((value) => {
        return value.ID === 1002
    })
}

export default observer(AdminArea)