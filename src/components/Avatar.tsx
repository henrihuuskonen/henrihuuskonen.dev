import Particles from "react-tsparticles";
import React, {useCallback, useEffect, useState} from "react";
import {Engine} from "tsparticles-engine";
import {loadFull} from "tsparticles";
import {Container as TsParticleContainer} from "tsparticles-engine/types/Core/Container";
import styles from  "../styles/styles.module.css";
import Image from "next/image";
import {AVATAR_OPTIONS} from "@/components/avatar-options";
import {BACKGROUND_Z_INDEX} from "@/constants";
const Hero = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: TsParticleContainer | undefined) => {
        await console.log(container);
    }, []);

    return (
        <div
            className={styles.avatar__container}>
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
                options={AVATAR_OPTIONS}
            />}
            <div className={styles.image__container}>
                <Image
                    src="/henrihuuskonen-circle.png"
                    width={500}
                    height={500}
                    alt="Picture of the author"
                />
                <div className={styles.name__container}>
                    <h1 className={styles.name}>Henri Huuskonen</h1>
                </div>
            </div>
        </div>
    )
}

export default Hero