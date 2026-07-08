import React from "react"
import Head from "next/head"
import Terminal from "@/components/Terminal"
import Footer from "@/components/Footer"
import {
    CONTACT_LINKS,
    LOCATION,
    NAME,
    ROLE,
    SKILLS,
    TEXT_SECTION_SOFTWARE_DEVELOPER,
    TEXT_SECTION_TINKERER,
} from "@/content"

// The terminal reveals content behind interaction, which crawlers and screen
// readers don't perform. This block holds the same content in the DOM at all
// times — visually hidden, but read by search engines and assistive tech, and
// un-hidden for visitors without JavaScript (see the <noscript> style below).
const SeoContent = () => (
    <section className="srOnly seoContent" aria-label={`${NAME}, ${ROLE}`}>
        <h1>
            {NAME} — {ROLE}
        </h1>
        <p>{LOCATION}</p>

        <h2>About</h2>
        {TEXT_SECTION_SOFTWARE_DEVELOPER.map((para, i) => (
            <p key={`about-${i}`}>{para}</p>
        ))}

        <h2>Tinkering</h2>
        {TEXT_SECTION_TINKERER.map((para, i) => (
            <p key={`tinkerer-${i}`}>{para}</p>
        ))}

        <h2>Skills</h2>
        <ul>
            {SKILLS.map((skill) => (
                <li key={skill}>{skill}</li>
            ))}
        </ul>

        <h2>Links</h2>
        <ul>
            {CONTACT_LINKS.map((link) => (
                <li key={link.label}>
                    <a href={link.href}>
                        {link.label} — {link.handle}
                    </a>
                </li>
            ))}
        </ul>
    </section>
)

const Home = () => {
    return (
        <>
            <Head>
                <title>Henri Huuskonen - Software Engineer</title>
            </Head>

            {/* Reveal the SEO/a11y content for visitors without JavaScript. */}
            <noscript
                dangerouslySetInnerHTML={{
                    __html:
                        '<style>.seoContent{position:static!important;width:auto!important;' +
                        'height:auto!important;margin:2rem!important;overflow:visible!important;' +
                        'clip:auto!important;white-space:normal!important;}</style>',
                }}
            />

            <main role="main">
                <SeoContent/>
                <Terminal/>
            </main>

            <Footer/>
        </>
    )
}

export default Home
