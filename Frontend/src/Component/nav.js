import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import icon from '../Component/account_default.svg'

const Nav = () => {

  const [user,setUser] = useState();
  const [profile, setProfile] = useState();
  const i = cookie.load('login');
  useEffect(() => {
    setProfile(cookie.load('login'))
    loggedIn();
  }, [])
  
  const logout = () => {
    cookie.remove('login', {path: '/'}, 1000)
  }

  const admin = () => {
                if (cookie.load('login').moderator === 1) {
                  return <Link to='/test/courseInput' state={{user: true}}>Add Course</Link>
                }
                return <></>

  }

  const loggedIn = async () => {
    const user = cookie.load('login');
    if (user) {
      setUser(
        <>
          <img className = 'profileImage'src={icon} alt='default_profile'/>
          <Link to = '/EditProfile' state = {{user:true}}>{user.firstName +' '+ user.lastName}</Link>
          <Link to='/' onClick={logout}>Log out</Link>
        </>)
    } else {
      setUser(
        <>
          <Link to='/' state = {{user:false}}>Log In</Link>
          <Link to='/Signup'state = {{user:false}}>Sign Up</Link>
        </>
      )
      }
  }
    if(i!==undefined){
        return (
            <div className='top-bar'>
            <div className='app-name'>SUKOCO</div>
            <div className='nav-links'>
              <Link to= '/Main' state = {{user:true}}>Home</Link>
              <Link to='/Timetable' state = {{user:true}}>Timetable</Link>
              <Link to='/ProfReview' state = {{user:true}}>ProfReview</Link>
              {admin()}
            </div>
            <div className='login-signup'>
              {user}
            </div>
          </div>
            );
    }
    else{
        return (
            <div className='top-bar'>
              <div className='app-name'>SUKOCO</div>
              <div className='nav-links'>
                <Link to='/'state = {{user:false}}>Home</Link>
                <Link to='/'state = {{user:false}}>Timetable</Link>
                <Link to='/'state = {{user:false}}>ProfReview</Link>
              </div>
              <div className='login-signup'>
                <Link to='/' state = {{user:false}}>Log In</Link>
                <Link to='/Signup'>Sign Up</Link>
              </div>
            </div>
          );
    }
    
  }
  
  export default Nav;