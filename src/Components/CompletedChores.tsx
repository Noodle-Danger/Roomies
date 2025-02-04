import { Chore } from "../types";
interface CompletedChoresProps {
  choreData: Chore[];
}

const CompletedChores = ({ choreData }: CompletedChoresProps) => {
  console.log("COMPONENT CHORE DATA:", choreData);
  return (
    <div className="p-2 m-4 h-8/10 w-1/2 border-white rounded-[50px] border-5">
      <h1 className="text-2xl font-display font-semibold text-sky-900">
        #COMPLETED CHORES#
      </h1>
    </div>
  );
};

export default CompletedChores;
