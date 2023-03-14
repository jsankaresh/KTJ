import UserContext from "./UserContext";
import { useState,useEffect } from "react";
import { getUserApi } from "../notes/ApiCalls";
const UserState=(props)=>{

     
    const [user, setUser] = useState([]);


    const getUser=async ()=>{
        const user1=await getUserApi(localStorage.getItem('token'));
        console.log(user1);
        if(user1.success==true){
          setUser(user1.user)
        }else{
          setUser({});
        }
    }
      

return(
    <UserContext.Provider value={{user,getUser}}>
    {props.children}
</UserContext.Provider>
)
}
export default UserState;