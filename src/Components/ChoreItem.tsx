// ChoreRow: div image placeholder, qty, completed button
// import styles
import { buttonStyle, viewItemStyle } from "../constants/constStyle";

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
}

const ChoreItem = ({ choreId, choreName, tokens }: ChoreItemProps) => {
  const { state, dispatch } = useGlobalContext();
  const { id: userId } = state.userInfo;

  const completeChore = () => {
    const requestData: CompleteChoreData = {
      user_id: userId,
      chore_id: choreId,
    };
    markChoreComplete(requestData, tokens, userId)(dispatch);
  };

  return (
    <div key={choreId} className="chore-card">
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2797/2797899.png"
          alt="chore"
        />
        <div className="chore-info">
          <input
            style={viewItemStyle}
            className="font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none"
            value={choreName}
            readOnly
          />
          <input
            style={viewItemStyle}
            className="font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none w-10"
            value={`${tokens} coin`}
            readOnly
          />
        </div>
        <button
          className="font-sans py-1 px-2 m-1 text-white shadow-2xl bg-red-400 hover:bg-red-500 border-white rounded-[50px] grow-1 justify-center"
          style={buttonStyle}
          onClick={completeChore}
        >
          Mark Complete
        </button>
      </div>
    </div>
  );
};

export default ChoreItem;
