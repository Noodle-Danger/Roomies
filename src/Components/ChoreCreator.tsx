// ChoreInput function

// import hooks
import React from 'react';
import { useState } from 'react'; // to manage local component state
import { inputStyle, buttonStyle } from '../constants/constStyle'; // import styles
import Button from './Button'; // import components
import InputField from './InputField'; // import components
import AiGenerator from './AskJarvis';
import useGlobalContext from '../hooks/useGlobalContext'; // import context
import { createChore } from '../actions/choreActions';
import { SyncLoader } from 'react-spinners';

const ChoreCreator = () => {
  // destructure state from context
  const { dispatch } = useGlobalContext();

  // manage chore name and token input state
  const [choreName, setChoreName] = useState('');
  const [tokens, setTokens] = useState('');
  const [choreImage, setChoreImage] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [aiUsed, setAiUsed] = useState(false);

  const addChore = async () => {
    //! trim whitespace
    //! ensure tokens is number
    // if (!choreName.trim() || !tokens) return;

    setIsCreating(true);
    try {
      let imageUrl = choreImage;
      if (!imageUrl && choreName.trim() && tokens.trim()) {
        const imageResponse = await fetch(
          'http://localhost:8080/api/ai/image',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'chore',
              prompt: `Create an anime style picture of the chore: ${choreName}`,
            }),
          }
        );
        const imageData = await imageResponse.json();
        if (imageData.aiImageResponse) {
          imageUrl = imageData.aiImageResponse;
        }
      }

      // generate choreData object from user inputs
      const choreData = {
        user_id: 1,
        task_name: choreName,
        tokens: Number(tokens),
        chore_img: imageUrl,
      };

      console.log('Creating chore with data:', choreData); // ! delete after test

      // send choreData to action creator
      await createChore(choreData)(dispatch);
      // clear input boxes
      setChoreName('');
      setTokens('');
      setChoreImage(null);
      setAiUsed(false);
    } catch (error) {
      console.error('Error creating chore:', error);
    } finally {
      setIsCreating(false);
    }
  };

  // Add a conditional to Add Chore button to only show AFTER AI tasks are complete OR if both input fields are populated
  const isAddChoreVisible = aiUsed
    ? choreName.trim() !== '' && tokens.trim() !== '' && choreImage !== null
    : choreName.trim() !== '' && tokens.trim() !== '';

  return (
    <div className='flex'>
      <InputField
        style={inputStyle}
        className='custom-input max-w-40 grow-2'
        placeholder='Token amount...'
        value={tokens}
        onChange={(event) => {
          setTokens(event.target.value);
        }}
      />
      <InputField
        style={inputStyle}
        className='custom-input grow-2'
        placeholder='Chore name...'
        value={choreName}
        onChange={(event) => {
          setChoreName(event.target.value);
        }}
      />
      {/* Conditionally render the Add Chore button */}
      {isAddChoreVisible && (
        <Button
          className='font-sans py-1 px-2 m-1 text-white shadow-2xl bg-fuchsia-400 hover:bg-fuchsia-500 border-white rounded-[50px] grow-1'
          style={buttonStyle}
          onClick={addChore}
          disabled={isCreating}
        >
          {isCreating ? <SyncLoader color='#ffffff' size={7} /> : 'Add Chore'}
        </Button>
      )}
      <AiGenerator
        type='chore'
        onGenerated={(generatedText) => {
          setChoreName(generatedText);
          setAiUsed(true); // Mark that the AI was used
        }}
        onImageGenerated={(generatedImage) => {
          setChoreImage(generatedImage);
          setAiUsed(true); // Mark that the AI was used
        }}
      />
    </div>
  );
};

export default ChoreCreator;
