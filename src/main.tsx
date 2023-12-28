import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {WebMap} from "@/webMap/components/webMap.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WebMap/>
    </React.StrictMode>,
)
