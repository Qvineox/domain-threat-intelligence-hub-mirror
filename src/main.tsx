import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {WebMap} from "@/components/web_map/web_map.tsx";
import "./styles/global.scss"
import Blacklists from "@/components/blacklists/blacklists.tsx";
import HomePage from "@/components/home/home.tsx";
import BlacklistsViewer from "@/components/blacklists/view/blacklistsViewer.tsx";
import BlacklistImporter from "@/components/blacklists/import/blacklistImporter.tsx";
import BlacklistExporter from "@/components/blacklists/export/blacklistExporter.tsx";
import BlacklistsStats from "@/components/blacklists/stats/blacklistsStats.tsx";
import BlacklistImportEventsViewer from "@/components/blacklists/importEvents/blacklistImportEventsViewer.tsx";
import BlacklistImportEventViewer from "@/components/blacklists/importEvents/blacklistImportEventViewer.tsx";
import PageNotFound from "@/components/fallbacks/pageNotFound.tsx";
import Login from "@/components/login/login.tsx";
import {Fragment} from "react";
import Root from "@/components/root.tsx";
import Profile from "@/components/profile/profile.tsx";
import AdminArea from "@/components/admin/adminArea.tsx";
import Users from "@/components/admin/users/users.tsx";
import AdminPanel from "@/components/admin/panel/adminPanel.tsx";
import Configuration from "@/components/admin/configuration/configuration.tsx";
import {Slide, ToastContainer} from "react-toastify";
import Scanning from "@/components/scanning/scanning.tsx";
import Scanner from "@/components/scanning/scanner/scanner.tsx";
import JobsViewer from "@/components/scanning/jobs/jobsViewer.tsx";
import AgentsViewer from "@/components/scanning/agents/agentsViewer.tsx";

const router = createBrowserRouter([
    {
        path: "/web_map",
        element: <WebMap/>,
    },
    {
        path: "/login",
        element: <Login/>,
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
                path: "/profile",
                element: <Profile/>,
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
                path: "/scanning",
                element: <Scanning/>,
                children: [
                    {
                        path: "/scanning",
                        element: <Navigate to="/scanning/scanner" replace/>,
                    },
                    {
                        path: "/scanning/scanner",
                        element: <Scanner/>,
                    },
                    {
                        path: "/scanning/jobs",
                        element: <JobsViewer/>,
                    },
                    {
                        path: "/scanning/agents",
                        element: <AgentsViewer/>,
                    },
                ]
            },
            {
                path: "/admin",
                element: <AdminArea/>,
                children: [
                    {
                        path: "/admin",
                        element: <AdminPanel/>,
                    },
                    {
                        path: "/admin/users",
                        element: <Users/>,
                    },
                    {
                        path: "/admin/configuration",
                        element: <Configuration/>,
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
    <Fragment>
        <RouterProvider router={router}/>
        <ToastContainer position="bottom-left"
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
)

