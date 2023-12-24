import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>homepage</h1>
      <Link href={'/register'}>REGISTER</Link>
      <Link href={'/dashboard'}>go to DASHBOARD</Link>
    </main>
  );
}
