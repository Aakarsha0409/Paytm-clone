import axios from "axios";
import { useEffect, useState } from "react";

export const useUser = () => {
    const [Loading,setLoading] = useState(true);
    const [userDetails, setuserDetails] = useState(null);

    async function getDetails() {
        try{
            const res = await axios.get("http://localhost:3000/api/v1/user/me",{
                headers : {
                    Authorization : "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(res.data);
            setuserDetails(res.data);
        }
        catch(e){
            console.error(e);
        }
        setLoading(false);
    }
    useEffect(() => {
        getDetails();
    }, [])

    return {
        Loading,
        userDetails
    }
}


