import PerkList2 from "../PerkList2.tsx";

function MainRight() {
  return (
    <>
      <div
        className="p-2 m-4 h-8/10 w-1/2 border-white rounded-[50px] border-5"
        id="Interface"
      >
        <h1 className="text-2xl font-display font-semibold text-sky-900">
          #PERKS LIST#
        </h1>
        <PerkList2 />
      </div>
    </>
  );
}

export default MainRight;
