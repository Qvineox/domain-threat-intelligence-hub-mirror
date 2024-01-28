import {DataGrid, GridActionsCellItem, GridColDef} from '@mui/x-data-grid';
import {Fragment} from "react";
import {IBlacklistedHost} from "@/entities/blacklists/host.ts";
import dayjs from "dayjs";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Chip} from "@mui/material";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UpdateIcon from '@mui/icons-material/Update';
import {useNavigate} from "react-router-dom";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface IBlacklistTableProps {
    rows: Array<IBlacklistedHost>
    isLoading: boolean
    onDelete: (type: "url" | "domain" | "ip" | "email", uuid: string) => void
    onPaginationChange: (size: number, page: number) => void
}


export default function BlacklistTable(props: IBlacklistTableProps) {
    const navigate = useNavigate()

    const columns: GridColDef[] = [
        {
            field: 'Host',
            headerName: 'Узел',
            flex: 3,
        },
        {
            field: 'Status',
            headerName: 'Метка',
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                switch (params.value) {
                    case "new":
                        return <Chip icon={<NewReleasesIcon/>}
                                     size={"small"}
                                     label={"Новый"}
                                     variant={"outlined"}
                                     color={"success"}/>;
                    case "updated":
                        return <Chip icon={<UpdateIcon/>}
                                     size={"small"}
                                     label={"Обновлен"}
                                     variant={"outlined"}
                                     color={"warning"}/>;
                    case "deleted":
                        return <Chip icon={<HighlightOffIcon/>}
                                     size={"small"}
                                     label={"Удален"}
                                     variant={"outlined"}
                                     color={"error"}/>;
                    default:
                        return <Fragment/>
                }
            }
        },
        {
            field: 'Type',
            headerName: 'Тип узла',
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
                    case "email":
                        return "Почта"
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

                let actions = [
                    <GridActionsCellItem
                        icon={<DeleteOutlineIcon/>}
                        label="Delete"
                        onClick={() => props.onDelete(row.Type, row.UUID)}
                        color="inherit"
                    />,
                ]

                if (row.ImportEventID) {
                    actions.push(<GridActionsCellItem
                        icon={<OpenInNewIcon/>}
                        label="Show import event"
                        onClick={() => navigate(`/blacklists/imports/${row.ImportEventID}`)}
                        color="inherit"
                    />)
                }

                return actions

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
                    pageSize: 50,
                },
            },
        }}
        pageSizeOptions={[50, 100]}
        onPaginationModelChange={(model) => {
            props.onPaginationChange(model.pageSize, model.page)
        }}
        checkboxSelection
        disableRowSelectionOnClick
    />
}