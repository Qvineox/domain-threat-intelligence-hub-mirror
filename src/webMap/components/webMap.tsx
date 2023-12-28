import {ChangeEvent, Fragment, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Physics} from "@react-three/rapier";

import {ObamiumModel} from "@/webMap/models/Obamium.tsx";

export function WebMap() {
    const [rotationSpeed, setRotationSpeed] = useState<number>(0.01)


    return <Fragment>
        <Canvas camera={{fov: 45, position: [4, 4, 1]}}>
            <ambientLight position={[5, 5, 10]} intensity={3}/>
            <OrbitControls makeDefault/>
            <Physics gravity={[0, 0, 0]}>
                <ObamiumModel rotationSpeed={rotationSpeed}/>
            </Physics>
        </Canvas>
        <div className={"speed-selector"}>
            <h2>Скорость вращения Oбамиума</h2>
            <input type={'number'}
                   value={rotationSpeed}
                   step={0.01}
                   onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                       if (evt.target.value) {
                           setRotationSpeed(parseFloat(evt.target.value))
                       }
                   }}/>
        </div>
    </Fragment>
}