import React, { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect, useProvider, useSigner } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
const {abi} = require('./abi/nftMinter.json')
import NewProfile from '../components/NewProfile';


export default function Home() {
  
  const { address, isConnected } = useAccount()
  const [ IsRegister, setRegister] = useState()
  const [ userMetadata, setUserMetadata ] = useState()
  const { disconnect } = useDisconnect()
  const { connect } = useConnect({connector: new InjectedConnector()})


  React.useEffect(() => {

    if(isConnected){

      CheckRegister(address)
      if(IsRegister){
        getUserMetadata(address)
      }
    }
  }, [address])


  async function CheckRegister(Address){

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
        setRegister(true)
      }
      else{
        setRegister(false)
      }
    })
  }


  async function getUserMetadata(Address){

    const res = await fetch(`http://127.0.0.1:8000/getUserInfo`, {
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
      setUserMetadata(resp)
    })
  }


  return (
    
    <div>
      <h2>Chat DApp </h2>
      <ConnectButton />
      <hr></hr>
      
      {isConnected ?(
        
        <div>
          
          { IsRegister? (

            <div>
              
            </div>
          
          ) : (

            <NewProfile />
          )}
        
        </div>

      ) : (
        <h1>please connect your wallet</h1>
      )
    }

    </div>     
  )
}