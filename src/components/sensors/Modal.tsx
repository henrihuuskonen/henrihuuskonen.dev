import React from "react"
import styles from "../../pages/sensors/styles.module.css"
import Graph from "@/components/Graph"
import {SensorConfig} from "@/types"

interface ModalProps {
    sensor: SensorConfig;
    onClose: () => void;
}

const Modal = ({ sensor, onClose }: ModalProps) => {
    return (
        <div className={styles.modal__container}>
            <div className={styles.modal__content}>
                <h2>{sensor.sensorId}</h2>
                <button onClick={onClose}>Close</button>
                <Graph data={sensor.sensorData}/>
            </div>
        </div>
    )
}

export default Modal