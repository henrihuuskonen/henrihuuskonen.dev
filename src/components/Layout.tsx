import {ReactElement} from "react";
import styles from "../styles/styles.module.css";

interface LayoutProps {
    children: ReactElement | ReactElement[]

}

const Layout = ({children}: LayoutProps) => {
    return (
        <div className={styles.layout}>
            {children}
        </div>
    )
}

export default Layout