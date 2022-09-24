import { useState } from 'react'
import { ethers } from 'ethers'
import { useConnect, useProvider, useSigner } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WebBundlr } from '@bundlr-network/client'
const {abi} = require('../pages/abi/nftMinter.json')


export default function NewProfile() {

    const { provider } = useProvider()
    const [file, setFile] = useState()
    const [image, setImage] = useState()
    const [URI, setURI] = useState()
    const [ opensea_uri, setOpensea ]= useState()
    const [bundlrInstance, setBundlr] = useState()
    const { data: signer, isError, isLoading } = useSigner()
    const { connect } = useConnect({connector: new InjectedConnector()})
    const contractAddress = '0x037aD77c7e65e098E1E292b1e1dD7A6f033c98d6'


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
        setURI(metadata_uri)
        mint_nft(metadata_uri)
    }
    
    async function mint_nft(metadata_uri) {
    
        let contract = new ethers.Contract(contractAddress, abi, signer)
        let tx = await contract.mint_nft(metadata_uri)
        const uri = `https://testnets.opensea.io/assets/mumbai/${contractAddress}/${tx.v}`
        setOpensea(uri)
        
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
              {
                opensea_uri && <a href={opensea_uri} >link</a>
              }
            </div>
          )}

        </div>

    )
}


