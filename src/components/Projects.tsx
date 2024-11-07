import styles from '../pages/styles.module.css'

interface ProjectItemProps {
    text: string
}

const ProjectItem = ({text}: ProjectItemProps) => {
    return <div className={styles.project__item}>{text}</div>

}

const Projects = () => {
    return <div className={styles.project__container}>
        <ProjectItem text="Project 1"/>
        <ProjectItem text="Project 2"/>
        <ProjectItem text="Project 3"/>
    </div>
}

export default Projects