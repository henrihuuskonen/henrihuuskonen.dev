import {Image, Link} from "@nextui-org/react";
import Tilt from "react-parallax-tilt";
import React, {CSSProperties, useEffect} from "react";
import {useMediaQuery} from 'react-responsive'

interface TiltingImageLinkProps {
    href: string
    src: string
    alt: string
}

const TiltingImageLink = ({href, src, alt}: TiltingImageLinkProps) => {
    const isTabletOrMobile = useMediaQuery({maxWidth: 425})

    useEffect(() => {
        console.log(isTabletOrMobile)
    }, [isTabletOrMobile])


    return (
        <Tilt scale={0.95}>
            <Link href={href} target="_blank" rel="noopener noreferrer">
                <Image src={src} alt={alt}></Image>
            </Link>
        </Tilt>

    )
}

export default TiltingImageLink