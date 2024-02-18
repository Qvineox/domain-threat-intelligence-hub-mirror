import "@/styles/admin.scss"
import {Outlet} from "react-router-dom";
import {observer} from "mobx-react-lite";

function AdminArea() {
    return <div className={'admin-area'}>
        <Outlet/>
    </div>
}

export default observer(AdminArea)