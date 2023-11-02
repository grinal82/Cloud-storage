import React from 'react'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { fetchRegisterUser } from '../store/usersReducer'

export const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [registerUser, setRegisterUser] = useState({
        username: '',
        email: '',
        password: '',
    })
    
        
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchRegisterUser(registerUser)).then((action) => {
          if (fetchRegisterUser.fulfilled.match(action)) {
            const registeredUser = action.payload;
            navigate(`/user/${registeredUser['id']}`);
          }
        });
      };
      

  return (
    <div className="wrapper">
        <form onSubmit={handleSubmit}>
            <h1>Log In</h1>
            <div className="input-box">
                <input 
                name='username' 
                type="text"
                value={registerUser.username} 
                onChange={(e) => setRegisterUser({...registerUser, username: e.target.value})} 
                placeholder="Username" required
                />
                <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">
                <input 
                name='email' 
                type="email"
                value={registerUser.email} 
                onChange={(e) => setRegisterUser({...registerUser, email: e.target.value})} 
                placeholder="enter your email" required
                />
            </div>
            <div className="input-box">
                <input 
                name='password' 
                type="password"
                value={registerUser.password} 
                onChange={(e) => setRegisterUser({...registerUser, password: e.target.value})} 
                placeholder="enter your password" required
                />
                <i className='bx bxs-lock-alt'></i>
            </div>
            <button type='submit' className="btn">Register</button>
        </form>
    </div>
  )
}
