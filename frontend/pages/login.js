import Login from "../components/Login";
import Head from 'next/head'
import { providers } from 'ethers';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect, useProvider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'


export default function login() {
  
    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
      connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect()
  
    return (
      <div>
        <ConnectButton />
        {isConnected ?(
          <div>hello {address}</div>
        ) : (<h1>ihh </h1>)
        }
              
      </div>
      
    )
  }
  