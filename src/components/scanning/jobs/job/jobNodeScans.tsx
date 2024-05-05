import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {INetworkNodeScan, NetworkNodeScanType} from "@/entities/nodes/networkNodeScan.ts";
import {Chip} from "@mui/material";
import {Fragment} from "react";

interface IJobNodesProps {
    nodes: Array<INetworkNodeScan>
    setSelectedNodeScanID: (id: number) => void
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
            flex: 4,
            valueGetter: (params) => params.row?.Node.Identity,
        },
        {
            field: 'Score',
            headerName: 'Скоринг',
            flex: 1,
            headerAlign: "right",
            align: "right",
            valueGetter: (params) => params.row?.RiskScore,
            renderCell: (params) => {
                let color: "default" | "success" | "error" | "warning" | "primary" | "secondary" | "info" = "default"

                if (params.row.RiskScore == undefined) {
                    return <Fragment/>
                }

                if (params.row.RiskScore < 10) {
                    color = 'success'
                } else if (params.row.RiskScore > 75) {
                    color = 'error'
                } else {
                    if (params.row.RiskScore <= 50) {
                        color = 'default'
                    } else {
                        color = 'warning'
                    }
                }

                return <Chip size={"small"} label={params.row?.RiskScore} variant={"outlined"} color={color}/>;
            },

        },
        {
            field: 'Type',
            headerName: 'Тип',
            flex: 2,
            headerAlign: "right",
            align: "right",
            valueGetter: (params) => params.row?.TypeID,
            valueFormatter: (params) => {
                switch (params.value) {
                    case NetworkNodeScanType.SCAN_TYPE_OSS_VT_IP:
                        return "VT (IP)"
                    case NetworkNodeScanType.SCAN_TYPE_OSS_VT_DOMAIN:
                        return "VT (DOMAIN)"
                    case NetworkNodeScanType.SCAN_TYPE_OSS_VT_URL:
                        return "VT (URL)"
                    case NetworkNodeScanType.SCAN_TYPE_OSS_IPQS_IP:
                        return "IPQS (IP)"
                    case NetworkNodeScanType.SCAN_TYPE_OSS_IPQS_DOMAIN:
                        return "IPQS (DOMAIN)"
                    case NetworkNodeScanType.SCAN_TYPE_OSS_IPQS_URL:
                        return "IPQS (URL)"
                    case NetworkNodeScanType.SCAN_TYPE_OSS_IPQS_EMAIL:
                        return "IPQS (EMAIL)"
                    case NetworkNodeScanType.SCAN_TYPE_OSS_CS_IP:
                        return "CS (IP)"
                    case NetworkNodeScanType.SCAN_TYPE_OSS_SHODAN_IP:
                        return "SHD (IP)"
                    case NetworkNodeScanType.SCAN_TYPE_OSS_IPWH_IP:
                        return "IPWHO (IP)"
                    case NetworkNodeScanType.SCAN_TYPE_OSS_CRIMINAL_IP:
                        return "CRIM (IP)"
                    case NetworkNodeScanType.SCAN_TYPE_OSS_CRIMINAL_DOMAIN:
                        return "CRIM (DOMAIN)"
                    case NetworkNodeScanType.SCAN_TYPE_OSS_INFO_IP:
                        return "INFO (IP)"
                    case NetworkNodeScanType.SCAN_TYPE_OSS_IP_API_IP:
                        return "IP-API (IP)"
                    case NetworkNodeScanType.SCAN_TYPE_OSS_IP_API_DOMAIN:
                        return "IP-API (DOMAIN)"
                    default:
                        return "Неизвестно"
                }
            }
        },
    ]

    return <div className={'job-viewer_content_nodes'}>
        <DataGrid
            autoHeight
            rows={props.nodes}
            rowCount={props.nodes.length}
            rowHeight={32}
            loading={props.isLoading}
            columns={columns}
            getRowId={(row: INetworkNodeScan) => row.ID}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 20,
                    },
                },
            }}
            pageSizeOptions={[20]}
            onRowClick={params => {
                props.setSelectedNodeScanID(params.row.ID)
            }}
        />
    </div>
}