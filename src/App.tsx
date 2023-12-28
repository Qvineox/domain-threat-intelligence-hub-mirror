import {Fragment} from 'react'
import './App.css'
import {Sky} from "@react-three/drei";
import {Physics, RigidBody} from "@react-three/rapier";

function App() {
    return (
        <Fragment>
            <Sky sunPosition={[100, 20, 100]}/>
            <Physics gravity={[0, -20, 0]}>
                <RigidBody>
                    <mesh position={[0, 3, -5]}>
                        <boxGeometry/>
                    </mesh>
                </RigidBody>
            </Physics>
        </Fragment>
    )
}

export default App
