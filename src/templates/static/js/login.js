async function connect() {

    if (typeof window.ethereum !== "undefined") {

        await window.ethereum.request({method: "eth_requestAccounts"});
        document.getElementById("connectButton").innerHTML = "Connected"
        const user_address = ethereum.selectedAddress

        var userInfo = {
            'user_address': user_address
        }

        const request = new XMLHttpRequest()
        request.open('POST', `/processUserLogin/${JSON.stringify(userInfo)}`)
        request.onload = () => {
            const flaskMessage = request.responseText
            console.log(flaskMessage)

        }
        request.send()

        
    } else {

        document.getElementById("connectButton").innerHTML = "Please Install Metamask"
    }
}