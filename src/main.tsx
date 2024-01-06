import React from 'react'
import ReactDOM from 'react-dom/client'
import {ObamiumInspector} from "@/components/map/obamiumInspector.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {WebMap} from "@/components/web_map/web_map.tsx";
import FPSStats from "react-fps-stats";
import "./styles/global.scss"

const router = createBrowserRouter([
    {
        path: "/web_map",
        element: <WebMap/>,
    }, {
        path: "/obamium",
        element: <ObamiumInspector/>,
    }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
        <div id={'fps-meter'}>
            <FPSStats/>
        </div>

    </React.StrictMode>,
)
