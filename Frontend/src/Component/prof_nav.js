import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackEnd from '../config';

function Prof_nav() {
  const [Select, setSelected] = useState('');
  const [name,setName] = useState('');
  const navigate = useNavigate();

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  const handleName = (e) =>{
    setName(e.target.value);
  }
  const onClick = async (e) =>{
    e.preventDefault();
    await axios({
      url: BackEnd.reviewByProfessor + name,
      method: 'Get'
    }).then((res) => {
      var response = res.data;
      navigate('/profreview1', {state: response});
    }).catch((err) => {
      alert('Couldn\'t find the name of professor');
    })
  }
  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <a href='/ProfReview' className='navbar-brand'>
          Rate the Professors
        </a>
        <div className='navbar-dropdown'>
          <label htmlFor='course-dropdown' className='navbar-label'></label>
          <select id='course-dropdown' onChange = {handleSelect} className='navbar-select'>
            <option value=''>Select a major</option>
            <option value='CSE'>CSE</option>
            <option value='AMS'>AMS</option>
            <option value='MEC'>MEC</option>
            <option value='BUS'>BUS</option>
            <option value='CHI'>CHI</option>
            <option value='KOR'>KOR</option>
          </select>
        </div>
        <form className='navbar-form'>
          <input 
            type='text' 
            placeholder='Professor Name' 
            className='navbar-search' 
            onChange={handleName}
          />
          <Link to = '/profreview1' state = {{user:true, profName:name.toUpperCase(), selectedCourse:Select}}>
            <button type='submit' className='navbar-button' onClick={onClick}>Search</button>
          </Link>
        </form>
      </div>
    </nav>
  );
}
export default Prof_nav;
