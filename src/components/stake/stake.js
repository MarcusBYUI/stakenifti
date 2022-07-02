import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import abi from "../abi.json";
import stakeabi from "../stakeabi.json";
import "./stake.css";
import StakeTemplate from "./stake-template";

const Stake = (props) => {
  const contractOne = "0xA613BEb5907C8361Ca7baa471671526322f0F452";
  const contractTwo = "0xF6Ee6017e5A905d4A45419A0A6067B1Ed0dFC357";
  const contractThree = "0xF6Ee6017e5A905d4A45419A0A6067B1Ed0dFC357";
  const Nifti = "0xF6Ee6017e5A905d4A45419A0A6067B1Ed0dFC357";
  const NiftDecimals = 18;

  const [message, setMessage] = useState("");

  const [update, setupdate] = useState(false);

  const [tier1Details, settier1Details] = useState({
    amount: 0,
    reward: 0,
    rewardsplusamount: 0,
  });

  const [tier2Details, settier2Details] = useState({
    amount: 0,
    reward: 0,
    rewardsplusamount: 0,
  });

  const [tier3Details, settier3Details] = useState({
    amount: 0,
    reward: 0,
    rewardsplusamount: 0,
  });

  // function to checkapprove

  const [approved, setApproved] = useState({
    Bronze: false,
    Silver: false,
    Gold: false,
  });

  const formatNiftiAmount = (unformated) => {
    return unformated / 10 ** NiftDecimals;
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const checkApprove = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(Nifti, abi, signer);
      const address = await signer.getAddress().then((response) => {
        return response;
      });
      try {
        const contractOneAllowance = await contract.allowance(
          address,
          contractOne
        );
        const contractTwoAllowance = await contract.allowance(
          address,
          contractTwo
        );
        const contractThreeAllowance = await contract.allowance(
          address,
          contractThree
        );

        const balanceOne = Math.round(
          ethers.utils.formatEther(contractOneAllowance)
        );
        const balanceTwo = Math.round(
          ethers.utils.formatEther(contractTwoAllowance)
        );
        const balanceThree = Math.round(
          ethers.utils.formatEther(contractThreeAllowance)
        );

        //set approve for contract one
        if (balanceOne > 2000) {
          setApproved((prevState) => {
            const newState = { ...prevState };
            newState["Bronze"] = true;
            return newState;
          });
        }

        //set approve for contract two

        if (balanceTwo > 2000) {
          setApproved((prevState) => {
            const newState = { ...prevState };
            newState["Silver"] = true;
            return newState;
          });
        }

        //set approve for contract three

        if (balanceThree > 2000) {
          setApproved((prevState) => {
            const newState = { ...prevState };
            newState["Gold"] = true;
            return newState;
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  //function to check balance
  const checkBalance = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractTierOne = new ethers.Contract(
        contractOne,
        stakeabi,
        signer
      );
      const contractTierTwo = new ethers.Contract(
        contractTwo,
        stakeabi,
        signer
      );
      const contractTierThree = new ethers.Contract(
        contractThree,
        stakeabi,
        signer
      );

      const address = await signer.getAddress().then((response) => {
        return response;
      });
      try {
        const contractTierOneBalResponse = await contractTierOne.getUserDetails(
          address,
          1
        );
        const amount1 = formatNiftiAmount(
          BigNumber.from(
            `${contractTierOneBalResponse[0].amount._hex}`
          ).toString()
        );

        const reward1 = formatNiftiAmount(
          BigNumber.from(
            `${contractTierOneBalResponse[0].rewardAmount._hex}`
          ).toString()
        );

        settier1Details({
          amount: amount1,
          reward: reward1,
          rewardsplusamount: amount1 + reward1,
        });
        const contractTierTwoBalResponse = await contractTierTwo.getUserDetails(
          address,
          2
        );

        const amount2 = formatNiftiAmount(
          BigNumber.from(
            `${contractTierTwoBalResponse[0].amount._hex}`
          ).toString()
        );

        const reward2 = formatNiftiAmount(
          BigNumber.from(
            `${contractTierTwoBalResponse[0].rewardAmount._hex}`
          ).toString()
        );

        settier2Details({
          amount: amount2,
          reward: reward2,
          rewardsplusamount: amount2 + reward2,
        });
        const contractTierThreeBalResponse =
          await contractTierThree.getUserDetails(address, 3);

        const amount3 = formatNiftiAmount(
          BigNumber.from(
            `${contractTierThreeBalResponse[0].amount._hex}`
          ).toString()
        );

        const reward3 = formatNiftiAmount(
          BigNumber.from(
            `${contractTierThreeBalResponse[0].rewardAmount._hex}`
          ).toString()
        );

        settier3Details({
          amount: amount3,
          reward: reward3,
          rewardsplusamount: amount3 + reward3,
        });

        //const num = BigNumber.from(`${claim.amount._hex}`).toString();

        // setOldBal(oldBalance);
        // setNewBal(newBalance);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  //function to Stake
  const handleStake = async (tier) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractTierOne = new ethers.Contract(
        contractOne,
        stakeabi,
        signer
      );
      const contractTierTwo = new ethers.Contract(
        contractTwo,
        stakeabi,
        signer
      );
      const contractTierThree = new ethers.Contract(
        contractThree,
        stakeabi,
        signer
      );
      try {
        let response;
        if (tier === "Bronze") {
          response = await contractTierOne.staking(message, 1);
        } else if (tier === "Silver") {
          response = await contractTierTwo.staking(message, 2);
        } else if (tier === "Gold") {
          response = await contractTierThree.staking(message, 3);
        }

        await response.wait();
        setupdate((prevState) => !prevState);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleUnstake = async (tier) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractTierOne = new ethers.Contract(
        contractOne,
        stakeabi,
        signer
      );
      const contractTierTwo = new ethers.Contract(
        contractTwo,
        stakeabi,
        signer
      );
      const contractTierThree = new ethers.Contract(
        contractThree,
        stakeabi,
        signer
      );
      try {
        let response;
        if (tier === "Bronze") {
          response = await contractTierOne.withdraw(1);
        } else if (tier === "Silver") {
          response = await contractTierTwo.withdraw(2);
        } else if (tier === "Gold") {
          response = await contractTierThree.withdraw(3);
        }
        await response.wait();
        setupdate((prevState) => !prevState);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleApprove = async (tier) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(Nifti, abi, signer);
      try {
        let response;
        if (tier === "Bronze") {
          response = await contract.approve(
            contractOne,
            "10000000000000000000000000000000000000000"
          );
        } else if (tier === "Silver") {
          response = await contract.approve(
            contractTwo,
            "10000000000000000000000000000000000000000"
          );
        } else if (tier === "Gold") {
          response = await contract.approve(
            contractThree,
            "10000000000000000000000000000000000000000"
          );
        }
        await response.wait();
        setupdate((prevState) => !prevState);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  //for update
  useEffect(() => {
    checkApprove();
    checkBalance();
  }, [update]);

  return (
    <>
      <div className="stake-body">
        <StakeTemplate
          details={tier1Details}
          name={{ tier: "Bronze", plan: "Flexible", apy: "Earn up to 125%" }}
          func={{
            approve: handleApprove,
            approved: approved,
            stake: handleStake,
            unstake: handleUnstake,
            address: props.func.address,
            connection: props.func.connect,
            change: handleChange,
          }}
        />
        <StakeTemplate
          details={tier3Details}
          name={{ tier: "Silver", plan: "90 Days", apy: "Earn up to 250%" }}
          func={{
            approve: handleApprove,
            approved: approved,
            stake: handleStake,
            unstake: handleUnstake,
            address: props.func.address,
            connection: props.func.connect,
            change: handleChange,
          }}
        />
        <StakeTemplate
          details={tier2Details}
          name={{ tier: "Gold", plan: "180 Days", apy: "Earn up to 400%" }}
          func={{
            approve: handleApprove,
            approved: approved,
            stake: handleStake,
            unstake: handleUnstake,
            address: props.func.address,
            connection: props.func.connect,
            change: handleChange,
          }}
        />
      </div>
    </>
  );
};

export default Stake;
