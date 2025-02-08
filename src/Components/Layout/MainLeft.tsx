// import ChoreList from "../ChoreList.tsx";
import ChoreList from '../ChoreList.tsx';

function MainLeft() {
  return (
    <>
      <div
        className="p-2 m-4 h-8/10 w-1/2 border-white rounded-[30px] border-5"
        id="Interface"
      >
        <h1 className="text-2xl header-text">#CHORE LIST#</h1>
        {/* <ChoreList /> */}
        <ChoreList />
      </div>
    </>
  );
}

export default MainLeft;
