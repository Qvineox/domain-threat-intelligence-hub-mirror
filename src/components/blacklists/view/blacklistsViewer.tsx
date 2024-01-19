import {Fragment, useEffect} from "react";
import BlacklistService from "@/services/blacklistService.ts";


export default function BlacklistsViewer() {
    useEffect(() => {
        console.info('requested blacklisted URLs')

        BlacklistService.getURLsByFilter().then((response) => {
            console.info(response.data)
        })
    }, [])

    return <Fragment>

    </Fragment>
}