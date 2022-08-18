async function connect() {

    if (typeof window.ethereum !== "undefined") {

        await ethereum.request({method: "eth_requestsAccounts"})
        document.getElementById("connectButton").innerHTML = "Connected"
    } else {

        document.getElementById("connectButton").innerHTML = "Please Install Metamask"
    }
}