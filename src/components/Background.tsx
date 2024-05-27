import React, {useEffect, useState} from "react"
import {AVATAR_OPTIONS} from "@/components/avatar-options"
import {initParticlesEngine, Particles} from "@tsparticles/react"
import styles from "@/styles/styles.module.css"
import {loadFull} from "tsparticles"

const Background = () => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine)
        }).then(() => {
            setShow(true)
        })
    }, [])

    return <>
        {show && <Particles
            id="tsparticles"
            className={styles.tsparticles__wrapper}
            options={AVATAR_OPTIONS}
        />}
    </>
}

export default Background