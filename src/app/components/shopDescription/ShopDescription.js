import styles from './ShopDescription.module.css'
function ShopDescription({data}) {
  return (
    <div className={styles.contain}> 
    <div className={styles.imageContain}>&nbsp;
    </div>
    <div className={styles.textContain}>
    <p className={styles.destext}>{data?.brand?.shortDescription}</p> 
    </div>
    </div>
  )
}

export default ShopDescription