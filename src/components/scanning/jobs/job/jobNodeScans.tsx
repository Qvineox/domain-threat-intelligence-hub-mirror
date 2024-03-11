import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {INetworkNodeScan, NetworkNodeScanType} from "@/entities/nodes/networkNodeScan.ts";
import {Dispatch, SetStateAction} from "react";

interface IJobNodesProps {
    nodes: Array<INetworkNodeScan>
    setSelectedNodeScan: Dispatch<SetStateAction<INetworkNodeScan | undefined>>
    isLoading: boolean
}

export default function JobNodeScans(props: IJobNodesProps) {
    const columns: GridColDef[] = [
        {
            field: 'ID',
            headerName: 'ID',
            flex: 1,
        },
        {
            field: 'Identity',
            headerName: 'Узел',
            flex: 2,
            valueGetter: (params) => params.row?.Node.Identity,
        },
        {
            field: 'Type',
            headerName: 'Тип',
            flex: 1,
            headerAlign: "right",
            align: "right",
            valueGetter: (params) => params.row?.TypeID,
            valueFormatter: (params) => {
                switch (params.value) {
                    case NetworkNodeScanType.SCAN_TYPE_OSS_VT:
                        return "OSS/VT"
                    case NetworkNodeScanType.SCAN_TYPE_OSS_IPQS:
                        return "OSS/IPQS"
                    case NetworkNodeScanType.SCAN_TYPE_OSS_SHD:
                        return "OSS/SHD"
                    case NetworkNodeScanType.SCAN_TYPE_OSS_CS:
                        return "OSS/CS"
                    default:
                        return "Неизвестно"
                }
            }
        },
    ]

    return <div className={'job-viewer_content_nodes'}>
        <DataGrid
            rows={props.nodes}
            rowCount={props.nodes.length}
            rowHeight={42}
            loading={props.isLoading}
            columns={columns}
            getRowId={(row: INetworkNodeScan) => row.ID}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 50,
                    },
                },
            }}
            onRowClick={params => {
                props.setSelectedNodeScan(params.row)
            }}
        />
    </div>
}