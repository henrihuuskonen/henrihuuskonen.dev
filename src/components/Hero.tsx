import Particles from "react-tsparticles";
import {Button, Container, Link, Spacer, Text, useTheme} from "@nextui-org/react";
import React, {useCallback, useEffect, useState} from "react";
import {Engine} from "tsparticles-engine";
import {loadFull} from "tsparticles";
import {Container as TsParticleContainer} from "tsparticles-engine/types/Core/Container";

const Hero = () => {
    const {isDark, theme} = useTheme();
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
        <Container
            display={"flex"}
            alignContent={"center"}
            fluid
            css={{
                width: "100%",
                height: "75vh",
                backgroundColor: "$gray50",
                position: "relative"
            }}>

            {show && <Particles
                id="tsparticles"
                key={`${isDark}${Math.random()}`}
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
                options={{
                    fullScreen: {enable: false, zIndex: 10},
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                            onHover: {
                                enable: true,
                                mode: "attract",
                            }
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: isDark ? "#ffffff" : "#000000",
                        },
                        links: {
                            color: isDark ? "#ffffff" : "#000000",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 1,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 50,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: {min: 1, max: 5},
                        },
                    },
                    detectRetina: true,
                }}
            />}

            <Container
                fluid
                css={{
                    padding: 0,
                    zIndex: 1
                }}>
                <Text span weight="thin" css={{
                    fontSize: 20,
                    "@xs": {
                        fontSize: 20
                    },
                    "@sm": {
                        fontSize: 24
                    },
                    "@md": {
                        fontSize: 28
                    },
                    "@lg": {
                        fontSize: 32
                    }
                }}>Hi, my name is</Text>
                <Text h1 weight={"extrabold"} css={{
                    textGradient: "45deg, $blue600 -20%, $pink600 50%",
                    lineHeight: theme?.lineHeights.xs,
                    fontSize: 40,
                    "@xs": {
                        fontSize: 60
                    },
                    "@sm": {
                        fontSize: 80
                    },
                    "@md": {
                        fontSize: 100
                    },
                    "@lg": {
                        fontSize: 120
                    }
                }}>Henri Huuskonen.</Text>
                <Text css={{
                    fontSize: 20,
                    "@xs": {
                        fontSize: 20
                    },
                    "@sm": {
                        fontSize: 24
                    },
                    "@md": {
                        fontSize: 28
                    },
                    "@lg": {
                        fontSize: 32
                    }
                }}>A Full-stack developer dedicated to build functional and scalable software.</Text>
            </Container>
        </Container>
    )
}

export default Hero