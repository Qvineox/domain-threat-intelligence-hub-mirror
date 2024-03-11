import {Grid, Skeleton} from "@mui/material";
import JobCard from "@/components/scanning/jobs/jobCard.tsx";
import {Fragment, useContext} from "react";
import {Context} from "@/context.ts";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";

function LatestJobs() {
    const {queue} = useContext(Context)

    return <div className="latest-jobs">
        <Fragment>
            <h3>Последние выполненные задачи</h3>
        </Fragment>
        {
            !queue.isLoading ? <Grid container spacing={4}>
                {
                    queue.state.latest.length > 0 ? <Fragment>
                        {queue.state.latest.map((value, index) => {
                            return <Grid key={index} item xs={3}>
                                <NavLink to={`/scanning/job/${value.Meta.UUID}`}>
                                    <JobCard data={value}/>
                                </NavLink>
                            </Grid>
                        })}
                        {queue.state.sent.map((value, index) => {
                            return <Grid key={index} item xs={3}>
                                <NavLink to={`/scanning/job/${value.Meta.UUID}`}>
                                    <JobCard data={value}/>
                                </NavLink>
                            </Grid>
                        })}
                    </Fragment> : <Grid item xs={2}>
                        <p className={'empty-hint'}>Задачи отсутствуют</p>
                    </Grid>
                }
            </Grid> : <Fragment>
                <Skeleton variant={'rounded'} width={450} height={75}/>
            </Fragment>
        }
    </div>
}

export default observer(LatestJobs)