/*
component for rending user info like username and token balance 
*/

interface UserInfoProps {
  name: string;
  balance: number;
}

const UserInfo = ({ name, balance }: UserInfoProps) => {
  return (
    <div>
      <div className="p-2 m-4 h-8/10 w-1/2 border-white rounded-[50px] border-5">
        <h1 className="text-2xl font-display font-semibold text-sky-900">
          #USER INFO#
        </h1>
        <div className="font-display font-semibold text-sky-900">
          Username: {name}
        </div>
        <div className="font-display font-semibold text-sky-900">
          Balance: {balance}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
