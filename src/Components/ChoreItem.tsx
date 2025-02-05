// ChoreRow: div image placeholder, qty, completed button
import { buttonStyle, viewItemStyle } from '../constants/constStyle';
// import Button from './Button';
// import InputField from './InputField';

interface ChoreItemProps {
  id: number;
  image: string,
  name: string;
  tokens: number;
  onClick:(id: number) => void;
}

const ChoreItem = ({ id, name, tokens, onClick }: ChoreItemProps) => {
  return (
    <div key={id} className='chore-card'>
      <div>
        <img src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-7BVz9BBcqBroNjysSvLfWs6N/user-wMdyOa5rZGH6Qqle6y392ZbU/img-goGmPcg2B9ZEhszkxz9NOGTf.png?st=2025-02-05T01%3A04%3A29Z&se=2025-02-05T03%3A04%3A29Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-02-05T01%3A13%3A54Z&ske=2025-02-06T01%3A13%3A54Z&sks=b&skv=2024-08-04&sig=R8vaDJICYm1TRifrT91JunlPn3k%2ByPRk8OrIiLBeaww%3D" alt="wash dishes"/>   
        <input
          style={viewItemStyle}
          className="font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none"
          value={name}
          readOnly
        />
        <input
          style={viewItemStyle}
          className="font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none"
          value={tokens}
          readOnly
        />
        <button
          className="font-sans py-1 px-2 m-1 text-white shadow-2xl bg-red-400 hover:bg-red-500 border-white rounded-[50px] grow-1 justify-center"
          style={buttonStyle}
          onClick={() => onClick(id)}
        >
          Mark Complete
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

export default ChoreItem;
