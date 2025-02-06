// ChoreInput function
import useGlobalContext from '../hooks/useGlobalContext';
import { createChore } from '../actions/choreActions';
import { useState } from 'react'; // to manage local component state
import { inputStyle, buttonStyle } from '../constants/constStyle';
import Button from './Button';
import InputField from './InputField';
import AiGenerator from './AskJarvis';

const ChoreInput = () => {
  // destructure state from context
  const { state, dispatch } = useGlobalContext();
  const { user_id } = state;

  // manage chore name and token input state
  const [choreName, setChoreName] = useState('');
  const [tokens, setTokens] = useState('');

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
      <InputField
        style={inputStyle}
        className='font-sans text-sky-900 py-1 px-2 m-1  bg-white border-white rounded-[50px] grow-2 outline-amber-200'
        placeholder='Token amount...'
        value={tokens}
        onChange={(event) => {
          setTokens(event.target.value);
        }}
      />
      <InputField
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
        style={buttonStyle}
        onClick={() => {
          addChore();
        }}
      >
        Add Chore
      </button>
      <AiGenerator type='chore' onGenerated={setChoreName} />
    </div>
  );
};

export default ChoreInput;
