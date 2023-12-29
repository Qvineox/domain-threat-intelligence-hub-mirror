import * as THREE from "three";
import {useGLTF} from "@react-three/drei";
import {GLTF} from "three-stdlib";
import {useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";

import obamiumGLB from '/models/obamium.glb'

type ObamiumProps = {
    rotationSpeed: number
}

type GLTFResult = GLTF & {
    nodes: {
        Object_4: THREE.Mesh;
    };
    materials: {
        ["Material.001"]: THREE.MeshStandardMaterial;
    };
};

export function ObamiumModel(props: ObamiumProps) {
    const {nodes, materials} = useGLTF(obamiumGLB) as GLTFResult;
    const ref = useRef(null!)

    const [isHovered, setIsHovered] = useState<boolean>(false)

    useFrame(() => {
        if (isHovered) {
            ref.current.rotation!.y -= props.rotationSpeed
        } else {
            ref.current.rotation!.y += props.rotationSpeed
        }
    })

    return (
        <group dispose={null}>
            <mesh ref={ref}
                  castShadow receiveShadow
                  onPointerOver={() => setIsHovered(true)}
                  onPointerLeave={() => setIsHovered(false)}
                  geometry={nodes.Object_4.geometry}
                  material={materials["Material.001"]}
            />
        </group>
    );
}

useGLTF.preload(obamiumGLB);