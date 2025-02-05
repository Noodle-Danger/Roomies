
import ChoreList from '../ChoreList.tsx';

function MainLeft() {

    return (
        <>
            <div 
            className="p-2 m-4 h-8/10 w-1/2 border-white rounded-[50px] border-5"  
            id="Interface">
            <h1 
            className='text-2xl font-display font-semibold text-sky-900'
            >#CHORE LIST#</h1>
               <ChoreList />
            </div>
        </>
    )
}

export default MainLeft