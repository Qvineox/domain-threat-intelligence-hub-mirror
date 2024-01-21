import {Group, Mesh, Vector3} from "three";
import {NodeDataType, PlanetData} from "@/components/web_map/models/planetData.ts";
import {useRef, useState} from "react";
import {Box, Octahedron, Ring, Sphere, Tetrahedron} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";

type OrbitProps = {
    orbitCenter: Vector3
    orbitRadius: number
    planets?: Array<PlanetData>
    rotationSpeed: number
    hoverObject: (id: number, isHovered: boolean) => void
    clickObject: (id: number, position: Vector3) => void
}

const hoverThreshold: number = 0.2

export function Orbit(props: OrbitProps) {
    const orbitRef = useRef<Group>(null!)
    const [isHovered, setIsHovered] = useState<boolean>(false)

    useFrame((_, delta) => {
        orbitRef.current.rotation.z += props.rotationSpeed * delta
    })

    return <group ref={orbitRef}>
        <Ring
            args={[props.orbitRadius - props.orbitRadius * hoverThreshold, props.orbitRadius + props.orbitRadius * hoverThreshold, 360]}
            onPointerOver={() => {
                setIsHovered(true)
            }}
            onPointerLeave={() => {
                setIsHovered(false)
            }} visible={false}>
        </Ring>
        <Ring args={[props.orbitRadius, props.orbitRadius + 0.3, 360]}>
            {isHovered ? <meshPhongMaterial color="whitesmoke" opacity={0.55} transparent/>
                : <meshPhongMaterial color="grey" opacity={0.05} transparent/>
            }
        </Ring>
        {props.planets?.map((value, index) => {
            const gap: number = 360 / props.planets!.length
            let x: number = props.orbitRadius * Math.sin(Math.PI * 2 * gap * index / 360);
            let y: number = props.orbitRadius * Math.cos(Math.PI * 2 * gap * index / 360);

            return <OrbitPlanet key={index}
                                orbitCenter={props.orbitCenter}
                                planetData={value}
                                rotation={0.25}
                                startingPosition={new Vector3(x, y, 0)}
                                hoverObject={props.hoverObject}
                                clickObject={props.clickObject}/>

            // return <Sphere key={index}
            //                position={new Vector3(x, y, 0)}
            //                scale={value.mass}
            //                castShadow>
            //     <meshPhongMaterial color={value.color}/>
            // </Sphere>
        })}
    </group>
}

type PlanetProps = {
    orbitCenter: Vector3
    planetData: PlanetData
    startingPosition: Vector3
    rotation: number
    hoverObject: (id: number, isHovered: boolean) => void
    clickObject: (id: number, position: Vector3) => void
}

export function OrbitPlanet(props: PlanetProps) {
    const planetRef = useRef<Mesh>(null!)
    const [isHovered, setIsHovered] = useState<boolean>(false)

    useFrame((_, delta) => {
        planetRef.current.rotation.x += props.rotation * delta
        planetRef.current.rotation.y += props.rotation * delta
        planetRef.current.rotation.z += props.rotation * delta
    })

    const handlePointerOver = () => {
        props.hoverObject(props.planetData.id, true)
        setIsHovered(true)
    }

    const handlePointerLeave = () => {
        props.hoverObject(props.planetData.id, false)
        setIsHovered(false)
    }

    const handleClick = () => {
        const position = planetRef.current.localToWorld(new Vector3(0, 0, 0))
        console.debug("current position is " + position.toArray())

        props.clickObject(props.planetData.id, position)
    }

    switch (props.planetData.type) {
        case NodeDataType.Safe:
            return <group position={props.startingPosition}
                          onClick={handleClick}
                          onPointerOver={handlePointerOver}
                          onPointerLeave={handlePointerLeave}>
                <Ring args={[props.planetData.mass, props.planetData.mass + 0.2, 360]} visible={isHovered}/>
                <Sphere scale={props.planetData.mass * 0.75} visible={false}/>
                <Box ref={planetRef}
                     scale={props.planetData.mass * 0.75}>
                    <meshPhongMaterial color={props.planetData.color} opacity={0.85} wireframe/>
                </Box>
            </group>
        case NodeDataType.Suspicious:
            return <group position={props.startingPosition}
                          onClick={handleClick}
                          onPointerOver={handlePointerOver}
                          onPointerLeave={handlePointerLeave}>
                <Ring args={[props.planetData.mass + 2, props.planetData.mass + 2.2, 360]} visible={isHovered}/>
                <Sphere scale={props.planetData.mass * 1.5} visible={false}/>
                <Tetrahedron ref={planetRef}
                             scale={props.planetData.mass * 1.5}>
                    <meshPhongMaterial color={props.planetData.color} opacity={0.85} wireframe/>
                </Tetrahedron>
            </group>
        case NodeDataType.Malware:
            return <group position={props.startingPosition}
                          onClick={handleClick}
                          onPointerOver={handlePointerOver}
                          onPointerLeave={handlePointerLeave}>
                <Ring args={[props.planetData.mass + 4, props.planetData.mass + 4.2, 360]} visible={isHovered}/>
                <Sphere scale={props.planetData.mass * 2} visible={false}/>
                <Octahedron args={[1, 1]}
                            ref={planetRef}
                            scale={props.planetData.mass * 2}>
                    <meshPhongMaterial color={props.planetData.color} opacity={0.85} wireframe/>
                </Octahedron>
            </group>
    }


}