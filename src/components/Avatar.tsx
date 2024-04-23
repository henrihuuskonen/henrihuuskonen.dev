import React from "react";
import styles from "../styles/styles.module.css";
import Image from "next/image";

const Hero = () => {

    return (
        <div
            className={styles.avatar__container}>
            <div className={styles.image__container}>
                <Image
                    src="/henrihuuskonen-circle.png"
                    width={500}
                    height={500}
                    alt="Picture of the author"
                />
                <div className={styles.name__container}>
                    <h1 className={styles.name}>Henri Huuskonen</h1>
                </div>
            </div>
        </div>
    )
}

export default Hero