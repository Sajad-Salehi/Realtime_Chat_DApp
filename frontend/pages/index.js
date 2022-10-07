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


async function isRegisterd(Address = address){

  const res = await fetch(`http://127.0.0.1:8000/authenticate`, {
    method: 'POST',
      body: JSON.stringify({
        "address": Address
      }),
      headers: {
        'Content-Type': 'application/json'
      }
  })
        
  res.json().then(resp => {

    console.log(resp)
    if(resp.status === 'ok'){
      console.log("1")
      return true
    }
    else{
      console.log("2")
      return false
    }
  })
}




  return (
    <div>
      <h2>Chat DApp </h2>
      <ConnectButton />
      <hr></hr>
      
      {isConnected ?(
        
        <div>
          
          {isRegisterd(address) ?(<h1>hi</h1>) : (<NewProfile />)}
        
        </div>

      ) : (
        <h1>please connect your wallet</h1>
      )
    }

    </div>     
  )
}