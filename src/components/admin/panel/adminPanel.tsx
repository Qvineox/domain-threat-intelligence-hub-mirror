import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Fragment, useContext, useEffect} from "react";
import {Context} from "@/context.ts";

function AdminPanel() {
    const {store} = useContext(Context)

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Панель администратора`
    }, []);

    return <div className={'panel'}>
        <h2>Панель управления платформой</h2>
        <nav>
            {
                store.hasPermissionOrAdmin(2001) ?
                    <NavLink to={"/admin/users"}> / Пользователи</NavLink> : <Fragment/>
            }
            {
                store.hasPermissionOrAdmin(6001) ?
                    <NavLink to={"/admin/configuration"}> / Система</NavLink> : <Fragment/>
            }
        </nav>
    </div>
}

export default observer(AdminPanel)