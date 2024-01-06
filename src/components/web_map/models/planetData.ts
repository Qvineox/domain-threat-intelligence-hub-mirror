export class PlanetData {
    id: number
    name: string
    color: string
    mass: number
    scoring: number
    type?: NodeDataType
    moons?: Array<PlanetData>

    constructor(id: number, name: string, mass: number, type?: NodeDataType, moons?: Array<PlanetData>, scoring?: number) {
        this.id = id
        this.name = name
        this.mass = mass
        this.moons = moons

        if (scoring) {
            this.scoring = scoring
        } else {
            this.scoring = 0
        }

        if (type) {
            this.type = type
        } else {
            this.type = NodeDataType.Info
        }

        switch (this.type) {
            case NodeDataType.Info:
                this.color = 'white'
                break
            case NodeDataType.Malware:
                this.color = 'red'
                break
            case NodeDataType.Suspicious:
                this.color = 'orange'
                break
            case NodeDataType.Safe:
                this.color = 'green'
                break
            default:
                this.color = 'grey'
        }
    }
}

export enum NodeDataType {
    Default = 0,
    Info = 1,
    Malware,
    Suspicious,
    Safe
}