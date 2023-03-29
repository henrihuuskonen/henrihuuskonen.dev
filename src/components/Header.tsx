import {Avatar, Button, Link, Navbar, Spacer, Switch, Text, useTheme} from "@nextui-org/react";
import React from "react";
import {useTheme as useNextTheme} from "next-themes";
import {SunIcon} from "@/components/SunIcon";
import {MoonIcon} from "@/components/MoonIcon";

const Header = () => {
    const {setTheme} = useNextTheme();
    const {isDark, type} = useTheme();

    return <Navbar isBordered variant="sticky">
        <Navbar.Brand>
            <Avatar
                size="md"
                src="/avatar.png"/>
            <Spacer/>
            <Text h1 hideIn="xs" weight={"extrabold"} css={{
                margin: 0,
                fontSize: 40,
            }}>Henri Huuskonen.</Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
        </Navbar.Content>
        <Navbar.Content>
            <Navbar.Item>
                <Switch
                    checked={isDark}
                    onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                    iconOn={<MoonIcon />}
                    iconOff={<SunIcon />}
                />
            </Navbar.Item>
            <Navbar.Item>
                <Link href="/CV - Henri Huuskonen March 2023.pdf" target="_blank" rel="noopener noreferrer">
                    <Button auto flat>
                        Resume
                    </Button>
                </Link>

            </Navbar.Item>
        </Navbar.Content>
    </Navbar>
}

export default Header