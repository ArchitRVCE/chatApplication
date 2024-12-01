import {createContext,useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
const ChatContext = createContext();

export const ChatProvider = ({children}) =>{
    const [user,setUser] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if(!userInfo){
            navigate("/");
        }
        else
        {
            setUser(userInfo);
        }
    },[])
    return <ChatContext.Provider value={{user,setUser}}>{children}</ChatContext.Provider>
}

export const chatState = ()=>{
    return useContext(ChatContext);
}