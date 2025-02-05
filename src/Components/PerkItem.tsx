// import styles
import { buttonStyle, viewItemStyle } from "../constants/constStyle";

// import hooks
import { useState } from "react";

// import components
import Button from "./Button";

// import actions
import { purchasePerk } from "../actions/perkActions";

// import context
import useGlobalContext from "../hooks/useGlobalContext";

interface PerkItemProps {
  perkId: number;
  perkName: string;
  qty: number;
  perkTokens: number;
}

const PerkItem = ({ perkId, perkName, qty, perkTokens }: PerkItemProps) => {
  const { state, dispatch } = useGlobalContext();
  const { id: userId, tokens: userTokens } = state.userInfo;
  const [perkQty, setPerkQty] = useState(qty);

  const buyPerk = () => {
    const requestData = {
      perk_id: perkId,
      user_id: userId,
      user_tokens: userTokens,
      perk_tokens: perkTokens,
    };
    setPerkQty(perkQty - 1);
    purchasePerk(requestData, perkTokens)(dispatch);
  };

  return (
    <div key={perkId} className="chore-card">
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4394/4394116.png"
          alt="perk"
        />
        <input
          style={viewItemStyle}
          className="font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none"
          value={perkName}
          readOnly
        />
        <input
          style={viewItemStyle}
          className="font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none"
          value={`${perkTokens} coin`}
          readOnly
        />
        <input
          style={viewItemStyle}
          className="font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none"
          value={`${perkQty} remaining`}
          readOnly
        />

        <Button
          className="font-sans py-1 px-2 m-1 text-white shadow-2xl bg-red-400 hover:bg-red-500 border-white rounded-[50px] grow-1 justify-center"
          style={buttonStyle}
          onClick={() => buyPerk()}
        >
          Purchase Perk
        </Button>
      </div>
    </div>
  );
};

export default PerkItem;
