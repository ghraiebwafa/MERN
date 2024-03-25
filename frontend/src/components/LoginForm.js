import React from 'react'
import authStore from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const store= authStore();
    const navigate=useNavigate()

    const handlelogin= async(e)=>{
e.preventDefault();
 await store.login();
 navigate("/");

    };
  return (
<form onSubmit={handlelogin}>
    <input onChange={store.updateLoginForm} 
    value={store.loginForm.email} 
    type="email" 
    name="email"/><br/><br/>
    <input  onChange={store.updateLoginForm} 
    value={store.loginForm.password}
    type="password" 
    name="password"/><br/><br/>
    <button type="submit">Login</button>
</form>
);
}
