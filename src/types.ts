export interface RawSensorData {
    t: number;  // temperature
    h: number;  // humidity
    ts: number;  // timestamp
    s: string;  // sensorId
}

export interface SensorData {
    temperature: number;
    humidity: number;
    timestamp: string;
}

export interface SensorConfig {
    sensorId: string
    sensorData: SensorData[]
}