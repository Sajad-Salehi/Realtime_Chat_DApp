import { providers } from "ethers"


export default function demo() {

    async function init() {

        await ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new providers.Web3Provider(window.ethereum)
        await provider._ready()
        console.log(provider)
    }

    return(

        <div>
            hello
            <button onClick={init}>dddd</button>
        </div>
    
    )
}