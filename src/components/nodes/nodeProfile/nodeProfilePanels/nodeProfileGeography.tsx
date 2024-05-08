import {IStringScanValue} from "@/entities/nodes/networkNodeProfile.ts";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import {Fragment} from "react";


interface INodeProfileGeographyPanelProps {
    Region: IStringScanValue[]
    Country: IStringScanValue[]
    City: IStringScanValue[]
    Longitude: number
    Latitude: number
}

export function NodeProfileGeographyPanel(props: INodeProfileGeographyPanelProps) {
    return <div className={'panel panel__geo'}>
        <h4>География</h4>
        <div className={'geography-shelf'}>
            <div className={'geography-shelf_value'}>
                <h5>Регион</h5>
                {
                    props.Region ? props.Region.map((value) => {
                        return <p title={value.Source}>{value.Value}</p>
                    }) : "-"
                }
            </div>
            <div className={'geography-shelf_value'}>
                <h5>Страна</h5>
                {
                    props.Country ? props.Country.map((value) => {
                        return <p title={value.Source}>{value.Value}</p>
                    }) : "-"
                }
            </div>
            <div className={'geography-shelf_value'}>
                <h5>Город</h5>
                {
                    props.City ? props.City.map((value) => {
                        return <p title={value.Source}>{value.Value}</p>
                    }) : "-"
                }
            </div>
            <div className={'geography-shelf_value'}>
                <h5>Координаты</h5>
                <p>{props.Latitude}, {props.Longitude}</p>
            </div>
            {
                props.Latitude != 0 && props.Longitude != 0 ? <div className={'geography-shelf_map'}>
                    <YMaps>
                        <div>
                            <Map width={400} height={200}
                                 defaultState={{center: [props.Latitude, props.Longitude], zoom: 4}}>
                                <Placemark geometry={[props.Latitude, props.Longitude]}/>
                            </Map>
                        </div>

                    </YMaps>
                </div> : <Fragment/>
            }
        </div>

    </div>
}

// {
//     props.Region ? <p>Регион: {[...new Set(props.Region.map((value) => {
//         return value.Value
//     }))].join("/")}</p> : null
// }
// {
//     props.Country ? <p>Страна: {[...new Set(props.Country.map((value) => {
//         return value.Value
//     }))].join("/")}</p> : null
// }
// {
//     props.City ? <p>Город: {[...new Set(props.City.map((value) => {
//         return value.Value
//     }))].join("/")}</p> : null
// }