import {GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType} from "next"
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import React, {useCallback, useEffect, useState} from "react"
import Slider from "rc-slider"
import 'rc-slider/assets/index.css'
import {TooltipProps} from "recharts/types/component/Tooltip"
import {getDateFormatted} from "@/lib/date_helper"
import styles from "../../styles/home_styles.module.css"

interface SensorData {
    t: number;  // temperature
    h: number;  // humidity
    ts: number;  // timestamp
    s: string;  // sensorId
}

const epochToTime = (epoch: number): string => {
    const date = new Date(epoch) // Multiply by 1000 if the epoch is in seconds, omit if it's in milliseconds
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
}

const Home = ({
                  data
              }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const graphData = data.map((d: SensorData) => {
        return {
            temperature: d.t,
            humidity: d.h,
            timestamp: epochToTime(d.ts)
        }
    })
    const [range, setRange] = useState([0, graphData.length])
    const handleSliderChange = useCallback((value: number | number[]) => {
        if (Array.isArray(value)) {
            setRange(value)
        }
    }, [])

    const visibleData = graphData.slice(range[0], range[1] + 1)

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

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

    console.log(range)


    return (
        <div>
            {isClient && data.length > 0 && (
                <div style={{width: `1000px`, height: "500px", backgroundColor: "#303030"}}>
                    <ResponsiveContainer>
                        <LineChart width={800} height={400} data={visibleData}>
                            <Tooltip content={<CustomTooltip/>}/>
                            <Line type="linear" dataKey="temperature" stroke="red"/>
                            <Line type="linear" dataKey="humidity" stroke="blue"/>
                            <CartesianGrid stroke="#cccc"/>
                            <YAxis/>
                            <XAxis dataKey="timestamp"/>
                        </LineChart>
                    </ResponsiveContainer>
                    <div className={styles.slider__container}>
                        <Slider
                            range
                            defaultValue={[0, graphData.length]}
                            step={1}
                            min={0}
                            max={graphData.length}
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

        </div>
    )
}

interface PageProps {
    data: SensorData[];
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context: GetServerSidePropsContext) => {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    const sensors = ['dht_11-1']

    const today = new Date()
    const dateQuery = getDateFormatted(today)
    const response = await fetch(`https://api.henrihuuskonen.dev/api/fetch_data?date=${dateQuery}&sensor=${sensors[0]}`)
    if (response.status !== 200) {
        return {
            props: {
                data: []
            },
        }
    }

    const data: SensorData[] = await response.json()

    return {
        props: {
            data: data ?? []
        },
    }
}

export default Home