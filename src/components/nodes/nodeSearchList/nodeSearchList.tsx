import {INetworkNode} from "@/entities/nodes/networkNode.ts";
import {CircularProgress, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Fragment} from "react";
import {useNavigate} from "react-router-dom";

interface INodeSearchListProps {
    nodes: Array<INetworkNode>
    isLoading: boolean
}

export default function NodeSearchList(props: INodeSearchListProps) {
    const navigate = useNavigate()

    return <div className={'node-search-list'}>
        {
            props.isLoading ? <div className={'loading'}>
                <CircularProgress color="inherit"/>
            </div> : <Fragment>
                <Table stickyHeader sx={{maxWidth: '30vw'}} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Узел</TableCell>
                            <TableCell align="right">Тип</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.nodes.map((row) => (
                            <TableRow className={'node-row'}
                                      onClick={() => {
                                          navigate(`/nodes/view/${row.UUID}`)
                                      }}
                                      key={row.UUID}
                                      sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell className={'node-identity'} component="th" scope="row">
                                    {row.Identity}
                                </TableCell>
                                <TableCell className={'node-type'} align="right">{row.NodeTypeId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Fragment>
        }
    </div>
}