// import components
import UserPerks from "./UserPerks";
import CompletedChores from "./CompletedChores";

const UserWrapper = () => {
  return (
    <div className="p-2 m-4 h-full border-white rounded-[30px] border-5">
      <div className="flex">
          <CompletedChores />
          <UserPerks />
      </div>
    </div>
  );
};

export default UserWrapper;
