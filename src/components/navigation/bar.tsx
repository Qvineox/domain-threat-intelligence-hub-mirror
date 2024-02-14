import {NavLink, useLocation} from "react-router-dom";
import {Breadcrumbs, IconButton, Skeleton} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {ReactNode, useContext} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "@/main.tsx";

interface RootNavigationBarProps {
    setIsOpen: (status: boolean) => void
}

function RootNavigationBar(props: RootNavigationBarProps) {
    const location = useLocation();

    const {store} = useContext(Context)

    return <nav id={"navigation-bar"}>
        <div className="navigation-bar_location">
            <IconButton onClick={() => props.setIsOpen(true)}>
                <MenuIcon/>
            </IconButton>
            <Breadcrumbs maxItems={4} aria-label="breadcrumb">
                {parseHrefToBreadcrumbs(location.pathname)}
                {/*<Link underline="hover" color="inherit" href="/">*/}
                {/*    Домой*/}
                {/*</Link>*/}
                {/*<Link underline="hover"*/}
                {/*      color="inherit"*/}
                {/*      href="/blacklists">*/}
                {/*    Блокировки*/}
                {/*</Link>*/}
                {/*<Link underline="hover"*/}
                {/*      color="text.primary"*/}
                {/*      href="/blacklists/view"*/}
                {/*      aria-current="page">*/}
                {/*    Просмотр*/}
                {/*</Link>*/}
            </Breadcrumbs>
        </div>
        <div className="navigation-bar_current-user">
            {!store.isLoading && store.isLoggedIn ? <NavLink to={"/profile"}>
                {store.userData.FullName}
            </NavLink> : <Skeleton itemType={'text'} width={150} height={30}/>}
        </div>
    </nav>
}

function parseHrefToBreadcrumbs(location: string): Array<ReactNode> {
    // const pathname = window.location.pathname
    const links = location.split("/")
    let href = ""

    if (location == "/" || location == "/home") {
        return [<NavLink key={0} to={"/home"}>
            Домашняя страница
        </NavLink>]
    }

    return links.map((value, index) => {
        let name: string = ""

        switch (value) {
            case "view":
                name = "Просмотр"
                href += "/view"
                break
            case "import":
                name = "Импорт"
                href += "/import"
                break
            case "imports":
                name = "События импорта"
                href += "/imports"
                break
            case "export":
                name = "Экспорт"
                href += "/export"
                break
            case "blacklists":
                name = "Блокировки"
                href += "/blacklists"
                break
            case "scans":
                name = "Сканирования"
                href += "/scans"
                break
            case "nodes":
                name = "Узлы"
                href += "/nodes"
                break
            case "map":
                name = "Карта"
                href += "/map"
                break
            case "account":
                name = "Аккаунт"
                href += "/account"
                break
            case "profile":
                name = "Профиль"
                href += "/profile"
                break
            case "admin":
                name = "Панель администратора"
                href += "/admin"
                break
            case "users":
                name = "Пользователи"
                href += "/users"
                break
            case "":
                name = "Домашняя страница"
                href = ""
                break
            default:
                if (!isNaN(Number(value))) {
                    name = "#" + value
                    href += "/" + value
                    break
                }

                name = value
        }

        return <NavLink key={index} to={href}>
            {name}
        </NavLink>
    })
}

export default observer(RootNavigationBar)