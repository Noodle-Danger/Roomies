// import styles
import './App.css';
import { useEffect, useState } from 'react';

// import context
import useGlobalContext from './hooks/useGlobalContext';

// import components
import UserInfo from './Components/UserInfo';
import MainLeft from './Components/Layout/MainLeft.tsx';
import MainRight from './Components/Layout/MainRight.tsx';
import UserWrapper from './Components/UserWrapper';

function App() {
  const { state } = useGlobalContext();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  // Run this effect whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    // <div className={`${darkMode && 'dark'}`}>
    <div
      id="App"
      className="p-2 m-4 w-auto border-white rounded-[50px] dark:bg-neutral-900"
      style={{
        boxShadow: `
      0 10px 25px -3px rgba(0, 0, 0, 0.3),
      0 4px 6px -2px rgba(0, 0, 0, 0.05),
      0 20px 25px -5px rgba(0, 0, 0, 0.2),
      inset 0 2px 2px rgba(255, 255, 255, 0.95)
      `,
      }}
    >
      <button
        className="absolute w-12 h-12 top-12 right-12 font-bold font-display bg-sky-900 dark:bg-white rounded-full text-white dark:text-black"
        onClick={toggleDarkMode}
      >
        {darkMode ? 'LHT' : 'DRK'}
      </button>
      <h1 className="m-1 p-2 text-4xl header-text ">ROOMIES</h1>
      <UserInfo />
      <div id="Sub" className="flex h-full">
        <MainLeft />
        <MainRight />
      </div>
      <UserWrapper />

    </div>
  );
}

export default App;
