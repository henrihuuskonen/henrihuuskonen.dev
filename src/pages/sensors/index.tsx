import {GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType} from "next"
import React, {Suspense, useEffect, useState} from "react"
import 'rc-slider/assets/index.css'
import {getDateFormatted} from "@/lib/dateHelper"
import Layout from "@/components/Layout"
import {SensorConfig} from "@/types"
import apiClient from "@/lib/apiClient"
import {Canvas} from "@react-three/fiber"
import {OrbitControls} from "@react-three/drei"
import {useIsClient} from "@/hooks/isClient"
import Lights from "@/components/sensors/Lights"
import styles from "./styles.module.css"
import Modal from "@/components/sensors/Modal"
import CanvasOverlay from "@/components/sensors/CanvasOverlay"
import FloorPlan from "@/components/sensors/FloorPlan"

const Sensors = ({
                     data
                 }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [isClient] = useIsClient()

    const [showModal, setShowModal] = useState(false)
    const [currentSensor, setCurrentSensor] = useState<SensorConfig | undefined>(undefined)


    useEffect(() => {
        setShowModal(!!currentSensor)
    }, [currentSensor])

    return (
        <Layout>
            {isClient && (
                <div className={styles.canvas__container}>
                    <CanvasOverlay sensorConfigs={data} setCurrentSensor={setCurrentSensor}/>
                    {(showModal && currentSensor) &&
                        <Modal sensor={currentSensor} onClose={() => setCurrentSensor(undefined)}/>
                    }
                    <Canvas className={styles.canvas} camera={{
                        position: [0, 15, 0], // Top-down view from above
                        fov: 50,
                        near: 0.1,
                        far: 1000,
                        up: [0, 1, 0], // Standard Y-axis up direction
                        rotation: [Math.PI / 2, 0, 0] // Rotate the camera to face downward
                    }}>
                        <Lights
                        />
                        <Suspense fallback={null}>
                            <FloorPlan/>
                        </Suspense>
                        <OrbitControls enableDamping={false} enablePan={false} enableRotate={false} enableZoom={false}
                                       target={[0, 0, 0]}/>
                    </Canvas>
                </div>
            )}
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