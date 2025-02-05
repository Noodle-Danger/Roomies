// import styles
import "./App.css";

// import components
import UserInfo from "./Components/UserInfo";
import MainLeft from "./Components/Layout/MainLeft.tsx";
import MainRight from "./Components/Layout/MainRight.tsx";

// import context
import useGlobalContext from "./hooks/useGlobalContext";

function App() {
  const { state } = useGlobalContext();
  const { username, tokens } = state.userInfo;

  return (
    <div
      id="App"
      className="p-2 m-4 h-screen w-auto border-white rounded-[50px] "
      style={{
        boxShadow: `
            0 10px 25px -3px rgba(0, 0, 0, 0.3),
            0 4px 6px -2px rgba(0, 0, 0, 0.05),
            0 20px 25px -5px rgba(0, 0, 0, 0.2),
            inset 0 2px 2px rgba(255, 255, 255, 0.95)
          `,
      }}
    >
      <h1 className="text-4xl font-bold font-display text-sky-900 ">ROOMIES</h1>
      <UserInfo name={username} balance={tokens} />
      <div id="Sub" className="flex h-full">
        <MainLeft />
        <MainRight />
      </div>
    </div>
  );
}

export default App;
