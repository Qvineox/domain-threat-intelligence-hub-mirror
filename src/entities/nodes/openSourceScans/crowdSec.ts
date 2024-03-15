export interface ICrowdSecIPScanData {
    ip: string

    as_num: number

    scores: {
        overall: Stats
        last_day: Stats
        last_week: Stats
        last_month: Stats
    }


    cves: string[]

    as_name: string
    history: History
    ip_range: string

    location: {
        city: string
        country: string
        latitude: number
        longitude: number
    }

    behaviors: Detail[]
    confidence: string
    references: Detail[]
    reputation: string
    ip_range_24: string
    reverse_dns: string
    attack_details: Detail[]
    ip_range_score: number
    classifications: Classifications
    background_noise: string
    mitre_techniques: Detail[]
    ip_range_24_score: number
    background_noise_score: number
    ip_range_24_reputation: string

    target_countries: Map<string, number>
}

export interface Detail {
    name: string
    label: string
    description: string
    references?: Detail[]
}

export interface Scores {
    overall: Stats
    last_day: Stats
    last_week: Stats
    last_month: Stats
}

export interface Stats {
    total: number
    trust: number
    threat: number
    anomaly: number
    aggressiveness: number
}

export interface History {
    days_age: number
    full_age: number
    last_seen: string
    first_seen: string
}

export interface Classifications {
    classifications: Detail[]
    false_positives: Detail[]
}
