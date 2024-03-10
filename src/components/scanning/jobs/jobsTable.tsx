import {JobPriority, JobStatus, JobType} from "@/entities/queue/job.ts";
import {DataGrid, GridActionsCellItem, GridColDef} from "@mui/x-data-grid";
import dayjs from "dayjs";
import {IDialerJob} from "@/entities/queue/dialerJob.ts";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {useNavigate} from "react-router-dom";

interface IJobsTableProps {
    rows: Array<IDialerJob>
    isLoading: boolean
    onDelete: (uuid: string) => void
    onPaginationChange: (size: number, page: number) => void
}

export default function JobsTable(props: IJobsTableProps) {
    const navigate = useNavigate()

    const columns: GridColDef[] = [
        {
            field: 'UUID',
            headerName: 'UUID',
            flex: 2,
            valueGetter: (params) => params.row?.Meta.UUID
        },
        {
            field: 'Type',
            headerName: 'Тип',
            flex: 1,
            headerAlign: "right",
            align: "right",
            valueGetter: (params) => params.row?.Meta.Type,
            valueFormatter: (params) => {
                switch (params.value) {
                    case JobType.JOB_TYPE_OSS:
                        return "OSS"
                    default:
                        return "Неизвестно"
                }
            }
        },
        {
            field: 'Targets',
            headerName: 'Число целей',
            flex: 1,
            headerAlign: "right",
            align: "right",
            valueGetter: (params) => params.row?.Payload.Targets.length,
        },
        {
            field: 'Status',
            headerName: 'Статус',
            flex: 1,
            headerAlign: "right",
            align: "right",
            valueGetter: (params) => params.row?.Meta.Status,
            valueFormatter: (params) => {
                switch (params.value) {
                    case JobStatus.JOB_STATUS_DONE:
                        return "Завершена"
                    case JobStatus.JOB_STATUS_WORKING:
                        return "В работе"
                    case JobStatus.JOB_STATUS_CANCELLED:
                        return "Отменена"
                    case JobStatus.JOB_STATUS_STARTING:
                        return "Инициализация"
                    case JobStatus.JOB_STATUS_ERROR:
                        return "Ошибка"
                    case JobStatus.JOB_STATUS_PANIC:
                        return "Крит. ошибка"
                    case JobStatus.JOB_STATUS_FINISHING:
                        return "Завершение"
                    case JobStatus.JOB_STATUS_PENDING:
                        return "В очереди"
                    default:
                        return "Неизвестно"
                }
            }
        },
        {
            field: 'Priority',
            headerName: 'Приоритет',
            flex: 1,
            headerAlign: "right",
            align: "right",
            valueGetter: (params) => params.row?.Meta.Priority,
            valueFormatter: (params) => {
                switch (params.value) {
                    case JobPriority.JOB_PRIORITY_CRITICAL:
                        return "Наивысший"
                    case JobPriority.JOB_PRIORITY_HIGH:
                        return "Высокий"
                    case JobPriority.JOB_PRIORITY_MEDIUM:
                        return "Средний"
                    case JobPriority.JOB_PRIORITY_LOW:
                        return "Низкий"
                    default:
                        return "Неизвестно"
                }
            }
        },
        {
            field: 'CreatedBy',
            headerName: 'Создана',
            flex: 1,
            editable: false,
            headerAlign: "right",
            align: "right",
            valueGetter: (params) => params.row?.Meta.CreatedBy?.Login,
        },
        {
            field: 'CreatedAt',
            headerName: 'Дата создания',
            type: 'dayjs',
            flex: 1,
            editable: false,
            headerAlign: "right",
            align: "right",
            valueGetter: (params) => params.row?.Meta.CreatedAt,
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

                const actions = [
                    <GridActionsCellItem
                        icon={<DeleteOutlineIcon/>}
                        label="Delete"
                        onClick={() => props.onDelete(row.Meta.UUID)}
                        color="inherit"
                    />,
                ]

                if (row.Meta.UUID) {
                    actions.push(<GridActionsCellItem
                        icon={<OpenInNewIcon/>}
                        label="Показать информацию о задаче"
                        onClick={() => navigate(`/scanning/job/${row.Meta.UUID}`)}
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
        getRowId={(row: IDialerJob) => row.Meta.UUID}
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