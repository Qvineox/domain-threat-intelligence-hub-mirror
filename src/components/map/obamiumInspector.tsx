import {ChangeEvent, Fragment, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Physics} from "@react-three/rapier";
import {ObamiumModel} from "@/components/map/components/Obamium.tsx";
import "./styles/obamium.scss"

export function ObamiumInspector() {
    const [rotationSpeed, setRotationSpeed] = useState<number>(0.01)

    return <Fragment>
        <div id={'canvas'}>
            <Canvas camera={{fov: 45, position: [4, 4, 1]}}>
                <ambientLight position={[5, 5, 10]} intensity={3}/>
                <OrbitControls makeDefault/>
                <Physics gravity={[0, 0, 0]}>
                    <ObamiumModel rotationSpeed={rotationSpeed}/>
                </Physics>
            </Canvas>
        </div>
        <div className={"speed-selector"}>
            <h2>Скорость вращения Oбамиума</h2>
            <input type={'number'}
                   value={rotationSpeed}
                   step={0.01}
                   onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                       console.debug(evt.target.value)

                       if (evt.target.value !== undefined) {
                           if (evt.target.value == "") {
                               setRotationSpeed(0)

                               return
                           }

                           setRotationSpeed(parseFloat(evt.target.value))
                       }


                   }}/>
        </div>
    </Fragment>
}