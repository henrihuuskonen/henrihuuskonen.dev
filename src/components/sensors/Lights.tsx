import React from "react"

interface LightsProps {
}

const Lights = ({
                }: LightsProps) => {
    const YPosition = -3
    const Intensity = 20
    const AmbientIntensity = 3
    const Distance = 3

    return (
        <>
            {/* Living room*/}
            <pointLight intensity={Intensity} distance={Distance + 2} position={[1, YPosition, 3]} decay={2}/>
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
            <pointLight intensity={AmbientIntensity} distance={Distance + 1} position={[1, YPosition, -2]} decay={2}/>
            {/* bathroom */}
            <pointLight intensity={AmbientIntensity} distance={Distance} position={[-2, YPosition, -2]} decay={2}/>
            {/* bedroom */}
            <pointLight intensity={Intensity} distance={Distance} position={[1.5, YPosition, -5]} decay={2}/>
            {/* kids room */}
            <pointLight intensity={Intensity} distance={Distance} position={[-2, YPosition, -5.5]} decay={2}/>
            </>
    )
}

export default Lights