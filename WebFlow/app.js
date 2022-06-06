
const checkIfWalletConnectIsConnected = async () => {
    console.log("window", window);
    let __isConnected = false;

    try {
        if (!web3) {
            console.log("Wallet connect is not connected");
        } else {
            console.log("We have the web3 object", web3);
            const accounts = await web3.eth.getAccounts(); // get all connected accounts
            console.log("accounts ", accounts);
            __isConnected = true;
        }
    } catch (error) {
        console.log(error);
    }

    return __isConnected;
};

const mint = async () => {
  console.log("starting")
  try {
    const { ethereum } = window;
    console.log("trying")
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const trollTownContract = new ethers.Contract(contractAddress, contractABI, signer);
      console.log("about to mint")
    
      const mintTxn = await trollTownContract.mint(1);
      let minted = await mintTxn.wait();
      alert("Successfully minted!" );
      console.log(minted)
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    alert(error)
  }
}


const connectWalletConnect = async () => {
  try {
      // https://docs.walletconnect.com/quick-start/dapps/web3-provider
      const provider = new WalletConnectProvider({
          infuraId: infuraID
      });

      await provider.enable();
      //  Create Web3 instance
      const web3 = new Web3(provider);
      console.log(web3, "web3");
      window.w3 = web3;
      const accounts = await web3.eth.getAccounts(); // get all connected accounts
      account = accounts[0]; // get the primary account
      console.log("WC account", account);
      // returning web3
      return web3;
  } catch (error) {
      console.log(error);
  }

  return web3;
};

