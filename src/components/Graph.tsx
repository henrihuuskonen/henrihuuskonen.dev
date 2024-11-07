import React, {useCallback, useState} from "react"
import {useIsClient} from "@/hooks/isClient"
import {TooltipProps} from "recharts/types/component/Tooltip"
import styles from "@/pages/sensors/styles.module.css"
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import Slider from "rc-slider"
import {SensorData} from "@/types"

interface GraphProps {
    data: SensorData[]
}

const Graph = ({data}: GraphProps) => {
    const [isClient] = useIsClient()
    const [range, setRange] = useState([0, data.length])
    const handleSliderChange = useCallback((value: number | number[]) => {
        if (Array.isArray(value)) {
            setRange(value)
        }
    }, [])


    const visibleData = data.slice(range[0], range[1] + 1)

    const CustomTooltip = ({active, payload, label}: TooltipProps<any, any>) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${label}`}</p>
                    <p>Temperature: {payload[0].value}</p>
                    <p>Humidity: {payload[1].value}</p>
                </div>
            )
        }

        return null
    }

    return (
        <>
        {(isClient && data.length > 0) && (
            <div className={styles.card__container}>
                <ResponsiveContainer>
                    <LineChart width={800} height={400} data={visibleData}>
                        <Tooltip content={<CustomTooltip/>}/>
                        <Line type="basis" dataKey="temperature" stroke="red" dot={false}/>
                        <Line type="basis" dataKey="humidity" stroke="blue" dot={false}/>
                        <CartesianGrid stroke="#cccc"/>
                        <YAxis/>
                        <XAxis dataKey="timestamp"/>
                    </LineChart>
                </ResponsiveContainer>
                <div className={styles.slider__container}>
                    <Slider
                        range
                        defaultValue={[0, data.length]}
                        step={1}
                        min={0}
                        max={data.length}
                        onChange={handleSliderChange}
                        allowCross={false}
                        aria-label="Select data range"
                        track={true}
                        styles={{
                            tracks: {
                                background: `linear-gradient(to right, blue, red)`,
                            },
                            track: {
                                background: 'transparent',
                            },
                        }}
                    />
                </div>
            </div>
        )}
        </>
    )
}

export default Graph