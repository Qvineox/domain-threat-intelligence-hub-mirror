import {Fragment, ReactNode, useState} from "react";
import {NavLink, Outlet, useLocation} from "react-router-dom";
import {
    Breadcrumbs,
    Divider,
    Drawer,
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem, MenuList,
} from "@mui/material";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MenuIcon from '@mui/icons-material/Menu';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import HomeIcon from '@mui/icons-material/Home';
import HubIcon from '@mui/icons-material/Hub';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import "@/styles/root.scss"
import "@/styles/navigation.scss"
import {ToastContainer, Slide} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Root() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return <Fragment>
        <RootNavigationDrawer isOpen={isOpen} setIsOpen={setIsOpen}/>
        <RootNavigationBar setIsOpen={setIsOpen}/>
        <div id={"root-content-outlet"}>
            <Outlet/>
        </div>
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

interface RootNavigationDrawerProps {
    isOpen: boolean
    setIsOpen: (status: boolean) => void
}

function RootNavigationDrawer(props: RootNavigationDrawerProps) {
    const handleClose = () => {
        props.setIsOpen(false)
    }

    return <Drawer anchor={'left'}
                   onClose={() => props.setIsOpen(false)}
                   open={props.isOpen}>
        <MenuList dense>
            <NavLink to={"/home"} onClick={handleClose}>
                <MenuItem>
                    <ListItemIcon>
                        <HomeIcon fontSize="medium"/>
                    </ListItemIcon>
                    <ListItemText>Домашняя страница</ListItemText>
                </MenuItem>
            </NavLink>
            <Divider/>
            <NavLink to={"/nodes/view"} onClick={handleClose}>
                <MenuItem>
                    <ListItemIcon>
                        <ViewListIcon fontSize="medium"/>
                    </ListItemIcon>
                    <ListItemText>Сетевые узлы</ListItemText>
                </MenuItem>
            </NavLink>
            <NavLink to={"/nodes/map"} onClick={handleClose}>
                <MenuItem>
                    <ListItemIcon>
                        <HubIcon fontSize="medium"/>
                    </ListItemIcon>
                    <ListItemText>Карта сети</ListItemText>
                </MenuItem>
            </NavLink>
            <Divider/>
            <NavLink to={"/blacklists/view"} onClick={handleClose}>
                <MenuItem>
                    <ListItemIcon>
                        <LocalFireDepartmentIcon/>
                    </ListItemIcon>
                    <ListItemText>Блокировки</ListItemText>
                </MenuItem>
            </NavLink>
            <NavLink to={"/blacklists/import"} onClick={handleClose}>
                <MenuItem>
                    <ListItemIcon>
                        <UploadFileIcon fontSize="medium"/>
                    </ListItemIcon>
                    <ListItemText>Импорт</ListItemText>
                </MenuItem>
            </NavLink>
            <NavLink to={"/blacklists/export"} onClick={handleClose}>
                <MenuItem>
                    <ListItemIcon>
                        <FileDownloadIcon fontSize="medium"/>
                    </ListItemIcon>
                    <ListItemText>Экспорт</ListItemText>
                </MenuItem>
            </NavLink>
            <Divider/>
            <NavLink to={"/account/profile"} onClick={handleClose}>
                <MenuItem>
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="medium"/>
                    </ListItemIcon>
                    <ListItemText>Профиль</ListItemText>
                </MenuItem>
            </NavLink>
            <NavLink to={"/account/logout"} onClick={handleClose}>
                <MenuItem>
                    <ListItemIcon>
                        <LogoutIcon fontSize="medium"/>
                    </ListItemIcon>
                    <ListItemText>Выйти</ListItemText>
                </MenuItem>
            </NavLink>
        </MenuList>
    </Drawer>
}

interface RootNavigationBarProps {
    setIsOpen: (status: boolean) => void
}

function RootNavigationBar(props: RootNavigationBarProps) {
    const location = useLocation();

    return <nav id={"navigation-bar"}>
        <IconButton onClick={() => props.setIsOpen(true)}>
            <MenuIcon/>
        </IconButton>
        <Breadcrumbs maxItems={3} aria-label="breadcrumb">
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
            case "":
                name = "Домашняя страница"
                href = ""
        }

        return <NavLink key={index} to={href}>
            {name}
        </NavLink>
    })
}