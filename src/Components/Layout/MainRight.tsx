import PerkList from "../PerkList.tsx";

function MainRight() {
  return (
    <>
      <div
        className="p-2 m-4 h-8/10 w-1/2 border-white rounded-[30px] border-5"
        id="Interface"
      >
        <h1 className="text-2xl header-text">
          #PERKS LIST#
        </h1>
        <PerkList />
      </div>
    </>
  );
}

export default MainRight;
