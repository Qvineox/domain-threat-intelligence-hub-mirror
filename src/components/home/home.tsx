import solarSvg from "/images/solar.svg"
import "@/styles/home.scss"
import {NavLink} from "react-router-dom";
import {useEffect} from "react";

export default function HomePage() {
    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Домашняя страница`
    }, [])

    return <div className={"home-page"}>
        <img className={"spinning-orbit"}
             src={solarSvg}
             alt="spinning-orbit"/>
        <nav className={"home-page_navigation"}>
            <div className={"home-page_navigation_group"}>
                <NavLink to={"/blacklists"}>/ блокировки</NavLink>
                <NavLink to={"/blacklists/view"}>/ просмотр</NavLink>
                <NavLink to={"/blacklists/import"}>/ импорт</NavLink>
                <NavLink to={"/blacklists/export"}>/ экспорт</NavLink>
            </div>
            <div className={"home-page_navigation_group"}>
                <NavLink to={"/blacklists"}>/ карта сети</NavLink>
            </div>
            <div className={"home-page_navigation_group"}>
                <NavLink to={"/blacklists"}>/ сетевые узлы</NavLink>
            </div>
            <div className={"home-page_navigation_group"}>
                <NavLink to={"/blacklists"}>/ профиль</NavLink>
            </div>
        </nav>
    </div>
}