// import styling
const viewItemStyle = {
  boxShadow: `
              0 10px 25px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.1),
              0 20px 25px -5px rgba(0, 0, 0, 0.1),
              inset 0 2px 2px rgba(255, 255, 255, 0.95)
              `,
};

// import context
import useGlobalContext from "../hooks/useGlobalContext";


function UserPerks() {
  const { state } = useGlobalContext();

  const { userPerks } = state.userInventory;
  return (
    <div className="p-2 m-4 h-8/10 w-1/2 border-white rounded-[50px] border-5">
      <h1 className="text-2xl font-display font-semibold text-sky-900">
        #USER PERKS#
      </h1>

      {userPerks &&
        userPerks.map((perk, index) => (
          <div key={index}>
            <div className="flex">
              <input
                style={viewItemStyle}
                className="font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none"
                value={`qty: ${perk.totalQty}`}
                readOnly
              />
              <input
                style={viewItemStyle}
                className="font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none"
                value={perk.perkName}
                readOnly
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default UserPerks;
