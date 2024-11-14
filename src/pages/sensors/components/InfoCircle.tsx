import React from "react"
import styles from "../styles.module.css"
import {SensorConfig, SensorData} from "@/types"

interface InfoCircleProps {
    sensorId: string
    sensorConfigs: SensorConfig[]
    positionX: number
    positionY: number
    onClick: (sensorConfig: SensorConfig) => void
}

const getNewestData = (data: SensorConfig): SensorData | undefined => {
    if (data.sensorData.length > 0) {
        return data.sensorData[0]
    }
}

const InfoCircle = ({sensorId, sensorConfigs, positionY, positionX, onClick}: InfoCircleProps) => {
    const sensorConfig = sensorConfigs.find(sensor => sensor.sensorId === sensorId)
    if (!sensorConfig) {
        return null
    }
    const newestData = getNewestData(sensorConfig)
    const temperature = newestData ? newestData.temperature : '-1'
    const humidity = newestData ? newestData.humidity : '-1'

    const handleOnClick = () => {
        if (sensorConfig) {
            onClick(sensorConfig)
        }
    }

    return (
        <div id={sensorId} className={styles.info_circle} style={{top:positionY ,left: positionX }} onClick={handleOnClick}>
            <p className={styles.info_circle__temperature}>{temperature}°C</p>
            <p className={styles.info_circle__humidity}>{humidity}%</p>
        </div>
    )
}
export default InfoCircle