import styles from '../styles/styles.module.css'

interface MenuItemProps {
    text: string
    href: string
}

const MenuItem = ({text, href}: MenuItemProps) => {
    return <button className={styles.menu__item}>
        <a className={styles.menu__item__text} href={href}>
            {text}
        </a>
    </button>
}

const InlineMenu = () => {
    return <div className={styles.menu}>
        <div className={styles.menu__buttons}>
            <MenuItem text="Work" href="/"/>
            <MenuItem text="Projects" href="/"/>
            <MenuItem text="Blog" href="https://blog.henrihuuskonen.dev/"/>
            <MenuItem text="Contact" href="/"/>
        </div>
    </div>
}

export default InlineMenu