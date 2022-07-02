import "./App.css";
import Header from "./components/header/header";
import Swap from "./components/stake/stake";
import React, { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [address, setaddress] = useState(0);

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const add = await signer.getAddress();
    setaddress(add);
  };

  return (
    <div className="App">
      <Header func={{ connect: connect, address: address }} />
      <Swap func={{ connect: connect, address: address }} />
    </div>
  );
}

export default App;
