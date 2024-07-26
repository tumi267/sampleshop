'use client'
import styles from './ZoomParellax.module.css'
import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

function ZoomParellax({ pics }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const scale1 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale2 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale3 = useTransform(scrollYProgress, [0, 1], [1, 10]); 
    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 9]);
    const scales = [scale1, scale2, scale3, scale4, scale5];

    const pictures = pics.map((e, i) => {
        const image = e?.node?.image?.src;
        return { src: image, scale: scales[i] };
    });
    
    if (pictures.length >= 5) {
        // Swap the 3rd and 5th elements in the array
        const temp = pictures[2];
        pictures[2] = pictures[4];
        pictures[4] = temp;
    }
    return (
        <div ref={container} className={styles.container}>
            <div className={styles.sticky}>
                {
                    pictures.map(({ src, scale }, index) => {
                        return (
                            <motion.div key={index} style={{ scale }} className={styles.el}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={src}
                                        layout="fill"
                                        objectFit="cover"
                                        alt={`image-${index}`}
                                    />
                                </div>
                            </motion.div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ZoomParellax;
