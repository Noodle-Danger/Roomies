import { UserPerk } from "../types";

interface UserPerksProps {
  perkData: UserPerk[];
}
function UserPerks({ perkData }: UserPerksProps) {
  console.log("USER PERKS:", perkData);
  return (
    <div className="p-2 m-4 h-8/10 w-1/2 border-white rounded-[50px] border-5">
      <h1 className="text-2xl font-display font-semibold text-sky-900">
        #USER PERKS#
      </h1>
    </div>
  );
}

export default UserPerks;
