import {RawSensorData, SensorConfig} from "@/types"
import {epochToTime} from "@/lib/dateHelper"

const fetchSensorData = async (dateQuery: string, sensorId: string): Promise<SensorConfig | undefined> => {
    const response = await fetch(`https://api.henrihuuskonen.dev/api/fetch_data?date=${dateQuery}&sensor=${sensorId}`)
    if (response.status !== 200) {
        return undefined
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

    return mappedData
}

export default {
    fetchSensorData
}