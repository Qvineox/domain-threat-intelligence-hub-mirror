import solarSvg from "/images/solar.svg"
import "@/styles/home.scss"
import {NavLink} from "react-router-dom";
import {Fragment, useContext, useEffect} from "react";
import {Context} from "@/context.ts";

export default function HomePage() {
    const {store} = useContext(Context)

    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Домашняя страница`
    }, [])

    return <div className={"home-page"}>
        <h1>// {import.meta.env.VITE_HOME_NAME}</h1>
        <img className={"spinning-orbit"}
             src={solarSvg}
             alt="spinning-orbit"/>
        <nav className={"home-page_navigation"}>
            {store.hasPermissionOrAdmin(4001) ? <div className={"home-page_navigation_group"}>
                <NavLink to={"/blacklists"}>/ блокировки</NavLink>
                <NavLink to={"/blacklists/view"}>/ просмотр</NavLink>
                <NavLink to={"/blacklists/imports"}>/ события</NavLink>
                <NavLink to={"/blacklists/import"}>/ импорт</NavLink>
                <NavLink to={"/blacklists/export"}>/ экспорт</NavLink>
            </div> : <Fragment/>}
            {store.hasPermissionOrAdmin(3001) ? <div className={"home-page_navigation_group"}>
                <NavLink to={"/nodes/view"}>/ сетевые узлы</NavLink>
                <NavLink to={"/nodes/map"}>/ карта сети</NavLink>
            </div> : <Fragment/>}
            {store.hasPermissionOrAdmin(5001) ? <div className={"home-page_navigation_group"}>
                <NavLink to={"/scan/view"}>/ сканирование</NavLink>
                <NavLink to={"/scan/agents"}>/ агенты</NavLink>
                <NavLink to={"/nodes/jobs"}>/ задачи</NavLink>
            </div> : <Fragment/>}
            <div className={"home-page_navigation_group"}>
                <NavLink to={"/profile"}>/ профиль</NavLink>
            </div>
        </nav>
    </div>
}