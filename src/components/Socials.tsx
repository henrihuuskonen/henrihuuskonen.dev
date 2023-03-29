import {Container} from "@nextui-org/react";
import React from "react";
import TiltingImageLink from "@/components/TiltingImageLink";

const Socials = () => {
    return (
        <Container display="flex" direction="row" wrap="nowrap">
            <TiltingImageLink src="/linkedin.png" alt="LinkedIn Logo"
                              href="https://www.linkedin.com/in/henri-huuskonen-34850853/"/>
            <TiltingImageLink src="/github.png" alt="Github Logo" href="https://github.com/henrihuuskonen/"/>
        </Container>
    )
}

export default Socials