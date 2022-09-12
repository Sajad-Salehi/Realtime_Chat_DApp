import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect, useProvider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WebBundlr } from '@bundlr-network/client'
import { useContract, useSigner } from 'wagmi'



export default function Home() {
  
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
        connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { provider } = useProvider()
  const { data: signer, isError, isLoading } = useSigner()

  async function init() {

    const bundlr = new WebBundlr("https://devnet.bundlr.network","matic", signer.provider, { providerUrl: "https://polygon-rpc.com" })
    await bundlr.ready()
    console.log("connected")
  }

  return (
    <div>
      <ConnectButton />
      {isConnected ?(
        <nav>
          <h4>hello {address}</h4>
          <button onClick={init}>initialize</button>
        </nav>
        

      ) : (<h1>Please Connect to a wallet </h1>)
      }
      
    </div>
  )
}