import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import Nav from '@/components/nav';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>SpendWise</title>
        <meta name="description" content="SpendWise is a money management app built on NEXT.JS Framework" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className={``}>
        <div className={`${styles.hero}`}>
          <h1>Take control of your finances</h1>
          <p>Track your expenses and manage your money effortlessly.</p>
          <a className={`${styles.ctaButton}`}>Get Started</a>
        </div>
      </main>
    </>
  )
}
