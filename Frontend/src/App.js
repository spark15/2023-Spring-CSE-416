import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login          from './Pages/Login';
import Main           from './Pages/Main';
import Edit           from './Pages/EditProfile';
import TimetablePage  from './Pages/TimetablePage';
import ProfReview     from './Pages/ProfReview';
import ProfReview1    from './Pages/Prof_review';
import Signup         from './Pages/Signup';
import RateProf       from './Pages/RateProf';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//test
import CourseInput  from './Component/CourseInput';

import cookie from 'react-cookies';

function App() {
  useEffect(()=> {
    if (window.location.pathname == '/') {
      return
    } else if (cookie.load('login') == undefined) {
      window.location = '/'
    }
  }, [window.location])

  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/Main' element={<Main />}></Route>
        <Route path='/timetable' element={<TimetablePage />}></Route>
        <Route path='/profreview' element={<ProfReview />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/EditProfile' element={<Edit />}></Route>
        <Route path='/profreview1' element={<ProfReview1/>}></Route>
        <Route path='/RateProf' element={<RateProf/>}></Route>
        {/*Test*/}
        <Route path='/test/courseInput' element={<CourseInput/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
  } export default App;
