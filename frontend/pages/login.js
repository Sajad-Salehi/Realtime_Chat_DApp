import Login from "../components/Login";
import Head from 'next/head'
import { providers } from 'ethers';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect, useProvider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'


export default function login() {

    return(
        
        <div>
            <Head>
                <title>Chat DApp | Login</title>
                <meta name="description" content="Login to Chat DApp through Connect Wallet" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Login />
        </div>
    )
}