import React, { useState } from 'react';
import { createContext } from 'react';

export const AuthenticationContext = createContext();

export default function AuthenticationProvider({children}) {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [loginUsername, setLoginUsername] = useState("");
   const [loginPassword, setLoginPassword] = useState("");
   const [Rusername, setRusername] = useState("");
  return (
    <AuthenticationContext.Provider value={{username , setUsername , email , setEmail , password , setPassword , confirmPassword , setConfirmPassword , loginPassword , loginUsername , setLoginUsername , setLoginPassword ,Rusername, setRusername  }}>
        {children}
    </AuthenticationContext.Provider>
  )
}