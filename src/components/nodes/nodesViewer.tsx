import {Outlet} from "react-router-dom";
import NodeSearchList from "@/components/nodes/nodeSearchList/nodeSearchList.tsx";
import {INetworkNode} from "@/entities/nodes/networkNode.ts";
import {useEffect, useState} from "react";
import NodeSearchFilter from "@/components/nodes/nodeSearchFilter/nodeSearchFilter.tsx";
import "@/styles/nodes.scss"
import NodesService from "@/services/nodesService.ts";
import {toast} from "react-toastify";

export interface INodesSearchFilter {
    searchString: string

    searchIPs: boolean
    searchDomains: boolean
    searchURLs: boolean
    searchEmails: boolean

    searchInactive: boolean
}

const defaultSearchFilter: INodesSearchFilter = {
    searchString: "",
    searchIPs: true,
    searchDomains: true,
    searchURLs: true,
    searchEmails: true,
    searchInactive: false,
}

export default function NodesViewer() {
    const [nodes, setNodes] = useState<Array<INetworkNode>>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [nodesFilter, setNodesFilter] = useState<INodesSearchFilter>(defaultSearchFilter);

    useEffect(() => {
        setIsLoading(true);

        NodesService.getNodesByFilter({
            SearchString: nodesFilter.searchString,
            Limit: 100,
            Offset: 0
        }).then((response) => {
            if (response.data) {
                setNodes(response.data)
            }
        }).catch((response) => {
            console.error(response)
            toast.error("Ошибка получения данных!")
        }).finally(() => {
            setIsLoading(false)
        })
    }, [nodesFilter]);

    return <div className={'node-viewer'}>
        <div className="node-viewer_left-panel">
            <NodeSearchFilter filter={nodesFilter} setFilter={setNodesFilter}/>
            <NodeSearchList isLoading={isLoading} nodes={nodes}/>
        </div>
        <div className="node-viewer_right-panel">
            <Outlet/>
        </div>
    </div>
}

