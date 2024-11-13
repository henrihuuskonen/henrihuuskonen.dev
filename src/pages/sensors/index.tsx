import {GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType} from "next"
import React, {Suspense, useState} from "react"
import 'rc-slider/assets/index.css'
import {getDateFormatted} from "@/lib/dateHelper"
import Layout from "@/components/Layout"
import {SensorConfig} from "@/types"
import Graph from "@/components/Graph"
import apiClient from "@/lib/apiClient"
import {Canvas, useLoader} from "@react-three/fiber"
import {OrbitControls} from "@react-three/drei"
import {useIsClient} from "@/hooks/isClient"
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
import Lights from "@/pages/sensors/components/Lights"
import styles from "./styles.module.css"
import InfoCircle from "@/pages/sensors/components/InfoCircle"

const Sensors = ({
                     data
                 }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [isClient] = useIsClient()

    const [livingRoomLight, setLivingRoomLight] = useState(false)
    const [kitchenLight, setKitchenLight] = useState(false)
    const [hallwayLight, setHallwayLight] = useState(false)
    const [bathroomLight, setBathroomLight] = useState(false)
    const [bedroomLight, setBedroomLight] = useState(false)
    const [kidsRoomLight, setKidsRoomLight] = useState(false)


    const FloorPlan = () => {
        const materials = useLoader(MTLLoader, '/floorplan/home.mtl')
        const obj = useLoader(OBJLoader, '/floorplan/home.obj', (loader) => {
            materials.preload()
            loader.setMaterials(materials)
        })

        return <primitive object={obj} scale={[0.01, 0.01, 0.01]}
                          position={[-8.5, -5, 3]} rotation={[0, Math.PI / 2, 0]}/>
    }


    const CanvasOverlay = () => {
        return (
            <div className={styles.canvas__overlay}>
                <InfoCircle roomId={"kids_room"} temperature={"28"} humidity={"51"}
                            onClick={() => setKidsRoomLight(!kidsRoomLight)} positionX={100} positionY={150}/>
                <InfoCircle roomId={"bed_room"} temperature={"28"} humidity={"51"}
                            onClick={() => setBedroomLight(!bedroomLight)} positionX={280} positionY={150}/>
                <InfoCircle roomId={"living_room"} temperature={"28"} humidity={"51"}
                            onClick={() => setLivingRoomLight(!livingRoomLight)} positionX={280} positionY={520}/>
            </div>
        )
    }

    return (
        <Layout>
            {isClient && (
                <div className={styles.canvas__container}>
                    <CanvasOverlay/>
                    <Canvas className={styles.canvas} camera={{
                        position: [0, 15, 0], // Top-down view from above
                        fov: 50,
                        near: 0.1,
                        far: 1000,
                        up: [0, 1, 0], // Standard Y-axis up direction
                        rotation: [Math.PI / 2, 0, 0] // Rotate the camera to face downward
                    }}>
                        <ambientLight intensity={0.4}/>
                        <Lights
                            livingRoomLight={livingRoomLight}
                            kitchenLight={kitchenLight}
                            hallwayLight={hallwayLight}
                            bathroomLight={bathroomLight}
                            bedroomLight={bedroomLight}
                            kidsRoomLight={kidsRoomLight}
                        />
                        <Suspense fallback={null}>
                            <FloorPlan/>
                        </Suspense>
                        <OrbitControls enableDamping={false} enablePan={false} enableRotate={false} enableZoom={false}
                                       target={[0, 0, 0]}/>
                    </Canvas>
                </div>
            )}

            <div style={{position: "absolute", top: 0, left: 0}}>
                <button
                    onClick={() => setLivingRoomLight(!livingRoomLight)}
                >
                    Toggle Living Room Light
                </button>
                <button
                    onClick={() => setKitchenLight(!kitchenLight)}
                >
                    Toggle Kitchen Light
                </button>
                <button
                    onClick={() => setHallwayLight(!hallwayLight)}
                >
                    Toggle Hallway Light
                </button>
                <button
                    onClick={() => setBathroomLight(!bathroomLight)}
                >
                    Toggle Bathroom Light
                </button>

                <button
                    onClick={() => setBedroomLight(!bedroomLight)}
                >
                    Toggle Bedroom Light
                </button>
                <button
                    onClick={() => setKidsRoomLight(!kidsRoomLight)}
                >
                    Toggle Kids Room Light
                </button>
            </div>


            {data && data.map(sensor => {
                return (
                    <div key={sensor.sensorId}>
                        <p>{sensor.sensorId}</p>
                        <Graph data={sensor.sensorData}/>
                    </div>
                )
            })}

        </Layout>
    )
}

interface PageProps {
    data: SensorConfig[];
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context: GetServerSidePropsContext) => {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    const sensors = ['dht_11-1', 'dht_20-1']

    const today = new Date()
    const dateQuery = getDateFormatted(today)

    const promises = sensors.map(sensorId => apiClient.fetchSensorData(dateQuery, sensorId))
    const sensorDatas = await Promise.all(promises)

    return {
        props: {
            data: sensorDatas.filter((data): data is SensorConfig => data != undefined)
        },
    }
}

export default Sensors