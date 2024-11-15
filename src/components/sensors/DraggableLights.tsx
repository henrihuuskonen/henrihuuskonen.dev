import React, {useRef} from 'react'
import {useThree} from '@react-three/fiber'
import {useDrag} from 'react-use-gesture'
import {Group, Object3DEventMap} from "three"

const DraggableLight = () => {
    const lightRef = useRef<Group<Object3DEventMap> | null>(null)
    const {size, viewport} = useThree()
    const aspect = size.width / viewport.width



    const bind = useDrag(({offset: [x, y]}) => {
        if (lightRef.current) {
            lightRef.current?.position.set(x / aspect, -4, y / aspect)
        }
    }, {pointerEvents: true})

    return (
        <>
                {/* @ts-ignore TODO: fix me */}
                <group {...bind()} ref={lightRef} position={[0, -4, 0]}>
                    <pointLight intensity={10} color="white"/>
                    <mesh>
                        <sphereGeometry args={[0.2, 32, 32]}/>
                        <meshBasicMaterial color="yellow"/>
                    </mesh>
                </group>
        </>
    )
}

export default DraggableLight