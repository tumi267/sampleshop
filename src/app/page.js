import Image from 'next/image'
import styles from './page.module.css'
import Homeprod from './components/Homeprod'
export default function Home() {
  return (
    <main className={styles.main}>
      <Homeprod/>
    </main>
  )
}
