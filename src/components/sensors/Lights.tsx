import React from "react"
import DraggableLight from "@/components/sensors/DraggableLights"

interface LightsProps {
}

const Lights = ({
                }: LightsProps) => {
    const YPosition = -4
    const Intensity = 10
    const AmbientIntensity = 1
    const Distance = 2.5

    return (
        <>
            <DraggableLight/>
            {/* Living room*/}
            <pointLight intensity={AmbientIntensity} distance={Distance + 2} position={[2, YPosition, 2]} decay={2}/>
            <pointLight intensity={Intensity} distance={Distance + 2} position={[2, YPosition, 3]} decay={2}/>
            <pointLight intensity={AmbientIntensity} distance={Distance + 2} position={[2, YPosition, 5]} decay={2}/>
            {/* kitchen */}
            <>
                <pointLight intensity={AmbientIntensity} distance={Distance} position={[-2, YPosition, 1]}
                            decay={2}/>
                <pointLight intensity={AmbientIntensity} distance={Distance} position={[-2, YPosition, 3]}
                            decay={2}/>
                <pointLight intensity={AmbientIntensity} distance={Distance} position={[-2, YPosition, 5]}
                            decay={2}/>
            </>
            {/* hallway */}
            <pointLight intensity={1} distance={Distance + 1} position={[1, YPosition, -2]} decay={2}/>
            <pointLight intensity={1} distance={Distance + 1} position={[2.5, YPosition, -2]} decay={2}/>
            {/* bathroom */}
            <pointLight intensity={AmbientIntensity} distance={Distance} position={[-2, YPosition, -2]} decay={2}/>
            {/* bedroom */}
            <pointLight intensity={Intensity} distance={Distance} position={[1.5, YPosition, -5.5]} decay={1}/>
            {/* kids room */}
            <pointLight intensity={Intensity} distance={Distance} position={[-1.5, YPosition, -5.5]} decay={2}/>
        </>
    )
}

export default Lights