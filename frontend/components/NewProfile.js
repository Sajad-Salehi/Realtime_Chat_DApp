import { useState } from 'react'
import { ethers } from 'ethers'
import { useAccount, useConnect, useProvider, useSigner, useWaitForTransaction } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WebBundlr } from '@bundlr-network/client'
const {abi} = require('../pages/abi/nftMinter.json')


export default function NewProfile() {

    const { provider } = useProvider()
    const [ profileStatus, setStatus ] = useState(true)
    const { address } = useAccount()
    const [file, setFile] = useState()
    const [image, setImage] = useState()
    const [ MetadataURI, setURI ] = useState()
    const [ opensea_uri, setOpensea ]= useState()
    const [ PolyScan, setPolyScan ] = useState()
    const [ username, setUsername ] = useState()
    const [ biograghy, setBio ] = useState()
    const [ bundlrInstance, setBundlr ] = useState()
    const { data: signer, isError, isLoading } = useSigner()
    const { connect } = useConnect({connector: new InjectedConnector()})
    const contractAddress = '0x6a2c8C358F2C55cd68AC263f77565C0ad7036625'


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
        setUsername(metadata["name"])
        setBio(metadata["description"])
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
        let txReceipt = await tx.wait()
        
        setTimeout(() => {  console.log("Wait ..."); }, 5000);
        const TokenId = await contract.getTokenID()

        const polyScan = `https://mumbai.polygonscan.com/tx/${tx.hash}`
        const uri = `https://testnets.opensea.io/assets/mumbai/${contractAddress}/${TokenId.toString()}`
        setOpensea(uri)
        setPolyScan(polyScan)
        proccessRegister(address, uri, metadata_uri, TokenId.toString())
        
    }

    async function proccessRegister(address, nft_uri, metadata_uri, userID) {

        const res = await fetch(`http://127.0.0.1:8000/register`, {
          method: 'POST',
          body: JSON.stringify({

            id: userID,
            address: address,
            metadata: metadata_uri,
            opensea_url: nft_uri
            
            }),  
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        res.json().then(resp => {
          if(resp.status === 'ok'){
            alert("Your profile submited successfully")
            setStatus(false)
          }
          else{
            alert("Failed to add your profile")
          }
        })
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

            <div>
              {
                profileStatus? (

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

              ) : (
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                  {image && <img src={image} style={{width: "200px", height: "200px", borderRadius: "100%"}} />}
                  <h2>{username}</h2>
                  <br></br>
                  <h5>{biograghy}</h5>
                  <a href={opensea_uri}>Opensea</a>
                  <a href={PolyScan}>Polygon Scan</a>
                </div>
              )}
            </div>
          )}

        </div>

    )
}


