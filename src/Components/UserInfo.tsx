/*
component for rending user info like username and token balance 
*/
import { useEffect, useState } from "react";
// import context
import useGlobalContext from "../hooks/useGlobalContext";

import ChoreWheel from "./ChoreWheel";

const UserInfo = () => {
  const { state } = useGlobalContext();
  const { username, tokens } = state.userInfo;

  const [currentBalance, setCurrentBalance] = useState(tokens);
  const [balanceColor, setBalanceColor] = useState("");

  const balanceIncrease = "text-green-500";
  const balanceDecrease = "text-red-500";

  useEffect(() => {
    console.log("TOKENS: ", tokens);
    // Reset the flag after 1 second

    if (tokens > currentBalance) {
      setBalanceColor(balanceIncrease);
    } else {
      setBalanceColor(balanceDecrease);
    }
    setCurrentBalance(tokens);
    setTimeout(() => {
      setBalanceColor("");
    }, 1000);
  }, [tokens]);

  return (
    <div>
      <div className="flex align-center pl-8 m-4 p-4 border-rose-400 rounded-[30px] border-5 justify-start text-xl gap-5">
        <ChoreWheel />
        <div className="!text-2xl header-text">
          <div className="flex gap-2">
            <div>Username:</div>
            <div>{username}</div>
          </div>
          <div className="flex gap-2">
            <div>Balance:</div>
            <div className={`${balanceColor}`}>{tokens}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
