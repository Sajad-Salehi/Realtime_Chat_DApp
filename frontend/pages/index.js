import Head from 'next/head'
import SetProfile from '../components/SetProfile'
import Login from '../components/Login'
import { useMoralis } from "react-moralis";


const supportedChains = ["31337", "4"];

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chat DApp | Home</title>
        <meta name="description" content="Chat DApp Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SetProfile />
      </main>

      
    </div>
  )
}
