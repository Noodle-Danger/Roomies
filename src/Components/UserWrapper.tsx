// import context
import useGlobalContext from "../hooks/useGlobalContext";
// import type definitions

// import * as types from "../types";

// import display components
import UserInfo from "./UserInfo";
import UserPerks from "./UserPerks";
import CompletedChores from "./CompletedChores";

const UserWrapper = () => {
  const { state } = useGlobalContext();
  const { userInfo, userInventory } = state;
  const { username, tokens } = userInfo;
  const { userPerks, choreHistory } = userInventory;

  return (
    <div className="p-2 m-4 h-8/10 w-1/2 border-white rounded-[50px] border-5">
      <h1 className="text-2xl font-display font-semibold text-sky-900">
        #USER WRAPPER#
      </h1>
      <UserInfo name={username} balance={tokens} />
      <UserPerks perkData={userPerks} />
      <CompletedChores choreData={choreHistory} />
    </div>
  );
};

export default UserWrapper;
