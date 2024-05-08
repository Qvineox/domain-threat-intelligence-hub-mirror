export interface IDNSPScanData {
    host: string
    cname: string

    mx: Array<string>
    ns: Array<string>
    ips: Array<string>
    ptr: Array<string>
    txt: Array<string>

    reverse: {
        [key: string]: Array<string>
    }
}
