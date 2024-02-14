import {Divider, Drawer, ListItemIcon, ListItemText, MenuItem, MenuList} from "@mui/material";
import {NavLink} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ViewListIcon from "@mui/icons-material/ViewList";
import HubIcon from "@mui/icons-material/Hub";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

export interface RootNavigationDrawerProps {
    isOpen: boolean
    setIsOpen: (status: boolean) => void
}

export function RootNavigationDrawer(props: RootNavigationDrawerProps) {
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
            <NavLink to={"/blacklists"} onClick={handleClose}>
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