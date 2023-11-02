import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLogoutUser } from '../store/usersReducer';
// import axios from 'axios'

// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true;

// const client = axios.create({
//     baseURL: 'http://127.0.0.1:8000'
// })

const Navbar = () => {
    const user = useSelector((state) => state.users.users); // Replace with your user state
  

    const [localUser, setLocalUser] = useState(null)

    const dispatch = useDispatch();

    useEffect(() => {
        setLocalUser(user)
        console.log(user)
    }, [user, dispatch]);
  

//   const handleLogout = (e) => {
//     e.preventDefault();
//     client.post('/api/logout/',
//       {
//         withCredentials: true
//       }).then(function(res){
//         console.log(res)
//         setLocalUser(null);
//       })
    
//   };

    const handleLogout = (e) => {
      e.preventDefault();
      dispatch(fetchLogoutUser());
    };

  return (
    <nav className='navbar'>
      <Link to={'/'} className="app-name">Grin-Storage</Link>
      {user!==null ? ( // If user is logged in
        <div className="user-info">
          <div className="user-info_username"><p>Hello, {user.username}</p></div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      ) : ( // If no user is logged in
        <div className="auth-buttons_wrapper">
          <Link className='header_sign-in_btn' to="/sign-in">Login</Link>
          <Link className='header_sign-up_btn' to="/sign-up">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
