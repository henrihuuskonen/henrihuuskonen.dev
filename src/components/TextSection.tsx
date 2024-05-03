import styles from '../styles/styles.module.css'

interface TextSectionProps {
    title: string
    text: string
    titleOnRight?: boolean
}

interface TitleContainerProps {
    title: string
}

export const TitleContainer = ({title}: TitleContainerProps) => (
    <div className={styles.text_section__heading}>
        <h2>{title}</h2>
    </div>
)

interface ParagraphContainerProps {
    text: string

}

export const ParagraphContainer = ({text}: ParagraphContainerProps) => (
    <div className={styles.text_section__paragraph}>
        <p>{text}</p>
    </div>
)

const TextSection = ({ title, text, titleOnRight }: TextSectionProps) => {
    return (
        <div className={styles.frontpage__description__container}>
            {titleOnRight ? (
                <>
                    <ParagraphContainer text={text}/>
                    <TitleContainer title={title}/>
                </>
            ) : (
                <>
                    <TitleContainer title={title}/>
                    <ParagraphContainer text={text}/>
                </>
            )}
        </div>
    )
}

export default TextSection