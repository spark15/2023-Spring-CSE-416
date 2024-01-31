import React, { useEffect, useState } from 'react';
import Nav from '../Component/nav';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BackEnd from '../config';
import cookie from 'react-cookies';
import { useNavigate } from 'react-router-dom';

function RateProf() {
  const navigate = useNavigate();
  const location = useLocation();
  const profName = location.state;


  const [courses, setCourses] = useState();
  const [profID, setProfID] = useState();

  useEffect(()=>{
    
    axios({
      method: 'get',
      url: BackEnd.getProfessor + profName
    }).then((res) => {
      var array =[];
      var courseTaught = res.data.courseTaught;
      var courseTeaching = res.data.courseTeaching;

      setProfID(res.data._id);

      courseTaught.map((course,idx) => {
        array.push(course)
      });

      courseTeaching.map((course,idx) => {
        array.push(course)
      });

      setCourses(array);
    }).catch((err) => {
      alert('Something Went wrong');
    })
  }, [profName])

  useEffect(()=>{
    if (courses == null || courses == undefined) {
      return;
    } else {
      var seg = courses.map((course) => {
        return (<option value={course}>{course}</option>)
      })
      
      setcoursesHTML(seg)

    }

  }, [courses])


  const [coursesHTML, setcoursesHTML] = useState();
  const sumbitInfo = (e) =>{
    e.preventDefault();
    var js = {
      reviewFor: '',
      relatedCourse: '',
      rating: -1,
      tags: [],
      sumitter: cookie.load('login').email,
      dateSubmitted: new Date(),
      comment: ''
    }
    js.reviewFor=profID;
    js.relatedCourse= document.getElementById('selectCourse').value;
    js.rating = document.getElementById('selectRate').value;
    js.comment = document.getElementById('comment').value;

    axios({
      method: 'post',
      url: BackEnd.reviewPost,
      data: js
    }).then((res) => {
      alert('Your response has been done correctly');
      navigate('/Main');
    })
    

  }

    return (
      <div>
        <Nav></Nav>
        <div className='upper-bar'>
          <p className='professor-name'>{profName}</p>
        </div>
        <div className = 'selectCourse-background'>
        <div className='select-course'>
          <p className='select-courseP'> Select Course:
          <select id='selectCourse' className='selectDropbar'>
            <option value=''>Select a course</option>
            {coursesHTML}
          </select></p>
        </div>
        <div className='select-course'>
          <p className='select-courseP'> Rate the Professor:
          <select id='selectRate' className='selectDropbar'>
            <option value=''>Select a Rate</option>
            <option value='5'>5</option>
            <option value='4'>4</option>
            <option value='3'>3</option>
            <option value='2'>2</option>
            <option value='1'>1</option>
          </select></p>
        </div>
        <div className='select-course'>
          <p className='select-courseP'> Letter grade you got:
          <select id='selectCourse' className='selectDropbar'>
            <option value=''>Select a grade</option>
            <option value='A'>A</option>
            <option value='A-'>A-</option>
            <option value='B+'>B+</option>
            <option value='B'>B</option>
            <option value='B-'>B-</option>
            <option value='C+'>C+</option>
            <option value='C'>C</option>
            <option value='C-'>C-</option>
          </select></p>
        </div>
        <div className='select-courseC'>
          <p className='select-courseP'> Comment:
          <input id='comment' className='rateComment' type='text'></input></p>
          <button className='rateSubmit' type='submit' onClick={(e) => sumbitInfo(e)}>Submit</button>
        </div>
        </div>
      </div>
    );
  }
  
  export default RateProf;