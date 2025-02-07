// -------------------------------------------------------------------------------
// > J.A.R.V.I.S < //
// * Just a Rather Very Intelligent System * - Tony Stark
//  * aka AI
// -------------------------------------------------------------------------------

import { useState } from 'react';
import { buttonStyle } from '../constants/constStyle';

interface AiProps {
  type: 'chore' | 'perk';
  onGenerated: (text: string) => void;
  onImageGenerated?: (imageUrl: string) => void;
}

interface AiResponse {
  aiTextResponse?: string;
  aiImageResponse?: string;
}

const AiGenerator = ({ type, onGenerated, onImageGenerated }: AiProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAIContent = async () => {
    setIsGenerating(true);
    try {
      const textResponse = await fetch('http://localhost:8080/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });

      const textData = await textResponse.json();
      if (textData.aiTextResponse) {
        onGenerated(textData.aiTextResponse);
      }

      // * Generate AI image if callback provided
      if (onImageGenerated) {
        const imageResponse = await fetch(
          'http://localhost:8080/api/ai/image',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type,
              prompt: `Create an anime style picture of the ${type}: ${textData.aiTextResponse}`,
            }),
          }
        );

        const imageData = await imageResponse.json();
        if (imageData.aiImageResponse) {
          console.log('Generated image URL:', imageData.aiImageResponse);
          onImageGenerated(imageData.aiImageResponse);
        }
      }
    } catch (error) {
      console.error(`Failed to generate AI ${type}:`, error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      className='font-sans py-1 px-5 min-w-5 m-1 text-white shadow-2xl bg-fuchsia-400 hover:bg-fuchsia-500 border-white rounded-[50px] grow-1'
      style={buttonStyle}
      onClick={generateAIContent}
      disabled={isGenerating}
    >
      {isGenerating ? '...' : 'J.A.R.V.I.S.'}
    </button>
  );
};

export default AiGenerator;
