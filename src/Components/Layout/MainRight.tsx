import PerkList from "../PerkList.tsx";

function MainRight() {
  return (
    <>
      <div
        className="p-2 m-4 h-8/10 w-1/2 border-rose-400 rounded-[30px] border-5"
        id="Interface"
      >
        <h1 className="text-2xl header-text">#REWARD REPO#</h1>
        <PerkList />
      </div>
    </>
  );
}

export default MainRight;
