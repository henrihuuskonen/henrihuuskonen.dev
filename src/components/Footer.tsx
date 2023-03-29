import {Container, Text} from "@nextui-org/react";
import React from "react";

const Footer = () => {
    return (
        <Container fluid justify="center" css={{}}>
            <Text h6 css={{
                textAlign: "center"
            }}>Created by Henri Huuskonen</Text>
        </Container>
    )
}

export default Footer