import { Navigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useUser } from "../hooks/useUser";

export const Dashboard = () => {
    const user = useUser();
    if(user.Loading){
        return "loading...";
    }
    if(!user.userDetails){
        return <Navigate to = {"/signin"} />
    }
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={user.userDetails.account.balance} />
            <Users />
        </div>
    </div>
};
