import React, {useEffect } from 'react';
import cookie from 'react-cookies';
import Nav from '../Component/nav';
import Timetable from '../Component/Timetable';
import { useNavigate } from 'react-router-dom';


function TimetablePage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (cookie.load('login') === undefined) {
      navigate('/');
      return;
    }
  }, []);

      return (
        <>
          <Nav></Nav>
            <div style={{width: '70%', margin:'auto'}}>
              <Timetable></Timetable>
            </div> 
        </>
      );
    } export default TimetablePage;