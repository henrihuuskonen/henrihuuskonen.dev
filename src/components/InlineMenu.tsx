import styles from '../pages/styles.module.css'

interface MenuItemProps {
    text: string
    href: string
}

const MenuItem = ({text, href}: MenuItemProps) => {
    return <a className={styles.menu__item} href={href} target="_blank">
        <span className={styles.menu__item__text}>{text}</span>
    </a>
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