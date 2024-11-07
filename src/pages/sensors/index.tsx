import {GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType} from "next"
import React from "react"
import 'rc-slider/assets/index.css'
import {getDateFormatted} from "@/lib/dateHelper"
import Layout from "@/components/Layout"
import {RawSensorData, SensorConfig, SensorData} from "@/types"
import Graph from "@/components/Graph"
import apiClient from "@/lib/apiClient"




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

export default Home