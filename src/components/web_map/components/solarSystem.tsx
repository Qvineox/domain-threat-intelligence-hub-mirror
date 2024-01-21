import {Fragment, useState} from "react";
import {PlanetData, NodeDataType} from "@/components/web_map/models/planetData.ts";
import {Object3D, Vector3} from "three";
import {Orbit} from "@/components/web_map/components/orbit.tsx";

export type SolarNodeProps = {
    central: PlanetData
    rotate: boolean
    hoverNode: (id: number) => void
    clickNode: (id: number, position: Vector3, object?: Object3D) => void
}

const centerPosition = new Vector3(0, 0, 0)

export function SolarSystem(props: SolarNodeProps) {
    const [byOrbit] = useState<MoonsByOrbit>({
        infoMoons: props.central.moons?.filter((value) => {
            return value.type == NodeDataType.Safe
        }),
        maliciousMoons: props.central.moons?.filter((value) => {
            return value.type == NodeDataType.Malware
        }),
        suspiciousMoons: props.central.moons?.filter((value) => {
            return value.type == NodeDataType.Suspicious
        })
    })

    const hoverHandler = (id: number, isHovered: boolean) => {
        if (isHovered) {
            console.debug("user hovered object with id: " + id)
            document.body.style.cursor = 'pointer'

            props.hoverNode(id)
        } else {
            console.debug("user left object with id: " + id)
            document.body.style.cursor = 'default'
        }
    }

    // ref: https://stackoverflow.com/questions/43641798/how-to-find-x-and-y-coordinates-on-a-flipped-circle-using-javascript-methods

    return <Fragment>
        <Orbit orbitCenter={centerPosition}
               orbitRadius={10}
               planets={byOrbit.infoMoons}
               rotationSpeed={props.rotate ? 0.075 : 0}
               clickObject={props.clickNode}
               hoverObject={hoverHandler}/>
        <Orbit orbitCenter={centerPosition}
               orbitRadius={20}
               planets={byOrbit.suspiciousMoons}
               rotationSpeed={props.rotate ? -0.045 : 0}
               clickObject={props.clickNode}
               hoverObject={hoverHandler}/>
        <Orbit orbitCenter={centerPosition}
               orbitRadius={40}
               planets={byOrbit.maliciousMoons}
               rotationSpeed={props.rotate ? 0.02 : 0}
               clickObject={props.clickNode}
               hoverObject={hoverHandler}/>
    </Fragment>

    // return <Fragment>
    //     <group position={props.position} rotation={new Euler(-.9, 0, 0)}>
    //         <Sphere position={props.position}
    //                 scale={props.central.mass}
    //         >
    //             <meshPhongMaterial opacity={0.25} transparent/>
    //             <Text color="black" fontSize={.5} anchorX="center" anchorY="middle">
    //                 {props.central.scoring} pts.
    //             </Text>
    //         </Sphere>
    //         <group ref={refInfo}>
    //             <Ring args={[infoOrbit - orbitHoverThreshold, infoOrbit + orbitHoverThreshold, 360]}
    //                   onPointerOver={() => {
    //                       setInfoHovered(true)
    //                   }}
    //                   onPointerLeave={() => {
    //                       setInfoHovered(false)
    //                   }} visible={false}>
    //             </Ring>
    //             <Ring args={[infoOrbit, infoOrbit + orbitWidth, 360]}>
    //                 {infoHovered ? <meshPhongMaterial color="whitesmoke" opacity={0.55} transparent/>
    //                     : <meshPhongMaterial color="grey" opacity={0.05} transparent/>
    //                 }
    //             </Ring>
    //             {byOrbit.infoMoons?.map((value, index) => {
    //                 const gap: number = 360 / byOrbit.infoMoons!.length
    //                 let x: number = infoOrbit * Math.sin(Math.PI * 2 * gap * index / 360);
    //                 let y: number = infoOrbit * Math.cos(Math.PI * 2 * gap * index / 360);
    //
    //                 return <Sphere key={index}
    //                                position={new Vector3(x, y, 0)}
    //                                scale={value.mass * 0.75}
    //                                castShadow>
    //                     <meshPhongMaterial color={value.color}/>
    //                 </Sphere>
    //             })}
    //         </group>
    //         <group ref={refSuspects}>
    //             <Ring args={[suspiciousOrbit - orbitHoverThreshold, suspiciousOrbit + orbitHoverThreshold, 360]}
    //                   onPointerOver={() => {
    //                       setSuspectsHovered(true)
    //                   }}
    //                   onPointerLeave={() => {
    //                       setSuspectsHovered(false)
    //                   }} visible={false}>
    //
    //             </Ring>
    //             <Ring args={[suspiciousOrbit, suspiciousOrbit + orbitWidth, 360]}>
    //                 {suspectHovered ? <meshPhongMaterial color="whitesmoke" opacity={0.55} transparent/>
    //                     : <meshPhongMaterial color="grey" opacity={0.05} transparent/>
    //                 }
    //             </Ring>
    //             {byOrbit.suspiciousMoons?.map((value, index) => {
    //                 const gap: number = 360 / byOrbit.suspiciousMoons!.length
    //                 let x: number = suspiciousOrbit * Math.sin(Math.PI * 2 * gap * index / 360);
    //                 let y: number = suspiciousOrbit * Math.cos(Math.PI * 2 * gap * index / 360);
    //
    //                 return <Tetrahedron key={index}
    //                                     position={new Vector3(x, y, 0)}
    //                                     scale={value.mass}
    //                                     material-color={value.color}/>
    //             })}
    //         </group>
    //         <group ref={refMalware}>
    //             <Ring args={[maliciousOrbit - orbitHoverThreshold, maliciousOrbit + orbitHoverThreshold, 360]}
    //                   onPointerOver={() => {
    //                       setMalwareHovered(true)
    //                   }}
    //                   onPointerLeave={() => {
    //                       setMalwareHovered(false)
    //                   }} visible={false}>
    //
    //             </Ring>
    //             <Ring args={[maliciousOrbit, maliciousOrbit + orbitWidth, 360]}>
    //                 {malwareHovered ? <meshPhongMaterial color="whitesmoke" opacity={0.55} transparent/>
    //                     : <meshPhongMaterial color="grey" opacity={0.05} transparent/>
    //                 }
    //             </Ring>
    //             {byOrbit.maliciousMoons?.map((value, index) => {
    //                 const gap: number = 360 / byOrbit.maliciousMoons!.length
    //                 let x: number = maliciousOrbit * Math.sin(Math.PI * 2 * gap * index / 360);
    //                 let y: number = maliciousOrbit * Math.cos(Math.PI * 2 * gap * index / 360);
    //
    //                 return <Octahedron key={index}
    //                                    position={new Vector3(x, y, 0)}
    //                                    scale={value.mass * 1.25}
    //                                    material-color={value.color}
    //                                    castShadow>
    //                 </Octahedron>
    //             })}
    //         </group>
    //         <Tetrahedron position={new Vector3(30, 30, 0)}
    //                      ref={testGeometry}>
    //             <meshPhongMaterial color="whitesmoke" opacity={0.85} transparent/>
    //         </Tetrahedron>
    //         {/*{props.central.moons?.map((value, index) => {*/}
    //         {/*    */}
    //
    //         {/*    let p = new Vector3(*/}
    //         {/*        props.position.x + (index + 1) * (3 * props.central.mass),*/}
    //         {/*        0,*/}
    //         {/*        0)*/}
    //
    //         {/*    return <group>*/}
    //         {/*        <Sphere key={index}*/}
    //         {/*                position={p}*/}
    //         {/*                scale={value.mass}*/}
    //         {/*                material-color={value.color}/>*/}
    //         {/*    </group>*/}
    //         {/*})}*/}
    //     </group>
    // </Fragment>
}

type MoonsByOrbit = {
    maliciousMoons?: Array<PlanetData>
    infoMoons?: Array<PlanetData>
    suspiciousMoons?: Array<PlanetData>
}

// const infoOrbit: number = 10.0;
// const suspiciousOrbit: number = 22.0;
// const maliciousOrbit: number = 35.0;
// const orbitWidth: number = 0.25
// const orbitHoverThreshold: number = 3