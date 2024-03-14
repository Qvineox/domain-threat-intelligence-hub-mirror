export interface IShodanScanData {
    ip: number
    os: string
    asn: string
    isp: string
    org: string
    city: string
    data: Banner[]
    tags: string[]
    ports: number[]
    ip_str: string
    domains: string[]
    latitude: number
    area_code: string
    hostnames: string[]
    longitude: number
    last_update: string
    region_code: string
    country_code: string
    country_name: string
}

interface Banner {
    _shodan: {
        crawler: string,
        id: string
        module: string
        ptr: boolean,
        region: string
    },
    port: number,
    data?: string
}
