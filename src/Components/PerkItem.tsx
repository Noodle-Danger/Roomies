// import styles
import { buttonStyle, viewItemStyle } from '../constants/constStyle';

// import hooks
import { useState } from 'react';

// import components
import Button from './Button';

// import actions
import { purchasePerk } from '../actions/perkActions';

// import context
import useGlobalContext from '../hooks/useGlobalContext';

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
    purchasePerk(requestData, perkTokens)(dispatch);
  };

  const imageUrl =
    perkImg || 'https://cdn-icons-png.flaticon.com/512/4394/4394116.png';

  return (
    <div
      key={perkId}
      className='border-4 rounded-4xl border-fuchsia-200 pt-0 pb-2 m-4'
    >
      <div className='flex flex-col items-center'>
        <img className='rounded-t-3xl mt-0 m-2' src={imageUrl} alt='perk' />
        <input
          style={viewItemStyle}
          className='font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none dark:bg-neutral-300'
          value={perkName}
          readOnly
        />
        <input
          style={viewItemStyle}
          className='font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none dark:bg-neutral-300'
          value={`${perkTokens} coin`}
          readOnly
        />
        <input
          style={viewItemStyle}
          className='font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none dark:bg-neutral-300'
          value={`${perkQty} remaining`}
          readOnly
        />

        <Button
          className='font-sans py-1 px-2 m-1 dark:bg-slate-700 dark:hover:bg-zinc-900 text-white shadow-2xl bg-red-400 hover:bg-red-500 border-white rounded-[50px] grow-1 justify-center'
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
