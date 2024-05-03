import React from "react"
import styles from "../styles/styles.module.css"
import Image from "next/image"

const Hero = () => {

    return (
        <div
            className={styles.avatar__container}>
            <div className={styles.image__container}>
                <Image
                    src="/henri-huuskonen-avatar.svg"
                    fill
                    alt="Picture of the author"
                    priority={true}
                />
            </div>
        </div>
    )
}

export default Hero