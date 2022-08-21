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

            if(flaskMessage == "new user"){
                window.open("http://127.0.0.1:5000/processNewUser","_self")
            }

            if(flaskMessage == "old user"){
                window.open("http://127.0.0.1:5000/home","_self")
            }
        }
        request.send()
        
        
    } else {

        document.getElementById("connectButton").innerHTML = "Please Install Metamask"
    }
}