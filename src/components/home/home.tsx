import solarSvg from "/images/solar.svg"
import "@/styles/home.scss"
import {NavLink} from "react-router-dom";
import {useEffect} from "react";

export default function HomePage() {
    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Домашняя страница`
    }, [])

    return <div className={"home-page"}>
        <h1>// {import.meta.env.VITE_HOME_NAME}</h1>
        <img className={"spinning-orbit"}
             src={solarSvg}
             alt="spinning-orbit"/>
        <nav className={"home-page_navigation"}>
            <div className={"home-page_navigation_group"}>
                <NavLink to={"/blacklists"}>/ блокировки</NavLink>
                <NavLink to={"/blacklists/view"}>/ просмотр</NavLink>
                <NavLink to={"/blacklists/imports"}>/ события</NavLink>
                <NavLink to={"/blacklists/import"}>/ импорт</NavLink>
                <NavLink to={"/blacklists/export"}>/ экспорт</NavLink>
            </div>
            <div className={"home-page_navigation_group"}>
                <NavLink to={"/scan/view"}>/ сканирование</NavLink>
                <NavLink to={"/scan/agents"}>/ агенты</NavLink>
                <NavLink to={"/nodes/jobs"}>/ задачи</NavLink>
            </div>
            <div className={"home-page_navigation_group"}>
                <NavLink to={"/nodes/view"}>/ сетевые узлы</NavLink>
                <NavLink to={"/nodes/map"}>/ карта сети</NavLink>
            </div>
            <div className={"home-page_navigation_group"}>
                <NavLink to={"/account/profile"}>/ профиль</NavLink>
            </div>
        </nav>
    </div>
}