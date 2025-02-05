import useGlobalContext from "../hooks/useGlobalContext";
import { useState } from "react";
import { purchasePerk } from "../actions/perkActions";
import { PurchasePerkData } from "../types";

/*
 * STYLING
 */
const viewItemStyle = {
  boxShadow: `
            0 10px 25px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.1),
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            inset 0 2px 2px rgba(255, 255, 255, 0.95)
            `,
};

/*
 * TYPE DEFINITIONS
 */
interface PerkRowProps {
  perkId: number;
  perkName: string;
  qty: number;
  tokens: number;
}

const PerkRow = ({ perkId, perkName, qty, tokens }: PerkRowProps) => {
  const { state, dispatch } = useGlobalContext();
  const { id: userId, tokens: userTokens } = state.userInfo;
  const [perkQty, setPerkQty] = useState(qty);

  const buyPerk = () => {
    const requestData = {
      perk_id: perkId,
      user_id: userId,
      user_tokens: userTokens,
      perk_tokens: tokens,
    };
    setPerkQty(perkQty - 1);
    purchasePerk(requestData)(dispatch);
  };

  return (
    <div key={perkId}>
      <div className="flex">
        <input
          style={viewItemStyle}
          className="font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none"
          value={perkQty}
          readOnly
        />
        <input
          style={viewItemStyle}
          className="font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none"
          value={tokens}
          readOnly
        />
        <input
          style={viewItemStyle}
          className="font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none"
          value={perkName}
          readOnly
        />
        <button
          onClick={() => {
            buyPerk();
          }}
          className="font-sans py-1 px-2 m-1 text-white shadow-2xl bg-red-400 hover:bg-red-500 border-white rounded-[50px] grow-1 justify-center flex"
          style={{
            boxShadow: `
                            0 10px 25px -3px rgba(0, 0, 0, 0.3),
                            0 4px 6px -2px rgba(0, 0, 0, 0.6),
                            0 20px 25px -5px rgba(0, 0, 0, 0.2),
                            inset 0 2px 2px rgba(255, 255, 255, 0.95)
                            `,
            transition: "all 0.1s ease-in-out",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.boxShadow =
              "inset 0 2px 4px rgba(0, 0, 0, 0.2)";
            e.currentTarget.style.transform = "translateY(2px)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.boxShadow = `
                            0 10px 25px -3px rgba(0, 0, 0, 0.3),
                            0 4px 6px -2px rgba(0, 0, 0, 0.6),
                            0 20px 25px -5px rgba(0, 0, 0, 0.2),
                            inset 0 2px 2px rgba(255, 255, 255, 0.95)
                            `;
            e.currentTarget.style.transform = "none";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `
                            0 10px 25px -3px rgba(0, 0, 0, 0.3),
                            0 4px 6px -2px rgba(0, 0, 0, 0.6),
                            0 20px 25px -5px rgba(0, 0, 0, 0.2),
                            inset 0 2px 2px rgba(255, 255, 255, 0.95)
                            `;
            e.currentTarget.style.transform = "none";
          }}
        >
          Purchase Perk
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg> */}
        </button>
      </div>
    </div>
  );
};

export default PerkRow;
