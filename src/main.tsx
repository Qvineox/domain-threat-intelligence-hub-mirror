import ReactDOM from 'react-dom/client'
import {ObamiumInspector} from "@/components/map/obamiumInspector.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {WebMap} from "@/components/web_map/web_map.tsx";
import "./styles/global.scss"
import Blacklists from "@/components/blacklists/blacklists.tsx";
import HomePage from "@/components/home/home.tsx";
import Root from "@/components/root.tsx";
import BlacklistsViewer from "@/components/blacklists/view/blacklistsViewer.tsx";
import BlacklistImporter from "@/components/blacklists/import/blacklistImporter.tsx";
import BlacklistExporter from "@/components/blacklists/export/blacklistExporter.tsx";
import BlacklistsStats from "@/components/blacklists/stats/blacklistsStats.tsx";
import BlacklistImportEventsViewer from "@/components/blacklists/importEvents/blacklistImportEventsViewer.tsx";
import BlacklistImportEventViewer from "@/components/blacklists/importEvents/blacklistImportEventViewer.tsx";
import PageNotFound from "@/components/fallbacks/pageNotFound.tsx";

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
                path: "/",
                element: <Navigate to="/home" replace/>,
            },
            {
                path: "/home",
                element: <HomePage/>,
            },
            {
                path: "/blacklists",
                element: <Blacklists/>,
                children: [
                    {
                        path: "/blacklists",
                        element: <BlacklistsStats/>
                    },
                    {
                        path: "/blacklists/view",
                        element: <BlacklistsViewer/>
                    },
                    {
                        path: "/blacklists/import",
                        element: <BlacklistImporter/>
                    },
                    {
                        path: "/blacklists/imports",
                        element: <BlacklistImportEventsViewer/>
                    },
                    {
                        path: "/blacklists/imports/:id",
                        element: <BlacklistImportEventViewer/>
                    },
                    {
                        path: "/blacklists/export",
                        element: <BlacklistExporter/>
                    }
                ]
            },
            {
                path: "*",
                element: <PageNotFound/>
            }
        ]
    },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)
