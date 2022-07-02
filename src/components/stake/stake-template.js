import React from "react";
import "./stake.css";

const StakeTemplate = (props) => {
  const handleStakeClick = () => {
    if (props.func.address === 0) {
      props.func.connection();
    } else if (props.func.approved[props.name.tier]) {
      props.func.stake(props.name.tier);
    } else {
      props.func.approve(props.name.tier);
    }
  };
  return (
    <div>
      <div className="stake">
        <h2>{props.name.tier} Tier</h2>
        <div className="display-balance">
          <p>Your Stake Balance</p>
          <p>{props.details.amount} NiFTi</p>
          <p>$NaN</p>
        </div>
        <div className="display-earnings">
          <p>Total earnings</p>
          <p>{props.details.reward} NiFTi</p>
          <p>$NaN</p>
        </div>
        <div className="display-balance-earnings">
          <p>Balance + Earnings</p>
          <p>{props.details.rewardsplusamount} NiFTi</p>
          <p>$NaN</p>
        </div>
        <div className="display-balance-earnings">
          <p>Plan</p>
          <p>{props.name.plan}</p>
        </div>
        <div className="display-balance-earnings">
          <p>APY</p>
          <p>{props.name.apy}</p>
        </div>
        <input
          onChange={props.func.change}
          name="amount"
          className={
            props.func.approved[props.name.tier] ? "visible" : "invisible"
          }
        />

        <button onClick={handleStakeClick}>
          {props.func.address === 0
            ? "Connect"
            : props.func.approved[props.name.tier]
            ? "Stake"
            : "Approve"}
        </button>
        <button
          className={
            props.func.approved[props.name.tier] ? "visible" : "invisible"
          }
          onClick={() => {
            props.func.unstake(props.name.tier);
          }}
        >
          {props.func.approved[props.name.tier] ? "Unstake" : ""}
        </button>
      </div>
    </div>
  );
};

export default StakeTemplate;
