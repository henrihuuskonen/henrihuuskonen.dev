import {JSXElementConstructor, ReactElement, ReactNode} from "react"
import styles from "../pages/styles.module.css"

interface LayoutProps {
    children: ReactNode

}

const Layout = ({children}: LayoutProps) => {
    return (
        <div className={styles.layout}>
            {children}
        </div>
    )
}

export default Layout