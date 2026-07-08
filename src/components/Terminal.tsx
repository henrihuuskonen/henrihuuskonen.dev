import React, {ReactNode, useCallback, useEffect, useRef, useState} from "react"
import styles from "./Terminal.module.css"
import {
    CONTACT_LINKS,
    LOCATION,
    NAME,
    ROLE,
    SKILLS,
    TEXT_SECTION_SOFTWARE_DEVELOPER,
    TEXT_SECTION_TINKERER,
} from "@/content"

const PROMPT = "henri@huuskonen:~$"

// The intro (steps before this index) plays automatically; the rest waits
// for the visitor to interact before it is revealed.
const GATE_STEP = 1

interface Step {
    command: string
    output: ReactNode
}

const whoamiOutput = (
    <div className={styles.whoami}>
        <p className={styles.name}>{NAME}</p>
        <p className={styles.role}>{ROLE}</p>
        <p className={styles.meta}>{`# ${LOCATION}`}</p>
    </div>
)

const aboutOutput = (
    <div className={styles.prose}>
        {TEXT_SECTION_SOFTWARE_DEVELOPER.map((para, i) => (
            <p key={i} className={styles.bodyText}>
                {para}
            </p>
        ))}
    </div>
)

const tinkererOutput = (
    <div className={styles.prose}>
        {TEXT_SECTION_TINKERER.map((para, i) => (
            <p key={i} className={styles.bodyText}>
                {para}
            </p>
        ))}
    </div>
)

const skillsOutput = (
    <ul className={styles.tags}>
        {SKILLS.map((skill) => (
            <li key={skill} className={styles.tag}>
                {skill}
            </li>
        ))}
    </ul>
)

const contactOutput = (
    <div className={styles.links}>
        {CONTACT_LINKS.map((link) => (
            <a
                key={link.label}
                className={styles.link}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className={styles.arrow} aria-hidden="true">
                    →
                </span>
                <span>{link.label}</span>
                <span className={styles.handle}>{link.handle}</span>
            </a>
        ))}
    </div>
)

const STEPS: Step[] = [
    {command: "whoami", output: whoamiOutput},
    {command: "cat about.md", output: aboutOutput},
    {command: "cat tinkerer.md", output: tinkererOutput},
    {command: "ls ~/skills", output: skillsOutput},
    {command: "./contact.sh", output: contactOutput},
]

// Commands available once the intro has been clicked through.
const HELP: [string, string][] = [
    ["whoami", "name, role, location"],
    ["about", "a short bio"],
    ["tinkerer", "the tinkering story"],
    ["skills", "tech I work with"],
    ["contact", "how to reach me"],
    ["clear", "clear the screen"],
    ["help", "show this list"],
]

const helpOutput = (
    <div className={styles.help}>
        {HELP.map(([cmd, desc]) => (
            <div key={cmd} className={styles.helpRow}>
                <span className={styles.helpCmd}>{cmd}</span>
                <span className={styles.helpDesc}>{desc}</span>
            </div>
        ))}
    </div>
)

// Interpret a typed command into terminal output (`clear` is handled separately).
const runCommand = (raw: string): ReactNode => {
    const cmd = raw.trim()
    if (!cmd) return null
    const [name, ...args] = cmd.split(/\s+/)
    switch (name.toLowerCase()) {
        case "help":
            return helpOutput
        case "whoami":
            return whoamiOutput
        case "about":
            return aboutOutput
        case "tinkerer":
            return tinkererOutput
        case "skills":
        case "ls":
            return skillsOutput
        case "contact":
            return contactOutput
        case "cat": {
            const file = args[0] || ""
            if (file.includes("about")) return aboutOutput
            if (file.includes("tinker")) return tinkererOutput
            return (
                <span className={styles.error}>
                    cat: {file || "usage: cat <file>"}: No such file or directory
                </span>
            )
        }
        case "echo":
            return <span>{args.join(" ")}</span>
        case "pwd":
            return <span>/Users/henri</span>
        case "sudo":
            return (
                <span className={styles.error}>
                    henri is not in the sudoers file. This incident will be reported.
                </span>
            )
        default:
            return <span className={styles.error}>zsh: command not found: {name}</span>
    }
}

interface HistoryEntry {
    command: string
    output: ReactNode
}

const usePrefersReducedMotion = () => {
    const [reduced, setReduced] = useState(false)
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
        setReduced(mq.matches)
        const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
        mq.addEventListener("change", onChange)
        return () => mq.removeEventListener("change", onChange)
    }, [])
    return reduced
}

interface CommandLineProps {
    command: string
    cursor?: boolean
}

