import Head from 'next/head'
import SetProfile from '../components/SetProfile'
import Login from '../components/Login'
import { useMoralis } from "react-moralis";


const supportedChains = ["4"];

export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();

  return (
      <div>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          
        </Head>
        <Login />
        {isWeb3Enabled ? (
          <div>
            {supportedChains.includes(parseInt(chainId).toString()) ? (
              <SetProfile />
            ) : (
                <div>Plz Connect to Polygon Mumbai testnet</div>
            )}
          </div>
        ) : (
          <div>Please Connect Your Wallet</div>
        )}
      </div>
  );
}



