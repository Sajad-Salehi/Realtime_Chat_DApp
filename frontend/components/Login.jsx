import { NotificationProvider } from "@web3uikit/core";
import { ConnectButton } from "@web3uikit/web3";
import { MoralisProvider } from "react-moralis";


export default function Login(){
    
    return(
        <div>  
            <MoralisProvider initializeOnMount={false}>
                <NotificationProvider>
                    <ConnectButton moralisAuth={false}/>
                </NotificationProvider>
            </MoralisProvider>
        </div>

    )
}


