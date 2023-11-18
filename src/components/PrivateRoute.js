
import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";

const PrivateComponent=({
  children
})=>{

    const auth = localStorage.getItem("user");
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth){
            navigate("/login")
            
        }
    });
    return (
        <>{children}</>
    )
}

export default PrivateComponent;





