import {Canvas} from "@react-three/fiber";
import "./styles/web_map.scss"
import {Physics} from "@react-three/rapier";
import {CameraControls} from "@react-three/drei";
import {Fragment, useEffect, useRef, useState} from "react";
import {PlanetData, NodeDataType} from "@/components/web_map/models/planetData.ts";
import {SolarSystem} from "@/components/web_map/components/solarSystem.tsx";
import {Typography} from "@mui/material";
import {NodeInfo} from "@/components/web_map/components/nodes_info.tsx";
import {Vector3} from "three";
import {MapNavigation} from "@/components/web_map/components/map_navigation.tsx";

export function WebMap() {
    const [central] = useState<PlanetData>(MapData)
    const [rotate, setRotate] = useState<boolean>(true)

    const controlsRef = useRef<CameraControls>(null!)
    // const [cameraZoom] = useState<number>(defaultZoom)

    const [selectedNodeID, setSelectedNodeID] = useState<number>()

    useEffect(() => {
        if (selectedNodeID) {
            setRotate(false)
        } else {
            setRotate(true)
        }
    }, [selectedNodeID])

    const handleNodeHover = (id: number) => {
        console.debug('hovered: ' + id)
    }

    const handleNodeClick = (id: number, position: Vector3) => {
        setSelectedNodeID(id)

        console.debug("clicked on node with id: " + id)
        console.debug("moving to position: " + position.toArray())

        controlsRef.current.zoomTo(6, true).then(() => {
            console.debug("zoomed to position")
        })

        controlsRef.current.setLookAt(0, 0, 200, position.x - 20, position.y, position.z, true).then(() => {
            console.debug("moved to position")
        })
    }

    const handleCameraReset = () => {
        controlsRef.current.zoomTo(2, true).then(() => {
            console.debug("zoomed to position")
        })

        controlsRef.current.setLookAt(0, 0, 200, 0, 0, 0, true).then(() => {
            console.debug("moved to position")
        })

        handleHideInfo()
    }

    const handleSwitchRotation = () => {
        setRotate(prevState => !prevState)
    }

    const handleHideInfo = () => {
        setSelectedNodeID(undefined)
    }

    return <Fragment>
        <div className={!selectedNodeID ? "host-name" : "host-name hidden"}>
            <Typography variant="h4">
                192.168.31.1
            </Typography>
        </div>
        <div className="controls-legend">
            <Typography>
                Left Click: show node info
            </Typography>
            <Typography>
                Hold Right: pan camera
            </Typography>
            <Typography>
                Use controls panel to restore position
            </Typography>
        </div>
        <NodeInfo id={selectedNodeID}
                  name={'test'}
                  data={central.moons?.find((element) => {
                      return element.id === selectedNodeID
                  })}/>
        <div id={'web-map-canvas'}>
            {/*<div id={'monitor'}>*/}
            {/*    <Typography variant="h4">Monitor</Typography>*/}
            {/*    <FormControlLabel label="Rotation"*/}
            {/*                      control={<Checkbox checked={rotate}*/}
            {/*                                         onChange={() => {*/}
            {/*                                             setRotate(!rotate)*/}
            {/*                                         }}/>}/>*/}

            {/*</div>*/}
            <Canvas camera={
                {
                    zoom: 2,
                    position: new Vector3(0, 0, 200)
                }
            }>
                {/*<PerspectiveCamera ref={cameraRef}*/}
                {/*                   zoom={cameraZoom}*/}
                {/*                   far={500}*/}
                {/*                   near={0.1}*/}
                {/*                   fov={35}*/}
                {/*                   position={[0, 0, 200]}*/}
                {/*                   makeDefault/>*/}
                <ambientLight position={[0, 0, 10]} intensity={5}/>
                <CameraControls ref={controlsRef}
                                makeDefault/>
                <Physics gravity={[0, 0, 0]}>
                    <SolarSystem central={central}
                                 rotate={rotate}
                                 hoverNode={handleNodeHover}
                                 clickNode={handleNodeClick}/>
                </Physics>
            </Canvas>
        </div>
        <MapNavigation resetCamera={handleCameraReset}
                       switchRotation={handleSwitchRotation}
                       hideInfo={handleHideInfo}/>
    </Fragment>
}

const MapData = new PlanetData(1, 'central', 6, NodeDataType.Default, [
    new PlanetData(2, 'Safe domain zone planet', 1, NodeDataType.Safe),
    new PlanetData(3, 'Whitelisted IP address', 3, NodeDataType.Safe),
    new PlanetData(4, 'Safe NMAP scan', 2, NodeDataType.Safe),
    new PlanetData(5, 'Unknown domain', 2, NodeDataType.Suspicious),
    new PlanetData(6, 'Suspicious domain name', 1, NodeDataType.Suspicious),
    new PlanetData(7, 'Unknown domain registrar', 2, NodeDataType.Suspicious),
    new PlanetData(8, 'Invalid SSL certificate', 3, NodeDataType.Suspicious),
    new PlanetData(9, 'Self-signed SSL certificate', 2, NodeDataType.Suspicious),
    new PlanetData(10, 'DGA algorithm detected', 1, NodeDataType.Malware),
    new PlanetData(11, 'IP address might be blacklisted', 1, NodeDataType.Malware),
    new PlanetData(12, 'Proxy detected on host', 2, NodeDataType.Malware),
    new PlanetData(13, 'Domain was found in recent data leaks', 3, NodeDataType.Malware),
], 86)