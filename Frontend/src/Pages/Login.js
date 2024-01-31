import React,{ useState, useEffect }from 'react';
import Nav from '../Component/nav';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import cookie from 'react-cookies';
import BackEnd from '../config.js';

function Login () {
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = async ( e, email, pwd ) => {
    e.preventDefault();
    const user = await axios({
      method: 'POST',
      url: BackEnd.login,
      data: {
        email: email,
        pwd: pwd
      }
    }).then((user) => {
      const expires = new Date(user.data.cookie.expires);
    cookie.save('login', user.data, {
      path : '/',
      expires,
      // secure : true,
      // httpOnly : true
    }
    );
    navigate('/Main',{state:{user:true}});
    }).catch((err) => {
      alert('Please check your email and password');
    });
    

    
  }

  useEffect(()=>{
    if (cookie.load('login') != null || cookie.load('login') != undefined) {
      navigate('/Main',{state:{user:true}});
    }
  }, [])

  return (
    <div>
      <Nav></Nav>
      <div className='login-page'>
        <div className='form'>
          <form className='login-form'>
            <input type='text' required value = {email} onChange={ (e)=> setEmail(e.target.value)} placeholder='Email' />
            <input type='password' value ={Password} onChange={ (e)=> setPassword(e.target.value)}placeholder='password'/>
            <button onClick={(e)=>login(e, email, Password)}>Login</button>
            <p className='message'>Not registered?<Link to='/Signup'>Create an account</Link></p>
          </form>
        </div>
      </div>
    </div>
    );

} export default Login;