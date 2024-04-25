import React from "react";
import styles from "../styles/styles.module.css";
import Image from "next/image";

const Hero = () => {

    return (
        <div
            className={styles.avatar__container}>
            <div className={styles.image__container}>
                <Image
                    src="/avatar-with-name.svg"
                    fill
                    alt="Picture of the author"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
        </div>
    )
}

export default Hero