import React, {useCallback, useEffect, useState} from "react"
import {Engine} from "tsparticles-engine"
import {loadFull} from "tsparticles"
import {Container as TsParticleContainer} from "tsparticles-engine/types/Core/Container"
import Particles from "react-tsparticles"
import {AVATAR_OPTIONS} from "@/components/avatar-options"

const Background = () => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(true)
    }, [])

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine)
    }, [])

    const particlesLoaded = useCallback(async (container: TsParticleContainer | undefined) => {
        await console.log(container)
    }, [])

    return <>
        {show && <Particles
            id="tsparticles"
            key={`${Math.random()}`}
            style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                height: "100%",
                width: "100%"
            }}
            init={particlesInit}
            loaded={particlesLoaded}
            // TODO: Fix the types
            // @ts-ignore
            options={AVATAR_OPTIONS}
        />}
    </>
}

export default Background