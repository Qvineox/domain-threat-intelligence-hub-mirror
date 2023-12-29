import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import {Map} from "@/components/map/map.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Map/>
    </React.StrictMode>,
)
