import React, { useState, useEffect } from 'react';
import Nav from '../Component/nav';
import { useLocation } from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';
import BackEnd from '../config';

function EditProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  useEffect(() => {
    const user = cookie.load('login');
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }, [])

  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit form data to the backend
    axios({
      method: 'Put',
      url: BackEnd.editProfile+ '/' + cookie.load('login').email,
      data: {
        firstName: firstName,
        lastName: lastName,
        pwd: password,
      }
    }).then((res) => {
      alert('Successfully Changed');
      window.location.reload();
      cookie.remove('login');
    }).catch((err) => {
      alert('Something Went wrong');
    })
  };

  return (
      <div className='Edit_background'>
        <Nav/>
        <div className='profile'>
        <form onSubmit={handleSubmit}>
            <label>
            <input type='text' defaultValue={firstName} placeholder='FirstName' onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <br></br>
            <label>
            <input type='text' defaultValue={lastName} placeholder='LastName' onChange={(e) => setLastName(e.target.value)} />
            </label>
            <br></br>
            <label>
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br></br>
            <label>
            <input type='password' value={confirmPassword} placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
            <br></br>
            <button type='submit' onClick={handleSubmit}>Save Changes</button>
        </form>
        </div>
    </div>
  );
}

export default EditProfile;
