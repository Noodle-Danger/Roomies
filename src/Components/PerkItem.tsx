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
  perkImg?: string | null;
}

const PerkItem = ({
  perkId,
  perkName,
  qty,
  perkTokens,
  perkImg,
}: PerkItemProps) => {
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
    purchasePerk(requestData, perkTokens, qty)(dispatch);
  };

  const imageUrl =
    perkImg || "https://cdn-icons-png.flaticon.com/512/4394/4394116.png";

  return (
    <div key={perkId} className="custom-chore-wrapper">
      {/* image wrapper */}
      <div className="custom-image-wrapper">
        <img className="rounded-3xl m-0" src={imageUrl} alt="perk" />
      </div>
      {/* perk name and tokens wrapper */}
      <div className="flex flex-col items-between">
        <div
          style={viewItemStyle}
          className="chore-info min-h-[80px] flex items-center justify-center"
        >
          {perkName}
        </div>
        <div style={viewItemStyle} className="chore-info">
          {`${perkTokens} c`}
        </div>
        <div style={viewItemStyle} className="lowercase chore-info">
          {`qty: ${perkQty}`}
        </div>

        <Button
          className="chore-complete-button"
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
