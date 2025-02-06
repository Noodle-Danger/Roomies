import useGlobalContext from '../hooks/useGlobalContext';
import { createChore } from '../actions/choreActions';
import { useState } from 'react'; // to manage local component state

const ChoreInput = () => {
  // destructure state from context
  const { state, dispatch } = useGlobalContext();
  const { user_id } = state;

  // manage chore name and token input state
  const [choreName, setChoreName] = useState('');
  const [tokens, setTokens] = useState('');

  const inputStyle = {
    boxShadow: `
        0 10px 25px -3px rgba(0, 0, 0, 0.3),
        0 4px 6px -2px rgba(0, 0, 0, 0.6),
        0 20px 25px -5px rgba(0, 0, 0, 0.2),
        inset 0 2px 2px rgba(255, 255, 255, 0.95)
        `,
  };

  const addChore = () => {
    //! trim whitespace
    //! ensure tokens is number
    // generate choreData object from user inputs
    const choreData = { user_id, task_name: choreName, tokens: Number(tokens) };
    // send choreData to action creator
    createChore(choreData)(dispatch);
    // clear input boxes
    setChoreName('');
    setTokens('');
  };

  return (
    <div className='flex gap-2'>
      <input
        style={inputStyle}
        className='font-sans text-sky-900 py-1 px-2 m-1  bg-white border-white rounded-[50px] grow-2 outline-amber-200'
        placeholder='Token amount...'
        value={tokens}
        onChange={(event) => {
          setTokens(event.target.value);
        }}
      />
      <input
        style={inputStyle}
        className='font-sans text-sky-900 py-1 px-2 m-1  bg-white border-white rounded-[50px] grow-2 outline-amber-200'
        placeholder='Chore name...'
        value={choreName}
        onChange={(event) => {
          setChoreName(event.target.value);
        }}
      />

      <button
        className='font-sans py-1 px-2 m-1 text-white shadow-2xl bg-fuchsia-400 hover:bg-fuchsia-500 border-white rounded-[50px] grow-1'
        style={{
          boxShadow: `
                        0 10px 25px -3px rgba(0, 0, 0, 0.3),
                        0 4px 6px -2px rgba(0, 0, 0, 0.6),
                        0 20px 25px -5px rgba(0, 0, 0, 0.2),
                        inset 0 2px 2px rgba(255, 255, 255, 0.95)
                        `,
          transition: 'all 0.1s ease-in-out',
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.boxShadow =
            'inset 0 2px 4px rgba(0, 0, 0, 0.2)';
          e.currentTarget.style.transform = 'translateY(2px)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.boxShadow = `
                        0 10px 25px -3px rgba(0, 0, 0, 0.3),
                        0 4px 6px -2px rgba(0, 0, 0, 0.6),
                        0 20px 25px -5px rgba(0, 0, 0, 0.2),
                        inset 0 2px 2px rgba(255, 255, 255, 0.95)
                        `;
          e.currentTarget.style.transform = 'none';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `
                        0 10px 25px -3px rgba(0, 0, 0, 0.3),
                        0 4px 6px -2px rgba(0, 0, 0, 0.6),
                        0 20px 25px -5px rgba(0, 0, 0, 0.2),
                        inset 0 2px 2px rgba(255, 255, 255, 0.95)
                        `;
          e.currentTarget.style.transform = 'none';
        }}
        onClick={() => {
          addChore();
        }}
      >
        Add Chore
      </button>
    </div>
  );
};

export default ChoreInput;
