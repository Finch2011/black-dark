import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function User() {
    const navigat = useNavigate()
    const remove = () =>{
        localStorage.clear()
        navigat("/")
    }
  return (
    <div>
        <h1>email  : {localStorage.getItem("email")}</h1>
        <button onClick={remove}>Log out </button>
    </div>
  )
}
