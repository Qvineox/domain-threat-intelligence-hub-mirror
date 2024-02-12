import {IBlacklistImportEvent} from "@/entities/blacklists/importEvent.ts";
import {useNavigate} from "react-router-dom";
import {DataGrid, GridActionsCellItem, GridColDef} from "@mui/x-data-grid";
import dayjs from "dayjs";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from '@mui/icons-material/Search';
import IosShareIcon from '@mui/icons-material/IosShare';
import ListIcon from '@mui/icons-material/List';

interface IBlacklistImportEventsTableProps {
    rows: Array<IBlacklistImportEvent>
    isLoading: boolean
    onDelete: (id: number) => void
    onPaginationChange: (size: number, page: number) => void
}

export default function BlacklistImportEventsTable(props: IBlacklistImportEventsTableProps) {
    const navigate = useNavigate()

    const columns: GridColDef[] = [
        {
            field: 'ID',
            headerName: 'ID',
            flex: 1,
        },
        {
            field: 'Type',
            headerName: 'Тип импорта',
            flex: 2,
            headerAlign: "center",
            align: "center",
            valueFormatter: (params) => {
                switch (params.value) {
                    case "stix":
                        return "STIX"
                    case "csv":
                        return "CSV"
                    default:
                        return `Другое (${params.value})`
                }
            }
        },
        {
            field: 'Summary',
            headerName: 'Импортировано — IP — Домены — URL — Почта',
            flex: 4,
            headerAlign: "center",
            align: "center",
            valueGetter: (params) => {
                return `(${params.value.Imported.Total}) ${params.value.New.Total} — ${params.value.New.IPs} — ${params.value.New.Domains} — ${params.value.New.URLs} — ${params.value.New.Emails}`
            },
        },
        {
            field: 'IsComplete',
            headerName: 'Статус',
            flex: 1,
            type: "boolean",
            headerAlign: "right",
            align: "right",
        },
        {
            field: 'CreatedAt',
            headerName: 'Дата импорта',
            type: 'dayjs',
            flex: 2,
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
            flex: 2,
            cellClassName: 'actions',
            getActions: ({row}) => {
                return [
                    <GridActionsCellItem
                        icon={<ListIcon/>}
                        label="Show imports"
                        onClick={() => navigate(`/blacklists/view?limit=${row.Summary.Imported.Total + 100}&import_event_id=${row.ID}`)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<SearchIcon/>}
                        label="Show import event"
                        onClick={() => navigate(`/blacklists/imports/${row.ID}`)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<IosShareIcon/>}
                        label="Export"
                        onClick={() => navigate(`/blacklists/export?import_event_id=${row.ID}`)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteOutlineIcon/>}
                        label="Delete"
                        onClick={() => props.onDelete(row.ID)}
                        color="inherit"
                    />,
                ];
            },
        }
    ];

    return <DataGrid
        rows={props.rows}
        rowCount={props.rows.length}
        rowHeight={42}
        getRowId={(row: IBlacklistImportEvent) => row.ID}
        loading={props.isLoading}
        columns={columns}
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