import styles from '../styles/styles.module.css'

interface MenuItemProps {
    text: string
    href: string
}

const MenuItem = ({text, href}: MenuItemProps) => {
    return <button className={styles.menu__item}>
        <a className={styles.menu__item__text} href={href} target="_blank">
            {text}
        </a>
    </button>
}

const InlineMenu = () => {
    return <div className={styles.menu}>
        <div className={styles.menu__buttons}>
            <MenuItem text="LinkedIn" href="https://www.linkedin.com/in/henri-huuskonen-34850853/details/experience/"/>
            <MenuItem text="GitHub" href="https://github.com/henrihuuskonen"/>
            <MenuItem text="Blog" href="https://blog.henrihuuskonen.dev/"/>
            <MenuItem text="Contact" href="mailto:mail@henrihuuskonen.dev"/>
        </div>
    </div>
}

export default InlineMenu