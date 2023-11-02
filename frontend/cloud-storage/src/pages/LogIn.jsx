import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { fetchLoginUser } from '../store/usersReducer'

export const LogIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [currentUser, setCurrentUser] = useState({
        email: '',
        password: '',
    })

    console.log(currentUser)


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchLoginUser(currentUser)).then((action) => {
          if (fetchLoginUser.fulfilled.match(action)) {
            const loggedInUser = action.payload;
            navigate(`/user/${loggedInUser['id']}`);
          }
        })

    }

  return (
    <div className="wrapper">
        <form onSubmit={handleSubmit}>
            <h1>Log In</h1>
            <div className="input-box">
                <input
                name='email' 
                type="email"
                value={currentUser.email} 
                placeholder="enter your email"
                onChange={(e) => setCurrentUser(
                    {...currentUser, email: e.target.value})} 
                required
                />
            </div>
            <div className="input-box">
                <input
                name='password' 
                type="password"
                value={currentUser.password} 
                placeholder="enter your password"
                onChange={(e) => setCurrentUser(
                    {...currentUser, password: e.target.value})} 
                required
                />
                <i class='bx bxs-lock-alt'></i>
            </div>
            <div className="remember-forgot">
                <label htmlFor=""><input type="checkbox" />Remember me</label>
                <a href="#">Forgot Password?</a>
            </div>
            <button type='submit' className="btn">Login</button>
            <div className="register-link">
                <p><Link to="/sign-up">Register</Link></p>
            </div>
        </form>
    </div>
  )
}
