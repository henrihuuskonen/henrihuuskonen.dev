import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer role="contentinfo" className={styles.footer}>
            <p className={styles.text}>
                <span className={styles.comment}>{"// built & maintained by Henri Huuskonen"}</span>
            </p>
        </footer>
    )
}

export default Footer
