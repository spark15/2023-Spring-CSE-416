import React, { useState } from 'react';
import Nav from '../Component/nav';
import axios from 'axios';
import BackEnd from '../config';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    // Here you can handle the form submission, for example, by sending the data to a server or performing validation
    axios({
      method: 'post',
      url: BackEnd.register,
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        pwd: password
      }
    }).then((res) => {
        alert('Successfully Registered');
      
    }).catch((err) => {
      alert('Something went wrong');
    })
  
  };
  const Submit_filter = (e, firstName,lastName,email,password) =>{
    e.preventDefault();
    if(firstName===''||lastName===''){
      alert('Please type your name.')
    }
    else if(!(email.slice(-15)==='@stonybrook.edu'||email.slice(-16)==='@sunykorea.ac.kr')){
      alert('Please use your school email.')
    }
    else if(password===''){
      alert('Please enter the password.')
    } else {
      handleSubmit();
    }
  }
  return (
  <div>
    <Nav></Nav>
    <div className='signup-page'>
      <div className='form'>
        <form>
          <input
            type='text'
            placeholder='First name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type='text'
            placeholder='Last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className='input-email'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className='email-notice'>You should Sign-up with your school email</p>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit' onClick={(e)=>Submit_filter(e, firstName,lastName,email,password)}>Sign up</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Signup;
