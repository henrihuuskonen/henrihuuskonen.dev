import React from "react"

interface LightsProps {
    livingRoomLight: boolean;
    kitchenLight: boolean;
    hallwayLight: boolean;
    bathroomLight: boolean;
    bedroomLight: boolean;
    kidsRoomLight: boolean;
}

const Lights = ({
                    livingRoomLight,
                    kitchenLight,
                    hallwayLight,
                    bathroomLight,
                    bedroomLight,
                    kidsRoomLight,
                }: LightsProps) => {
    const YPosition = -3
    const Intensity = 20
    const Distance = 3

    return (
        <>
            {/* Living room*/}
            {livingRoomLight &&
                <pointLight intensity={Intensity} distance={Distance + 2} position={[1, YPosition, 3]} decay={2}/>}

            {/* kitchen */}
            {kitchenLight &&
                <>
                    <pointLight intensity={Intensity} distance={Distance} position={[-2, YPosition, 1]}
                                decay={2}/>
                    <pointLight intensity={Intensity} distance={Distance} position={[-2, YPosition, 3]}
                                decay={2}/>
                    <pointLight intensity={Intensity} distance={Distance} position={[-2, YPosition, 5]}
                                decay={2}/>
                </>

            }
            {/* hallway */}
            {hallwayLight &&
                <pointLight intensity={Intensity} distance={Distance + 1} position={[1, YPosition, -2]} decay={2}/>
            }
            {/* bathroom */}
            {bathroomLight &&
                <pointLight intensity={Intensity} distance={Distance} position={[-2.5, YPosition, -2]} decay={2}/>
            }
            {/* bedroom */}
            {bedroomLight &&
                <pointLight intensity={Intensity} distance={Distance} position={[1.5, YPosition, -5]} decay={2}/>
            }
            {/* kids room */}
            {kidsRoomLight &&
                <pointLight intensity={Intensity} distance={Distance} position={[-2, YPosition, -5.5]} decay={2}/>
            }
            </>
    )
}

export default Lights