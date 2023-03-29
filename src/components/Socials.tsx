import {Container, Image} from "@nextui-org/react";
import Tilt from "react-parallax-tilt";
import React from "react";
import TiltingImageLink from "@/components/TiltingImageLink";

const Socials  = () => {
    return (
        <Container display="flex" direction="row" wrap="nowrap">
            <TiltingImageLink src="/linkedin.png" alt="LinkedIn Logo" href="https://www.linkedin.com/in/henri-huuskonen-34850853/" imageCss={{padding: 10}}/>
            <TiltingImageLink src="/github.png" alt="Github Logo" href="https://github.com/henrihuuskonen/" imageCss={{padding: 10}}/>
        </Container>
    )
}

export default Socials