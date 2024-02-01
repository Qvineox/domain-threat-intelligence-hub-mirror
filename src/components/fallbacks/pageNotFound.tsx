import "@/styles/fallbacks.scss"
import notFoundPng from "/images/not_found.png"
import {NavLink} from "react-router-dom";
import {useEffect} from "react";

export default function PageNotFound() {
    useEffect(() => {
        document.title = `${import.meta.env.VITE_TITLE_NAME} | Страница не найдена`
    }, []);

    return <div className={"not-found"}>
        <img src={notFoundPng} alt="not found user"/>
        <div className={'actions'}>
            <h1>Страница не найдена</h1>
            <p>Данный раздел приложения еще не завершен</p>
            <hr/>
            <NavLink to={"/home"}>
                <h2>/ домой</h2>
            </NavLink>
            <NavLink to={"https://github.com/Qvineox"}>
                <h2>/ github</h2>
            </NavLink>
        </div>
    </div>
}