export interface IDynamicConfig {
    SMTP: {
        Enabled: boolean
        Host: string
        User: string
        Password: string
        Port: number
        SSL: boolean
    }
    Integrations: {
        Naumen: {
            Enabled: boolean
            ClientGroupID: number
            ClientID: number
            ClientKey: string
            URL: string
            BlacklistsService: {
                AgreementID: number
                SLM: number
                CallType: string
                Types: Array<string> | null
            }
        }
    }
}