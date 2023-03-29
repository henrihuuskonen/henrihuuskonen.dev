import {Button, Card, Container, Input, Spacer, Text, Textarea, useInput} from "@nextui-org/react";
import React from "react";
import Socials from "@/components/Socials";

type Color = "default" | "primary" | "secondary" | "success" | "warning" | "error"

const Contact = () => {
    const {value: emailValue, reset: emailReset, bindings: emailBindings} = useInput("");
    const {value: fullNameValue, reset: fullNameReset, bindings: fullNameBindings} = useInput("");
    const {value: messageValue, reset: messageReset, bindings: messageBindings} = useInput("");
    const validateEmail = (value: string) => {
        /* https://uibakery.io/regex-library/email */
        return value.match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
        );
    };

    const validateFullName = (value: string) => {
        return value.length > 5 && value.length < 50
    };

    const validateMessage = (value: string) => {
        return value.length > 20
    };

    const emailHelper = React.useMemo(() => {
        if (!emailValue)
            return {
                text: "",
                color: "",
                isValid: false
            };
        const isValid = validateEmail(emailValue);
        return {
            text: isValid ? "" : "Enter a valid email",
            color: isValid ? "success" : "error",
            isValid
        };
    }, [emailValue]);

    const fullNameHelper = React.useMemo(() => {
        if (!fullNameValue)
            return {
                text: "",
                color: "",
                isValid: false
            };
        const isValid = validateFullName(fullNameValue);
        return {
            text: isValid ? "" : "I guess your name should be between 5-20 characters 🤨",
            color: isValid ? "success" : "error",
            isValid
        };
    }, [fullNameValue]);

    const messageHelper = React.useMemo(() => {
        if (!messageValue)
            return {
                text: "",
                color: "",
                isValid: false
            };
        const isValid = validateMessage(messageValue);
        return {
            text: isValid ? "" : "Enter a message of at least 20 characters",
            color: isValid ? "success" : "error",
            isValid
        };
    }, [messageValue]);

    const handleClear = () => {
        emailReset();
        fullNameReset();
        messageReset();
    }

    const canSubmit = emailHelper.isValid && fullNameHelper.isValid && messageHelper.isValid || false

    const handleSubmit = () => {
        if (canSubmit) {
            alert("Form submitted successfully");
            emailReset();
            fullNameReset();
            messageReset();
        }
    }

    return (
        <Container sm justify="center" css={{}}>
            <Container xs>
                <Card css={{padding: 10}}>
                    <Card.Header><Text h2 id="lets-connect" css={{
                        fontSize: 24,
                        "@xs": {
                            fontSize: 32
                        },
                        "@md": {
                            fontSize: 40
                        },
                        "@lg": {
                            fontSize: 48
                        }
                    }}>Send me a message</Text></Card.Header>
                    <Card.Body>
                        <Input
                            {...fullNameBindings}
                            size="lg"
                            bordered
                            fullWidth
                            label="Full name"
                            placeholder=""
                            status={fullNameHelper.color as Color}
                            color={fullNameHelper.color as Color}
                            helperColor={fullNameHelper.color as Color}
                            helperText={fullNameHelper.text}
                            type="text"
                        />
                        <Spacer y={1}/>
                        <Input
                            {...emailBindings}
                            bordered
                            fullWidth
                            label="Email"
                            placeholder=""
                            status={emailHelper.color as Color}
                            color={emailHelper.color as Color}
                            helperColor={emailHelper.color as Color}
                            helperText={emailHelper.text}
                            type="email"
                        />
                        <Spacer y={1}/>
                        <Textarea
                            {...messageBindings}
                            bordered
                            fullWidth
                            label="Message"
                            placeholder=""
                            status={messageHelper.color as Color}
                            color={messageHelper.color as Color}
                            helperColor={messageHelper.color as Color}
                            helperText={messageHelper.text}
                        />
                        <Spacer y={2}/>
                        <Container display="flex" fluid justify="flex-end" css={{padding: 0}}>
                            <Button auto flat color="warning" onClick={handleClear}>Clear</Button>
                            <Spacer x={0.2}/>
                            <Button auto flat color="success" disabled={!canSubmit} onClick={handleSubmit}>Send</Button>
                        </Container>
                        <Spacer y={3}/>
                        <Text h3 css={{
                            textAlign: "center", fontSize: 20,
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
                        }}>Or maybe you just want to find me from either of these</Text>
                        <Spacer y={3}/>
                        <Socials/>


                    </Card.Body>
                </Card>

            </Container>
        </Container>
    )
}

export default Contact