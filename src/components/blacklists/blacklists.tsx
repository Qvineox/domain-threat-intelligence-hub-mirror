import {Fragment} from "react";
import {Outlet} from "react-router-dom";
import "@/styles/blacklists.scss"

export default function Blacklists() {
    return <Fragment>
        <Outlet/>
    </Fragment>
}