import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect, useProvider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WebBundlr } from '@bundlr-network/client'
import { useSigner } from 'wagmi'
import { useContext, useState } from 'react'
import { BigNumber } from 'ethers';
import BundlrTransaction from '@bundlr-network/client/build/common/transaction';



export default function Home() {
  
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
        connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { provider } = useProvider()
  const { data: signer, isError, isLoading } = useSigner()


  const [file, setFile] = useState()
  const [image, setImage] = useState()
  const [URI, setURI] = useState()

  async function init() {

    const bundlr = new WebBundlr("https://devnet.bundlr.network","matic", signer.provider, { providerUrl: "https://polygon-rpc.com" })
    await bundlr.ready()
    /*console.log("connected")
    const amount = 0.0312 * 10**18
    let response = await bundlr.fund(amount)
    console.log(response)*/
    let tx = await bundlr.uploader.upload(file, [{name: "content-type", value: "image/png"}])
    console.log(tx)
    setURI(`http://arweave.net/${tx.data.id}`)
    
  }

  function onFileChange(e) {

    const file = e.target.files[0]
    if (file) {

      const image = URL.createObjectURL(file)
      setImage(image)
      let reader = new FileReader()
      reader.onload = function () {
        if (reader.result){
          setFile(Buffer.from(reader.result))
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }


  return (
    <div>
      <h2>Chat DApp | New Profile</h2>
      <ConnectButton />
      
      {isConnected ?(
        <div>
          <hr></hr>
          <h4>please connect your wallet to bundlr network</h4>
          <input onChange={onFileChange} type="file" />
          <button onClick={init}>initialize</button>
          {
            image && <img src={image} style={{width: "150px", height: "150px", borderRadius: "100%"}} />
          }
          {
            URI && <a href={URI}>{URI}</a>
          }
        </div>
        
      ) : (<h1>Please Connect to a wallet </h1>)
      }
      
    </div>
  )
}