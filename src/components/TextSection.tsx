import styles from '../styles/styles.module.css'

interface TextSectionProps {
    title: string
    text: string
    titleOnRight?: boolean
}

const TextSection = ({ title, text, titleOnRight }: TextSectionProps) => {
    const TitleContainer = () => (
        <div className={styles.frontpage__description__container__left}>
            <p>{title}</p>
        </div>
    )

    const ParagraphContainer = () => (
        <div className={styles.frontpage__description__container__right}>
            <p>{text}</p>
        </div>
    )


    return (
        <div className={styles.frontpage__description__container}>
            {titleOnRight ? (
                <>
                    <ParagraphContainer/>
                    <TitleContainer/>
                </>
            ) : (
                <>
                    <TitleContainer/>
                    <ParagraphContainer/>
                </>
            )}
        </div>
    )
}

export default TextSection