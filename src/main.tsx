import React from 'react'
import ReactDOM from 'react-dom/client'
import {ObamiumInspector} from "@/components/map/obamiumInspector.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {WebMap} from "@/components/web_map/web_map.tsx";
import "./styles/global.scss"
import Blacklists from "@/components/blacklists/blacklists.tsx";
import HomePage from "@/components/home/home.tsx";
import Root from "@/components/root.tsx";
import BlacklistsViewer from "@/components/blacklists/view/blacklistsViewer.tsx";
import BlacklistImporter from "@/components/blacklists/import/BlacklistImporter.tsx";
import BlacklistExporter from "@/components/blacklists/export/BlacklistExporter.tsx";

const router = createBrowserRouter([
    {
        path: "/web_map",
        element: <WebMap/>,
    },
    {
        path: "/obamium",
        element: <ObamiumInspector/>,
    },
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "/home",
                element: <HomePage/>,
            },
            {
                path: "/blacklists",
                element: <Blacklists/>,
                children: [
                    {
                        path: "/blacklists/view",
                        element: <BlacklistsViewer/>
                    },
                    {
                        path: "/blacklists/import",
                        element: <BlacklistImporter/>
                    },
                    {
                        path: "/blacklists/export",
                        element: <BlacklistExporter/>
                    }
                ]
            }
        ]
    },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
