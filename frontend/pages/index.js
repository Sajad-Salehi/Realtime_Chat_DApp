import { providers } from 'ethers';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect, useProvider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'



export default function Home() {
  
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
        connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const provider = useProvider()

  return (
    <div>
      <ConnectButton />
      {isConnected ?(
        <div>hello {address} mm</div>
      ) : (<h1>Please Connect to a wallet </h1>)
      }
      
    </div>
  )
}