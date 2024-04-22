export interface ICriminalIPIPScanData {
    ip: string

    issues: {
        is_vpn: boolean
        is_cloud: boolean
        is_tor: boolean
        is_proxy: boolean
        is_hosting: boolean
        is_mobile: boolean
        is_darkweb: boolean
        is_scanner: boolean
        is_snort: boolean
        is_anonymous_vpn: boolean
    }

    score: {
        inbound: string
        outbound: string
    }

    user_search_count: number

    protected_ip: {
        count: number
        data: Array<ProtectedIP>
    }

    domain: {
        count: number
        data: Array<Domain>
    }

    whois: {
        count: number
        data: Array<Whois>
    }

    hostname: Hostname

    ids: {
        count: number
        data: Array<ID>
    }

    vpn: {
        count: number
        data: Array<VPN>
    }

    anonymous_vpn: {
        count: number
        data: Array<AnonymousVPN>
    }

    webcam: {
        count: number
        data: Array<Webcam>
    }

    honeypot: {
        count: number
        data: Array<Honeypot>
    }

    ip_category: {
        count: number
        data: Array<IPCategory>
    }

    port: {
        count: number
        data: Array<Port>
    }

    vulnerability: {
        count: number
        data: Array<Vulnerability>
    }

    mobile: Mobile
    status: number
}

export interface ProtectedIP {
    ip_address: string
    confirmed_time: string
}

export interface Domain {
    domain: string
    ip_type: string
    registrar: string
    create_date: string
    confirmed_time: string
    email: string
}

export interface Whois {
    as_name: string
    as_no: number
    city: string
    region: string
    org_name: string
    postal_code: string
    longitude: number
    latitude: number
    org_country_code: string
    confirmed_time: string
}

export interface Hostname {
    domain_name_rep: string
    domain_name_full: string
    confirmed_time: string
}

export interface ID {
    classification: string
    url: string
    message: string
    confirmed_time: string
    source_system: string
}

export interface VPN {
    vpn_name: string
    vpn_url: string
    vpn_source_url: string
    socket_type: string
    confirmed_time: string
}

export interface AnonymousVPN {
    vpn_name: string
    vpn_url: string
    vpn_source_url: string
    socket_type: string
    confirmed_time: string
}

export interface Webcam {
    image_path: string
    cam_url: string
    country: string
    city: string
    open_port_no: number
    manufacturer: string
    confirmed_time: string
}

export interface Honeypot {
    ip_address: string
    log_date: string
    dst_port: number
    message: string
    user_agent: string
    protocol_type: string
    confirmed_time: string
}


export interface IPCategory {
    detect_source: string
    type: string
    detect_info: DetectInfo
    confirmed_time: string
}

export interface DetectInfo {
    md5?: string
    domain?: string
}

export interface Port {
    app_name: string
    confirmed_time: string
    banner: string
    app_version: string
    open_port_no: number
    port_status: string
    protocol: string
    socket: string
    tags: string[]
    dns_names: string
    sdn_common_name: string
    jarm_hash: string
    ssl_info_raw: string
    technologies: Technology[]
    is_vulnerability: boolean
}

export interface Technology {
    tech_name: string
    tech_version: string
    tech_logo_url: string
}

export interface Vulnerability {
    cve_id: string
    cve_description: string
    cvssv2_vector: string
    cvssv2_score: number
    cvssv3_vector: string
    cvssv3_score: number
    list_cwe: ListCwe[]
    list_edb: ListEdb[]
    app_name: string
    app_version: string
    open_port_no_list: OpenPortNoList
    have_more_ports: boolean
    open_port_no: OpenPortNo[]
    list_child: ListChild[]
    vendor: string
    type: string
    is_vuln: string
    target_hw: string
    target_sw: string
    update: string
    edition: string
}

export interface ListCwe {
    cve_id: string
    cwe_id: number
    cwe_name: string
    cwe_description: string
}

export interface ListEdb {
    cve_id: string
    edb_id: number
    type: string
    platform: string
    verify_code: number
    title: string
    confirmed_time: string
}

export interface OpenPortNoList {
    TCP: number[]
    UDP: any[]
}

export interface OpenPortNo {
    port: number
    socket: string
}

export interface ListChild {
    app_name: string
    app_version: string
    vendor: string
    type: string
    is_vuln: string
    target_hw: string
    target_sw: string
    update: string
    edition: string
}

export interface Mobile {
    broadband: string
    organization: string
}