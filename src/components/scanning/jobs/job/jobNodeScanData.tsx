import {INetworkNodeScan, NetworkNodeScanType} from "@/entities/nodes/networkNodeScan.ts";
import {Grid} from "@mui/material";
import {VirusTotalDomainScan, VirusTotalIPScan} from "@/components/scanning/jobs/job/scans/virusTotal.tsx";
import "@/styles/scans.scss"
import {IPQualityScoreIPScan, IPQualityScoreURLScan} from "@/components/scanning/jobs/job/scans/ipQualityScore.tsx";
import {CrowdSecIPScan} from "@/components/scanning/jobs/job/scans/crowdSec.tsx";
import ErrorScan from "@/components/scanning/jobs/job/scans/error.tsx";
import {ShodanIPScan} from "./scans/shodan";

interface IJobNodeScanData {
    scans?: Array<INetworkNodeScan>
}

export default function JobNodeScanData(props: IJobNodeScanData) {
    const cards = props.scans?.map((value) => {
        if (!value.IsComplete) {
            return <ErrorScan {...value}/>
        }

        switch (value.TypeID) {
            case NetworkNodeScanType.SCAN_TYPE_OSS_VT_DOMAIN:
                return <VirusTotalDomainScan {...value}/>
            case NetworkNodeScanType.SCAN_TYPE_OSS_VT_URL:
                break;
            case NetworkNodeScanType.SCAN_TYPE_OSS_IPQS_IP:
                return <IPQualityScoreIPScan {...value}/>
            case NetworkNodeScanType.SCAN_TYPE_OSS_IPQS_DOMAIN:
                return <IPQualityScoreURLScan {...value}/>
            case NetworkNodeScanType.SCAN_TYPE_OSS_IPQS_URL:
                return <IPQualityScoreURLScan {...value}/>
            case NetworkNodeScanType.SCAN_TYPE_OSS_IPQS_EMAIL:
                break;
            case NetworkNodeScanType.SCAN_TYPE_OSS_SHODAN_IP:
                return <ShodanIPScan {...value}/>
            case NetworkNodeScanType.SCAN_TYPE_OSS_CS_IP:
                return <CrowdSecIPScan {...value}/>
            case NetworkNodeScanType.SCAN_TYPE_OSS_IPWH_IP:
                break;
            case NetworkNodeScanType.SCAN_TYPE_OSS_VT_IP:
                return <VirusTotalIPScan {...value}/>
        }
    })

    return <div className={'job-viewer_content_node-data'}>
        <Grid container spacing={2}>
            {cards}
        </Grid>
    </div>
}