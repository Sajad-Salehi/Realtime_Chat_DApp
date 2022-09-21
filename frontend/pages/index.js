import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect, useProvider, useSigner, 
  useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WebBundlr } from '@bundlr-network/client'
import { useState } from 'react'
import contractInterface from './abi/nftMinter.json';



export default function Home() {
  
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({connector: new InjectedConnector()})
  const { disconnect } = useDisconnect()
  const { provider } = useProvider()
  const { data: signer, isError, isLoading } = useSigner()
  const [file, setFile] = useState()
  const [image, setImage] = useState()
  const [URI, setURI] = useState()
  const [bundlrInstance, setBundlr] = useState()
  const config = {
    addressOrName: '0x4F514161018BE7B438b282e5cFc42CbFD66D8971s',
    contractInterface: contractInterface,
    functionName: 'mint_nft',
    args: []
  }
  const contractConfig = usePrepareContractWrite({
    ...config
  });
  const { write: mint_nft, isSuccess} = useContractWrite(contractConfig)
 


  async function initBundlr() {

    const bundlr = new WebBundlr("https://devnet.bundlr.network","matic", signer.provider, { providerUrl: "https://polygon-rpc.com" })
    await bundlr.ready()
    setBundlr(bundlr)
    console.log("connected")
    /*const amount = 0.0112 * 10**18
    let response = await bundlr.fund(amount)
    console.log(response)*/
  }

  async function setMetadata() {

    let tx = await bundlrInstance.uploader.upload(file, [{name: "content-type", value: "image/png"}])
    const image_uri = `http://arweave.net/${tx.data.id}`
    setURI(image_uri)
    console.log('image URL:', image_uri)

    const metadata = {

      "name": document.getElementById('name').value,
      "description": document.getElementById('bio').value,
      "image": image_uri,
      "attributes": [{}]
    }
    uploadJsonMetadata(metadata)
  }

  async function uploadJsonMetadata(metadata) {

    const json_metadata = Buffer.from(JSON.stringify(metadata))
    let tx = await bundlrInstance.uploader.upload(json_metadata, [{name: "content-type", value: "text/json"}])
    const metadata_uri = `http://arweave.net/${tx.data.id}`
    console.log('metadata URL:', metadata_uri)
    contractConfig.config.args = [metadata_uri]
    console.log(contractConfig)
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
      <h2>Chat DApp </h2>
      <ConnectButton />
      <hr></hr>
      
      {isConnected ?(
        
        <div>
          {typeof(bundlrInstance) === 'undefined' ?(
            
            <div style={{display: "flex", flexDirection: "column"}}>
              <h4>please connect your wallet to bundlr network</h4>
              <button onClick={initBundlr} style={{width: '150px'}}>Connect to Bundlr</button>
            </div>

          ):(

            <div style={{display: "flex", flexDirection: "column"}}>

              {
                !image && <div>
                  <label>Profile Picture</label>
                  <input onChange={onFileChange} type="file" required/>
                </div>
              }
              {image && <img src={image} style={{width: "150px", height: "150px", borderRadius: "100%"}} />}

              <label>Username</label>
              <input id="name" type="text" required style={{width: "150px"}}/>
              <label>biograghy</label>
              <input id='bio' type="text" required style={{width: "150px"}}/>
              <button onClick={setMetadata} style={{width: '200px', marginTop: '20px'}}>Upload metadata</button>
            
            </div>
          )}

        </div>

      ) : (
        <h1>please connect your wallet</h1>
      
      )
    }

    </div>     
  )
}