import {DataGrid, GridActionsCellItem, GridColDef} from '@mui/x-data-grid';
import {useEffect} from "react";
import {IBlacklistedHost} from "@/entities/blacklists/host.ts";
import dayjs from "dayjs";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


interface IBlacklistTableProps {
    rows: Array<IBlacklistedHost>
    isLoading: boolean
    onDelete: (type: "url" | "domain" | "ip", uuid: string) => void
    onPaginationChange: (size: number, page: number) => void
}

export default function BlacklistTable(props: IBlacklistTableProps) {
    useEffect(() => {

    }, []);

    const columns: GridColDef[] = [
        {
            field: 'Host',
            headerName: 'Узел',
            flex: 3,
        },
        {
            field: 'Type',
            headerName: 'Тип хоста',
            flex: 1,
            headerAlign: "center",
            align: "center",
            valueFormatter: (params) => {
                switch (params.value) {
                    case "domain":
                        return "Домен"
                    case "url":
                        return "URL"
                    case "ip":
                        return "IP"
                    default:
                        return "Неизвестно"
                }
            }
        },
        {
            field: 'Source',
            headerName: 'Источник',
            flex: 1,
            headerAlign: "center",
            align: "center",
            valueGetter: (params) => params.value.Name,
            // valueFormatter: (params) => params.value.Name
        },
        {
            field: 'UUID',
            headerName: 'UUID',
            flex: 2,
            headerAlign: "center",
            align: "center",
        },
        {
            field: 'CreatedAt',
            headerName: 'Дата обнаружения',
            type: 'dayjs',
            flex: 1,
            editable: false,
            headerAlign: "right",
            align: "right",
            valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm')
        },
        {
            field: 'UpdatedAt',
            headerName: 'Дата обновления',
            type: 'dayjs',
            flex: 1,
            editable: false,
            headerAlign: "right",
            align: "right",
            valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm')
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Действия',
            headerAlign: "right",
            align: "right",
            flex: 1,
            cellClassName: 'actions',
            getActions: ({row}) => {
                switch (row.Type) {
                    case "url":
                        return [
                            <GridActionsCellItem
                                icon={<DeleteOutlineIcon/>}
                                label="Delete"
                                onClick={() => {
                                    props.onDelete("url", row.UUID)
                                }}
                                color="inherit"
                            />,
                        ];
                    case "domain":
                        return [
                            <GridActionsCellItem
                                icon={<DeleteOutlineIcon/>}
                                label="Delete"
                                onClick={() => {
                                    props.onDelete("domain", row.UUID)
                                }}
                                color="inherit"
                            />,
                        ];
                    case "ip":
                        return [
                            <GridActionsCellItem
                                icon={<DeleteOutlineIcon/>}
                                label="Delete"
                                onClick={() => {
                                    props.onDelete("ip", row.UUID)
                                }}
                                color="inherit"
                            />,
                        ];
                    default:
                        return []
                }

                // return [
                //     <GridActionsCellItem
                //         icon={<DeleteOutlineIcon/>}
                //         label="Delete"
                //         onClick={() => {
                //             console.info("deleting: " + id)
                //             console.info("deleting: " + row.Source.ID)
                //         }}
                //         color="inherit"
                //     />,
                // ];
            },
        }
    ];

    return <DataGrid
        rows={props.rows}
        rowCount={props.rows.length}
        rowHeight={42}
        loading={props.isLoading}
        columns={columns}
        getRowId={(row: IBlacklistedHost) => row.UUID}
        initialState={{
            pagination: {
                paginationModel: {
                    pageSize: 100,
                },
            },
        }}
        pageSizeOptions={[100]}
        onPaginationModelChange={(model) => {
            props.onPaginationChange(model.pageSize, model.page)
        }}
        checkboxSelection
        disableRowSelectionOnClick
    />
}