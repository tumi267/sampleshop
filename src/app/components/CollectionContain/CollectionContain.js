'use client'
import Image from "next/image"
import Link from "next/link"
import styles from './CollectionContain.module.css'
import { useState } from "react";
import { motion } from "framer-motion";
const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;
function CollectionContain({data}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  return (
    <div className={styles.contain}>
        <div className={styles.cardContain}>
        {data.map((e,i)=>{return<Link href={`/collection/${e?.node?.handle}`} className={styles.linkText}><div key={i}>
        <motion.div
        initial={false}
        animate={
          isLoaded && isInView
            ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
            : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
        }
        transition={{ duration: 1, delay: 1 }}
        viewport={{ once: true }}
        onViewportEnter={() => setIsInView(true)}
        className={styles.imageContain}
      > 
            {e.node?.image?.src&&<Image 
            src={e.node?.image?.src} 
            alt={e.node?.image?.altText?e?.node?.altText:e?.node?.title} layout="fill"
            onLoad={() => setIsLoaded(true)}/>}
            </motion.div>
          <p >{e?.node.title}</p> 
        </div></Link>})}
        </div>
    </div>
  )
}

export default CollectionContain