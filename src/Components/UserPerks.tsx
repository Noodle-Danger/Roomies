import { UserPerk } from "../types";
const viewItemStyle = {
    boxShadow: `
              0 10px 25px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.1),
              0 20px 25px -5px rgba(0, 0, 0, 0.1),
              inset 0 2px 2px rgba(255, 255, 255, 0.95)
              `,
  };
interface UserPerksProps {
  perkData: UserPerk[];
}
function UserPerks({ perkData }: UserPerksProps) {
//   console.log("COMPONENT LEVEL USERPERKS", perkData);
  return (
    <div className="p-2 m-4 h-8/10 w-1/2 border-white rounded-[50px] border-5">
      <h1 className="text-2xl font-display font-semibold text-sky-900">
        #USER PERKS#
      </h1>

      {perkData &&
        perkData.map((perk, index) => (
          <div key={`${perk.id}-${index}`}>
            <div className="flex">
              <input
                style={viewItemStyle}
                className="font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none"
                value={`qty: ${perk.qty}`}
                readOnly
              />
              <input
                style={viewItemStyle}
                className="font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none"
                value={perk.perk_name}
                readOnly
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default UserPerks;
