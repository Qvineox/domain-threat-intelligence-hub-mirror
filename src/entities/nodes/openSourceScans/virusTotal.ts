import {IOpenSourceScan} from "@/entities/nodes/openSourceScans/IOpenSourceScan.ts";

export interface IVirusTotalIPScan extends IOpenSourceScan {
    Data?: IVirusTotalIPScanData
}

export interface IVirusTotalIPScanData {
    id: string
    type: string
    links: Links
    attributes: IPAttributes
}

export interface IVirusTotalDomainScanData {
    id: string
    type: string
    links: Links
    attributes: DomainAttributes
}

export interface DomainAttributes {
    tld: string
    jarm: string
    tags: string[]
    whois: string
    registrar: string
    categories: Map<string, string>
    reputation: number
    whois_date: number
    total_votes: TotalVotes
    last_dns_records: LastDnsRecord[]
    popularity_ranks: Map<string, {
        method: string
        result: string
        category: string
        engine_name: string
    }>
    last_analysis_date: number
    last_analysis_stats: AnalysisStats
    last_analysis_results: Map<string, {
        method: string,
        result: string,
        category: string,
        engine_name: string
    }>
    last_dns_records_date: number
    last_modification_date: number
}

export interface Links {
    self: string
}

export interface IPAttributes {
    asn: number
    jarm: string
    tags: any[]
    whois: string
    country: string
    network: string
    as_owner: string
    continent: string
    reputation: number
    whois_date: number
    total_votes: TotalVotes
    last_analysis_date: number
    last_analysis_stats: AnalysisStats
    last_analysis_results: Map<string, {
        method: string,
        result: string,
        category: string,
        engine_name: string
    }>
    last_https_certificate: LastHttpsCertificate
    last_modification_date: number
    regional_internet_registry: string
    last_https_certificate_date: number
}

export interface TotalVotes {
    harmless: number
    malicious: number
}

export interface AnalysisStats {
    timeout: number
    harmless: number
    malicious: number
    suspicious: number
    undetected: number
}

export interface LastHttpsCertificate {
    size: number
    issuer: Issuer
    subject: Subject
    version: string
    validity: Validity
    extensions: Extensions
    public_key: PublicKey
    thumbprint: string
    serial_number: string
    cert_signature: CertSignature
    first_seen_date: number
    thumbprint_sha256: string
    signature_algorithm: string
}

export interface Issuer {
    C: string
    L: string
    O: string
    CN: string
    OU: string
    ST: string
}

export interface Subject {
    C: string
    L: string
    O: string
    CN: string
    OU: string
    ST: string
}

export interface Validity {
    not_after: string
    not_before: string
}

export interface Extensions {
    CA: boolean
    tags: any
    key_usage: any
    pe_logotype: boolean
    extended_key_usage: any
    certificate_policies: any
    netscape_certificate: boolean
    ca_information_access: any
    cert_template_name_dc: string
    netscape_cert_comment: string
    subject_key_identifier: string
    "1.3.6.1.4.1.11129.2.4.2": string
    crl_distribution_points: any
    authority_key_identifier: AuthorityKeyIdentifier
    subject_alternative_name: any
    old_authority_key_identifier: boolean
    "<additional extensions:string>": string
}

export interface AuthorityKeyIdentifier {
    keyid: string
    serial_number: string
}

export interface PublicKey {
    ec: Ec
    dsa: Dsa
    rsa: Rsa
    algorithm: string
}

export interface Ec {
    oid: string
    pub: string
}

export interface Dsa {
    g: string
    p: string
    q: string
    pub: string
}

export interface Rsa {
    modulus: string
    exponent: string
    key_size: number
}

export interface CertSignature {
    signature: string
    signature_algorithm: string
}

export interface LastDnsRecord {
    ttl: number
    type: string
    value: string
    priority?: number
    retry?: number
    rname?: string
    expire?: number
    serial?: number
    minimum?: number
    refresh?: number
}