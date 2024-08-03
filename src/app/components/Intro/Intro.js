import styles from './Intro.module.css'

function Intro({data}) {
  
  return (
    <div>
    {/* <h1>{data?.name}</h1>
    <p>{data?.description}</p> */}
    <h2 className={styles.slogan}>{data?.brand?.slogan}</h2>
    
    </div>
  )
}

export default Intro