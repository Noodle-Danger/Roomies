import apiFetch from "../apiFetch";
import { useState } from "react";
import useGlobalContext from "../hooks/useGlobalContext";

function ChoreList() {
  // destructure state from context
  const { state } = useGlobalContext();
  const { chores } = state;

  interface Chore {
    id: number;
    task_name: string;
    type: string;
  }


  let error;
  const [choreName, setChoreName] = useState('');
  const [choreType, setChoreType] = useState('');

  const handleDelete = () => {
    console.log('DELETE CHORE');
    setChoreType(''); // added to satisfy build
  };

  const submitChore = (givenTitle: string, givenType: string) => {
    apiFetch.createChore(givenTitle, givenType);
  };

  if (error) {
    return <div data-testid="error-message">{error}</div>
  }

  const inputStyle = {
    boxShadow: `
        0 10px 25px -3px rgba(0, 0, 0, 0.3),
        0 4px 6px -2px rgba(0, 0, 0, 0.6),
        0 20px 25px -5px rgba(0, 0, 0, 0.2),
        inset 0 2px 2px rgba(255, 255, 255, 0.95)
        `,
  };

  const viewItemStyle = {
    boxShadow: `
        0 10px 25px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.1),
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        inset 0 2px 2px rgba(255, 255, 255, 0.95)
        `,
  };

  return (
    <div className="p-2 m-4 h-fit" data-testid="chore-1" id="Household">
      <h1 className="font-display text-sky-900">Chore List</h1>
      {/* {error && <div data-testid="error-message">{error}</div>} */}
      <div className="flex gap-2">
        <input
          style={inputStyle}
          className="font-sans text-sky-900 py-1 px-2 m-1  bg-white border-white rounded-[50px] grow-2 outline-amber-200"
          placeholder="Chore..."
          onChange={(event) => {
            setChoreName(event.target.value);
          }}
        />

        <button
          className="font-sans py-1 px-2 m-1 text-white shadow-2xl bg-fuchsia-400 hover:bg-fuchsia-500 border-white rounded-[50px] grow-1"
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
            submitChore(choreName, choreType);
          }}
        >
          Add Chore
        </button>
      </div>
      {/* DIV FOR SPACING */}
      <div className="m-6"></div>
      {chores.map((element) => (
        <div key={element["id"]} className="flex">
          <input
            style={viewItemStyle}
            className="font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none"
            value={element['task_name']}
            readOnly
          />
          <button
            className="font-sans py-1 px-2 m-1 text-white shadow-2xl bg-red-400 hover:bg-red-500 border-white rounded-[50px] grow-1 justify-center flex"
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
            onClick={handleDelete}
          >
            <svg
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
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

export default ChoreList;

{
  /* CHORE FREQUENCY DROP DOWN */
}
{
  /* <div 
                className="relative inline-block text-left"
                style={inputStyle}
                >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="  grow-2 px-2 py-1 font-sans text-sky-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:none"
                >
                    <span>{selectedChoreType}</span>
                    <svg
                    className={`ml-2 h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                    </svg>
                </button>
                {isOpen && (
                    <div className="absolute  mt-1 w-48 rounded-md bg-white shadow-lg border border-gray-300">
                    <div className="py-1">
                        {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => {
                            setSelectedChoreType(option);
                            setIsOpen(false);
                            }}
                            className="block w-full text-left font-sans text-sky-900 px-2 py-1 text-sm bg-white hover:bg-fuchsia-400 hover:text-white focus:bg-gray-100 focus:outline-none"
                        >
                            {option}
                        </button>
                        ))}
                    </div>
                    </div>
                )}
                    </div> */
}
