import { updateUser } from '@/store/userSlice/user-slice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const Wrapper = ({ children }: { children: React.ReactNode }) => {

    const dispatch = useDispatch();

    useEffect(()=>{

        const credentials = (typeof window!==undefined) && localStorage.getItem("credential")  ? JSON.parse(localStorage.getItem("credential") as string) : "";
        if(credentials?.email && credentials?.password){
            
          dispatch(updateUser(credentials));
    
        }

    },[])



        


  return children;

}

export default Wrapper;
