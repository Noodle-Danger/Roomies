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
}

const AiGenerator = ({ type, onGenerated }: AiProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAIContent = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('http://localhost:8080/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });

      const data = await response.json();
      if (data.aiTextResponse) {
        onGenerated(data.aiTextResponse);
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
