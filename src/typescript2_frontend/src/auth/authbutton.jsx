import React from 'react'
import { useAuth } from './authetication';
import { useNavigate } from 'react-router-dom';

const AuthButton= () => {
  const { isAuthenticated, login, principal, logout } = useAuth()
  const navigate=useNavigate();
  return (
    <>
      {isAuthenticated ? (
     
        <button  className="button" onClick={()=>navigate("/home")}>Get Started </button>
     
      ) : (
       
           <button className="button" onClick={login} >Sign up</button>
        
      )}
    </>
  )
}

export default AuthButton;