import styles from "@/pages/sensors/styles.module.css"
import React from "react"

interface InfoCircleProps {
    roomId: string
    temperature: string
    humidity: string
    positionX: number
    positionY: number
    onClick: () => void
}

const InfoCircle = ({roomId, temperature, humidity, positionY, positionX, onClick}: InfoCircleProps) => {
    return (
        <div id={roomId} className={styles.info_circle} style={{top:positionY ,left: positionX }} onClick={onClick}>
            <p className={styles.info_circle__temperature}>{temperature}°C</p>
            <p className={styles.info_circle__humidity}>{humidity}%</p>
        </div>
    )
}
export default InfoCircle