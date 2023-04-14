import {Button, Card, Container, Input, Spacer, Text, Textarea, useInput} from "@nextui-org/react";
import React from "react";
import Socials from "@/components/Socials";

type Color = "default" | "primary" | "secondary" | "success" | "warning" | "error"

const Contact = () => {
    return (
        <Container sm justify="center" css={{}}>
            <Container xs>
                <Card css={{padding: 10}}>
                    <Card.Body>
                    <Socials/>
                    </Card.Body>
                </Card>

            </Container>
        </Container>
    )
}

export default Contact