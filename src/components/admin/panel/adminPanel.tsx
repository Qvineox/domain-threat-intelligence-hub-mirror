import {NavLink} from "react-router-dom";

export default function AdminPanel() {
    return <div className={'panel'}>
        <h2>Панель управления платформой</h2>
        <nav>
            <NavLink to={"/admin/users"}> / Пользователи</NavLink>
            <NavLink to={"/admin/configuration"}> / Система</NavLink>
        </nav>
    </div>
}