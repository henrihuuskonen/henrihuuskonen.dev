import {GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType} from "next"
import React from "react"
import 'rc-slider/assets/index.css'
import {getDateFormatted} from "@/lib/dateHelper"
import Layout from "@/components/Layout"
import {RawSensorData, SensorData} from "@/types"
import Graph from "@/components/Graph"


const epochToTime = (epoch: number): string => {
    const date = new Date(epoch) // Multiply by 1000 if the epoch is in seconds, omit if it's in milliseconds
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
}

const Home = ({
                  data
              }: InferGetServerSidePropsType<typeof getServerSideProps>) => {


    return (
        <Layout>
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

interface SensorConfig {
    sensorId: string
    sensorData: SensorData[]
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
    const response = await fetch(`https://api.henrihuuskonen.dev/api/fetch_data?date=${dateQuery}&sensor=${sensors[1]}`)
    if (response.status !== 200) {
        return {
            props: {
                data: []
            },
        }
    }

    const rawData: RawSensorData[] = await response.json()

    const mappedData: SensorConfig | undefined = rawData.length ? {
        sensorId: rawData[0].s,
        sensorData: rawData.map((d: RawSensorData) => {
            return {
                temperature: d.t,
                humidity: d.h,
                timestamp: epochToTime(d.ts)
            }
        })
    } : undefined


    return {
        props: {
            data: mappedData ? [mappedData] : []
        },
    }
}

export default Home