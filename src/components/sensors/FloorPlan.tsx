import {useLoader} from "@react-three/fiber"
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader"
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader"
import React from "react"

const FloorPlan = () => {
    const materials = useLoader(MTLLoader, '/floorplan/floorplan-v2.mtl')
    const obj = useLoader(OBJLoader, '/floorplan/floorplan-v2.obj', (loader) => {
        materials.preload()
        loader.setMaterials(materials)
    })

    return <primitive object={obj} scale={[0.01, 0.01, 0.01]}
                      position={[-8.5, -5, 3]} rotation={[0, Math.PI / 2, 0]}/>
}

export default FloorPlan