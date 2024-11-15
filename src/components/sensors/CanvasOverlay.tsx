import {SensorConfig} from "@/types"
import styles from "@/pages/sensors/styles.module.css"
import InfoCircle from "@/components/sensors/InfoCircle"
import React from "react"

interface CanvasOverlayProps {
    sensorConfigs: SensorConfig[];
    setCurrentSensor: (sensorConfig: SensorConfig) => void;
}

const CanvasOverlay = ({ sensorConfigs, setCurrentSensor }: CanvasOverlayProps) => {
    return (
        <div className={styles.canvas__overlay}>
            <InfoCircle sensorId={"dht_11-1"} sensorConfigs={sensorConfigs}
                        positionX={280} positionY={520}
                        onClick={(sensorConfig: SensorConfig) => setCurrentSensor(sensorConfig)}/>
            <InfoCircle sensorId={"dht_20-1"} sensorConfigs={sensorConfigs}
                        positionX={270} positionY={120}
                        onClick={(sensorConfig: SensorConfig) => setCurrentSensor(sensorConfig)}/>
        </div>
    )
}

export default CanvasOverlay