'use client'
import styles from './ShopDescription.module.css'
import { useEffect, useRef } from 'react'
import { motion,useScroll } from 'framer-motion'
function ShopDescription({data}) {
  const e=useRef(null)
  const { scrollYProgress } = useScroll({
    target:e,
    offset:['start 0.9','start 0.15']
  })
  useEffect(()=>{
    scrollYProgress.on('change',(el)=>{
    })
  },[])
  const disText=data?.brand?.shortDescription
  // const splittext=disText?.split(disText)
  return (
    <div className={styles.contain}> 
    <div className={styles.imageContain}>&nbsp;
    </div>
    <div className={styles.textContain}>
    <motion.p className={styles.destext}
    ref={e}
    style={{opacity:scrollYProgress}}
    >{data?.brand?.shortDescription}</motion.p> 
    </div>
    </div>
  )
}

export default ShopDescription