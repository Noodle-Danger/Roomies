import useGlobalContext from '../hooks/useGlobalContext';
import { createPerk } from '../actions/perkActions';
import { useState } from 'react'; // to manage local component state
import { inputStyle, buttonStyle } from '../constants/constStyle';
import Button from './Button';
import InputField from './InputField';
import AiGenerator from './AskJarvis';
import { SyncLoader } from 'react-spinners';

const PerkInput = () => {
  const { dispatch } = useGlobalContext();

  const [perkName, setPerkName] = useState('');
  const [perkQty, setPerkQty] = useState('');
  const [tokens, setTokens] = useState('');
  const [perkImage, setPerkImage] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [aiUsed, setAiUsed] = useState(false);

  const addPerk = async () => {
    setIsCreating(true);
    try {
      let imageUrl = perkImage;
      // If no image is already provided and all text fields are filled, try to fetch one from AI.
      if (!imageUrl && perkName.trim() && tokens.trim() && perkQty.trim()) {
        const imageResponse = await fetch(
          'http://localhost:8080/api/ai/image',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'perk',
              prompt: `Create an anime style picture for the perk: ${perkName}`,
            }),
          }
        );
        const imageData = await imageResponse.json();
        if (imageData.aiImageResponse) {
          imageUrl = imageData.aiImageResponse;
        }
      }

      const perkData = {
        perk_name: perkName,
        tokens: Number(tokens),
        qty: Number(perkQty),
        perk_img: imageUrl,
      };

      console.log('Creating perk with data:', perkData);

      await createPerk(perkData)(dispatch);

      setPerkName('');
      setPerkQty('');
      setTokens('');
      setPerkImage(null);
      setAiUsed(false);
    } catch (error) {
      console.error('Error creating perk:', error);
    } finally {
      setIsCreating(false);
    }
  };

  // Add a conditional to Add Perk button to only show AFTER AI tasks are complete OR if both input fields are populated
  const isAddPerkVisible = aiUsed
    ? perkName.trim() !== '' &&
      tokens.trim() !== '' &&
      perkQty.trim() !== '' &&
      perkImage !== null
    : perkName.trim() !== '' && tokens.trim() !== '' && perkQty.trim() !== '';

  return (
    <div className='flex'>
      <InputField
        style={inputStyle}
        className='font-sans text-sky-900 py-1 px-2 m-1 bg-white border-white rounded-[50px] grow-3 outline-amber-200'
        placeholder='Perk qty...'
        value={perkQty}
        onChange={(event) => {
          setPerkQty(event.target.value);
        }}
      />
      <InputField
        style={inputStyle}
        className='font-sans text-sky-900 py-1 px-1 m-1 bg-white border-white rounded-[50px] grow-3 outline-amber-200'
        placeholder='Token amount...'
        value={tokens}
        onChange={(event) => {
          setTokens(event.target.value);
        }}
      />
      <InputField
        style={inputStyle}
        className='font-sans text-sky-900 py-1 px-2 m-1 bg-white border-white rounded-[50px] grow-3 outline-amber-200 w-36'
        placeholder='Perk name...'
        value={perkName}
        onChange={(event) => {
          setPerkName(event.target.value);
        }}
      />

      {/* Conditionally render the Add Perk button */}
      {isAddPerkVisible && (
        <Button
          className='font-sans py-1 px-2 m-1 text-white shadow-2xl bg-fuchsia-400 hover:bg-fuchsia-500 border-white rounded-[50px] grow-1'
          style={buttonStyle}
          onClick={addPerk}
          disabled={isCreating}
        >
          {isCreating ? <SyncLoader color='#ffffff' size={7} /> : 'Add Perk'}
        </Button>
      )}

      {/* AI Generator component for perks. It will update the perk name and/or perk image */}
      <AiGenerator
        type='perk'
        onGenerated={(generatedText) => {
          setPerkName(generatedText);
          setAiUsed(true); // Mark that AI was used
        }}
        onImageGenerated={(generatedImage) => {
          setPerkImage(generatedImage);
          setAiUsed(true); // Mark that AI was used
        }}
      />
    </div>
  );
};

export default PerkInput;
