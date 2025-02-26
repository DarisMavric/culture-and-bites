import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [session,setSession] = useState(null);
    const [loading,setLoading] = useState(true);


    useEffect(() => {
        const fetchSession = async() => {
            const {data,error} = await supabase.auth.getSession();
            setSession(data.session);
            setLoading(false);
        }  

        fetchSession();
    },[])

    return (
        <AuthContext.Provider value={{session,loading}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext);