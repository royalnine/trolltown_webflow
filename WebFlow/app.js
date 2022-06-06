const connectWalletConnect = async (infuraID) => {
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
      const account = accounts[0]; // get the primary account
      console.log("WC account", account);
      // returning web3
      return web3;
  } catch (error) {
      console.log(error);
  }

};


const checkIfWalletConnectIsConnected = async (web3) => {
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


const mint = async (numberOfTokens, contractAddress, contractABI) => {
  console.log("starting")
  try {
    const { ethereum } = window;
    console.log("trying")

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const trollTownContract = new ethers.Contract(contractAddress, contractABI, signer);
      console.log("about to mint")
    
      const mintTxn = await trollTownContract.mint(numberOfTokens);
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





// const publishVotingEndDate = async (web3) => {
//   const contractAddress = "0x36E3d9E6f22D9E02039FA6ec1CD073216E4D3E8C";
//   let contractABI;

//   await $.getJSON(
//       "https://api.jsonbin.io/b/628527b525069545a33c4b81",
//       function (data) {
//           // JSON result in `data` variable
//           console.log("Community Deployer ABI: ");
//           contractABI = data.abi;
//       }
//   );
//   console.log("Community Deployment Contract ABI (end date function): ", contractABI);

//   console.log('inside the publishVotingEndDate function');

//   const { ethereum } = window;
//   let communityDeployerContract;
//   if (web3) {
//       communityDeployerContract = new web3.eth.Contract(
//           contractABI,
//           contractAddress
//       ); // create instance of the contract to retrieve data from.
//   } else if (ethereum) {
//       const provider = new ethers.providers.Web3Provider(ethereum);
//       const signer = provider.getSigner();
//       communityDeployerContract = new ethers.Contract(
//           contractAddress,
//           contractABI,
//           signer);
//   } else {
//       document.getElementById("voting-end-date").innerHTML = "SOON!";
//       return;
//   }
//   if (web3) {
//       console.log('after the community deployer contract instance is created');
//       console.log('Community Deployer Contract: ', communityDeployerContract);
//       const endDate = await communityDeployerContract.methods.blockTimestampVotingEnd().call();
//       console.log('Printing endDate in unix :', parseInt(endDate, 16));
//       const dateObject = new Date(endDate * 1000);
//       console.log("Printing the dateObject date: ", dateObject);
//       console.log("Printing the dateObject in localeString", dateObject.toLocaleString())
//       document.getElementById("voting-end-date").innerHTML = dateObject.toLocaleString(); // injects the endDate into the section where it needs to be displayed

//   } else {
//       console.log('after the community deployer contract instance is created');
//       console.log('Community Deployer Contract: ', communityDeployerContract);
//       const endDate = await communityDeployerContract.blockTimestampVotingEnd();
//       console.log('Printing endDate in unix :', parseInt(endDate, 16));
//       const dateObject = new Date(endDate * 1000);
//       console.log("Printing the dateObject date: ", dateObject);
//       console.log("Printing the dateObject in localeString", dateObject.toLocaleString())
//       document.getElementById("voting-end-date").innerHTML = dateObject.toLocaleString(); // injects the endDate into the section where it needs to be displayed

//   }


// };


