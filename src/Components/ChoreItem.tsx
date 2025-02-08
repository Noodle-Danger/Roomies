// ChoreRow: div image placeholder, qty, completed button
// import styles
import React from 'react';
import { buttonStyle, viewItemStyle } from "../constants/constStyle";
import Button from "./Button";
import coinIcon from "../assets/coin-no-bg.png";
//import hooks
import useGlobalContext from "../hooks/useGlobalContext";
import { markChoreComplete } from "../actions/choreActions";
import { CompleteChoreData } from "../types";

// import components
// import Button from './Button';
// import InputField from './InputField';

interface ChoreItemProps {
  choreId: number;
  choreName: string;
  tokens: number;
  choreImg?: string | null;
}

const ChoreItem = ({
  choreId,
  choreName,
  tokens,
  choreImg,
}: ChoreItemProps) => {
  const { state, dispatch } = useGlobalContext();
  const { id: userId } = state.userInfo;

  const completeChore = () => {
    const requestData: CompleteChoreData = {
      user_id: userId,
      chore_id: choreId,
    };
    markChoreComplete(requestData, tokens, userId)(dispatch);
  };

  const imageUrl =
    choreImg || "https://cdn-icons-png.flaticon.com/512/2797/2797899.png";

  return (
    <div key={choreId} className="custom-chore-wrapper">
      {/* image wrapper */}
      <div className="custom-image-wrapper">
        <img
          className="rounded-3xl dark:bg-white"
          src={imageUrl}
          alt="chore"
        />
      </div>
      {/* chore name and tokens wrapper */}
      <div className="flex flex-col items-between">
        <div
          style={viewItemStyle}
          className="chore-info min-h-[80px] flex items-center justify-center"
        >
          {choreName}
        </div>
        <div style={viewItemStyle} className="chore-info flex items-center justify-center">
          {/* {`${tokens}`} <img src={coinIcon} alt="coin" className="w-8" /> */}
          {`${tokens} c`}
        </div>
      </div>

      {/* complete button */}
      <Button
        className="chore-complete-button"
        style={buttonStyle}
        onClick={completeChore}
      >
        Mark Complete
      </Button>
    </div>
  );
};

export default ChoreItem;
