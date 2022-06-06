const checkIfWalletIsConnected = async () => {
    try {
        const { ethereum } = window;

        if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
        } else {
        console.log("We have the ethereum object", ethereum);
        }

        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        } else {
        console.log("No authorized account found")
        }
    } catch (error) {
        console.log(error);
    }
}


const connectWallet = async () => {
    // connect to MetaMask
    try {
      const { ethereum } = window;

      if (!ethereum) {
        if (window.confirm('Get MetaMask! If you click "ok" you will be redirected to install MetaMask')) 
        {
          window.location.href='https://metamask.io/';
        };
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }


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
      
        const mintTxn = await trollTownContract.mint(5);
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

