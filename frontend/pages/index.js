import { useState } from 'react'
import { ethers } from 'ethers'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect, useProvider, useSigner } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WebBundlr } from '@bundlr-network/client'
const {abi} = require('./abi/nftMinter.json')
import NewProfile from '../components/NewProfile';


export default function Home() {
  
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { connect } = useConnect({connector: new InjectedConnector()})


  return (
    <div>
      <h2>Chat DApp </h2>
      <ConnectButton />
      <hr></hr>
      
      {isConnected ?(
        <NewProfile />

      ) : (
        <h1>please connect your wallet</h1>
      )
    }

    </div>     
  )
}