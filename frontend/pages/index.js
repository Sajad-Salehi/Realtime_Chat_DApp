import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect, useProvider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WebBundlr } from '@bundlr-network/client'
import { useSigner } from 'wagmi'
import { useState } from 'react'


export default function Home() {
  
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({connector: new InjectedConnector()})
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
    const image_uri = `http://arweave.net/${tx.data.id}`
    setURI(image_uri)

    const metadata = {
      "name": document.getElementById('name').value,
      "description": document.getElementById('bio').value,
      "image": image_uri,
      "attributes": [{}]
    }
    console.log(metadata)
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
      <hr></hr>
      {isConnected ?(
        <div style={{display: "flex", flexDirection: "column"}}>
          
          <h4>please connect your wallet to bundlr network</h4>
          
          {
            !image && <div>
              <label>Profile Picture</label>
              <input onChange={onFileChange} type="file" required/>
            </div>
          }
          {
            image && <img src={image} style={{width: "150px", height: "150px", borderRadius: "100%"}} />
          }
          {
            URI && <a href={URI}>{URI}</a>
          }

          <label>Username</label>
          <input id="name" type="text" required style={{width: "150px"}}/>

          <label>biograghy</label>
          <input id='bio' type="text" required style={{width: "150px"}}/>

          <button onClick={init} style={{width: '200px', marginTop: '20px'}}>initialize</button>
          
        </div>
        
      ) : (<h1>Please Connect to a wallet </h1>)
      }
      
    </div>
  )
}