const CommandLine = ({command, cursor}: CommandLineProps) => (
    <p className={styles.line}>
        <span className={styles.prompt}>{PROMPT}</span>
        <span className={styles.command}>{command}</span>
        {cursor && <span className={styles.cursor} aria-hidden="true"/>}
    </p>
)

const Terminal = () => {
    const reduced = usePrefersReducedMotion()
    const [mounted, setMounted] = useState(false)
    const [phase, setPhase] = useState(0)
    const [typed, setTyped] = useState(0)
    // Number of steps allowed to play. The intro auto-plays; each interaction
    // reveals one more message, then the terminal waits again.
    const [revealed, setRevealed] = useState(GATE_STEP)
    // Interactive shell (available once the intro is done).
    const [history, setHistory] = useState<HistoryEntry[]>([])
    const [input, setInput] = useState("")
    const [cleared, setCleared] = useState(false)
    const timer = useRef<ReturnType<typeof setTimeout>>()
    const atGateRef = useRef(false)
    const bodyRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => setMounted(true), [])

    const showAll = mounted && reduced
    const finished = phase >= STEPS.length
    // Waiting for the visitor before revealing the next message.
    const atGate = mounted && !showAll && !finished && phase >= revealed

    useEffect(() => {
        atGateRef.current = atGate
    }, [atGate])

    // Each interaction reveals the next message (ignored while one is typing).
    const handleInteract = useCallback(() => {
        if (atGateRef.current) setRevealed((r) => r + 1)
    }, [])

    useEffect(() => {
        if (!mounted || showAll || finished) return
        if (phase >= revealed) return // waiting at the gate
        const command = STEPS[phase].command
        if (typed < command.length) {
            const next = command[typed] === " " ? 55 : 30
            timer.current = setTimeout(() => setTyped((t) => t + 1), next)
        } else {
            timer.current = setTimeout(() => {
                setPhase((p) => p + 1)
                setTyped(0)
            }, 340)
        }
        return () => clearTimeout(timer.current)
    }, [mounted, showAll, finished, phase, typed, revealed])

    useEffect(() => {
        if (!mounted || showAll || finished) return
        const onKey = () => handleInteract()
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [mounted, showAll, finished, handleInteract])

    // Keep the terminal pinned to the newest line as content changes.
    useEffect(() => {
        const el = bodyRef.current
        if (el) el.scrollTop = el.scrollHeight
    }, [mounted, phase, typed, revealed, showAll, history, cleared, input])

    const done = showAll || finished

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            const raw = input
            setInput("")
            if (raw.trim().toLowerCase() === "clear") {
                setHistory([])
                setCleared(true)
                return
            }
            setHistory((h) => [...h, {command: raw, output: runCommand(raw)}])
        },
        [input],
    )

    const focusInput = useCallback(() => inputRef.current?.focus(), [])

    return (
        <section
            className={styles.screen}
            aria-label="Interactive terminal introduction"
            onClick={done ? focusInput : handleInteract}
        >
            <div className={styles.window}>
                <div className={styles.titlebar}>
                    <span className={styles.dots}>
                        <span className={`${styles.dot} ${styles["dot--red"]}`}/>
                        <span className={`${styles.dot} ${styles["dot--yellow"]}`}/>
                        <span className={`${styles.dot} ${styles["dot--green"]}`}/>
                    </span>
                    <span className={styles.tabTitle}>{NAME.toLowerCase().replace(" ", "-")} — zsh</span>
                </div>

                <div className={styles.body} ref={bodyRef}>
                    {!cleared &&
                        STEPS.map((step, i) => {
                            if (showAll || i < phase) {
                                return (
                                    <React.Fragment key={step.command}>
                                        <CommandLine command={step.command}/>
                                        <div className={styles.output}>{step.output}</div>
                                    </React.Fragment>
                                )
                            }
                            if (i === phase) {
                                return (
                                    <CommandLine
                                        key={step.command}
                                        command={step.command.slice(0, typed)}
                                        cursor
                                    />
                                )
                            }
                            return null
                        })}

                    {atGate && (
                        <p className={styles.gateHint}>press enter or click to continue →</p>
                    )}

                    {done && (
                        <>
                            {history.map((entry, i) => (
                                <React.Fragment key={i}>
                                    <CommandLine command={entry.command}/>
                                    {entry.output && (
                                        <div className={styles.output}>{entry.output}</div>
                                    )}
                                </React.Fragment>
                            ))}

                            {!cleared && history.length === 0 && (
                                <p className={styles.comment}>{"# type 'help' to explore"}</p>
                            )}

                            <form className={styles.inputLine} onSubmit={handleSubmit}>
                                <span className={styles.prompt}>{PROMPT}</span>
                                <input
                                    ref={inputRef}
                                    className={styles.input}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    aria-label="Terminal command input"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck={false}
                                    autoFocus
                                />
                            </form>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Terminal
