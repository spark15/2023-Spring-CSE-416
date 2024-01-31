import axios from 'axios';
import React from 'react';
import Nav from './nav';
function CourseInput() {
    function handleChange(e) {
        if (e.target.checked) {
            document.getElementById(e.target.name+'Time').style = {display: 'flex'}
        } else {
            document.getElementById(e.target.name+'Time').style.display =  'none'
        }
    }

    function submit(e) {
        e.preventDefault();

        var term = e.target.term;

        for (var i = 0; i < term.length; i++) {
            if (term[i].checked == true) {
                term = term[i].id
            }
        }

        var data = {
            classNumber: e.target.classNumber.value,
            subject: e.target.subject.value,
            CRS: e.target.CRS.value,
            courseTitle: e.target.courseTitle.value,
            cmp: e.target.cmp.value,
            section: e.target.section.value,
            credits: e.target.credits.value,
            days: {},
            instructor: e.target.instructor.value,
            SBC: {},
            term: e.target.year.value + ' ' + term
        }
        axios({
            method: 'Post',
            url: 'http://localhost:80/course',
            data: data
        })
    }

    return (
      <>
      <Nav/>
      <form id='insert' onSubmit={submit}>
        <label>
        <input className = 'number' type='number' name='classNumber' placeholder='classNumber' />
        </label>
        <br></br>

        <label>
        <input type='text' name='subject' placeholder='subject' />
        </label>
        <br></br>

        <label>
        <input type='number' name='CRS' placeholder='CRS' />
        </label>
        <br></br>

        <label>
        <input type='text' name='courseTitle' placeholder='courseTitle' />
        </label>
        <br></br>

        <label>
        <input type='text' name='cmp' placeholder='cmp' />
        </label>
        <br></br>

        <label>
        <input type='text' name='section' placeholder='section' />
        </label>
        <br></br>

        <label>
        <input type='number' name='credits' placeholder='credits' />
        </label>
        <br></br>

        <div>
          <div className='dd'>
            <input className = 'checkbox' type='checkbox' id='Mon' name='Mon' onChange={handleChange}/>
            <label className = 'label' htmlFor='Mon'>Mon</label>
            <div id='MonTime' style={{display: 'none'}}>
              <input type='text' id='MonSta' name='MonSta' placeholder='MonSta'></input>
              <input type='text' id='MonEnd' name='MonEnd' placeholder='MonEnd'></input>
              <input type='text' id='MonRoom' name='MonRoom' placeholder='MonRoom'></input>
            </div>
            
          </div>
          <div className='dd'>
            <input className = 'checkbox' type='checkbox' id='Tue' name='Tue' onChange={handleChange}/>
            <label className = 'label' htmlFor='Tue'>Tue</label>
            <div id='TueTime' style={{display: 'none'}}>
              <input type='text' id='TueSta' name='TueSta' placeholder='TueSta'></input>
              <input type='text' id='TueEnd' name='TueEnd' placeholder='TueEnd'></input>
              <input type='text' id='TueRoom' name='TueRoom' placeholder='TueRoom'></input>
            </div>
          </div>
          <div className='dd'>
            <input className = 'checkbox' type='checkbox' id='Wed' name='Wed' onChange={handleChange}/>
            <label className = 'label' htmlFor='Wed'>Wed</label>
            <div id='WedTime' style={{display: 'none'}}>
              <input type='text' id='WedSta' name='WedSta' placeholder='WedSta'></input>
              <input type='text' id='WedEnd' name='WedEnd' placeholder='WedEnd'></input>
              <input type='text' id='WedRoom' name='WedRoom' placeholder='WedRoom'></input>
            </div>
          </div>
          <div className='dd'>
            <input className = 'checkbox' type='checkbox' id='Thu' name='Thu' onChange={handleChange}/>
            <label className = 'label' htmlFor='Thu'>Thu</label>
            <div id='ThuTime' style={{display: 'none'}}>
              <input type='text' id='ThuSta' name='ThuSta' placeholder='ThuSta'></input>
              <input type='text' id='ThuEnd' name='ThuEnd' placeholder='ThuEnd'></input>
              <input type='text' id='ThuRoom' name='ThuRoom' placeholder='ThuRoom'></input>
            </div>
          </div>
          <div className='dd'>
            <input className = 'checkbox' type='checkbox' id='Fri' name='Fri' onChange={handleChange}/>
            <label className = 'label' htmlFor='Fri'>Fri</label>
            <div id='FriTime' style={{display: 'none'}}>
              <input type='text' id='FriSta' name='FriSta' placeholder='FriSta'></input>
              <input type='text' id='FriEnd' name='FriEnd' placeholder='FriEnd'></input>
              <input type='text' id='FriRoom' name='FriRoom' placeholder='FriRoom'></input>
            </div>
          </div>
          <div className='dd'>
            <input className = 'checkbox' type='checkbox' id='Sat' name='Sat' onChange={handleChange}/>
            <label className = 'label' htmlFor='Sat'>Sat</label>
            <div id='SatTime' style={{display: 'none'}}>
              <input type='text' id='SatSta' name='SatSta' placeholder='SatSta'></input>
              <input type='text' id='SatEnd' name='SatEnd' placeholder='SatEnd'></input>
              <input type='text' id='SatRoom' name='SatRoom' placeholder='SatRoom'></input>
            </div>
          </div>
          <div className='dd'>
            <input className = 'checkbox' type='checkbox' id='Sun' name='Sun' onChange={handleChange}/>
            <label className = 'label' htmlFor='Sun'>Sun</label>
            <div id='SunTime' style={{display: 'none'}}>
              <input type='text' id='SunSta' name='SunSta' placeholder='SunSta'></input>
              <input type='text' id='SunEnd' name='SunEnd' placeholder='SunEnd'></input>
              <input type='text' id='SunRoom' name='SunRoom' placeholder='SunRoom'></input>
            </div>
          </div>
        </div>
        <br></br>
        <label className='instructor'>
        <input type='text' name='instructor' placeholder='instructor' />
        </label>
        <br></br>

        <label>
        <input type='text' name='SBC' placeholder='SBC' />
        </label>
        <br></br>

        <label>
          Select year for term:
        <select name='year' id='year'>
            <option value='2015'>2015</option>
            <option value='2016'>2016</option>
            <option value='2017'>2017</option>
            <option value='2018'>2018</option>
            <option value='2019'>2019</option>
            <option value='2020'>2020</option>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
            <option value='2023'>2023</option>
        </select>
        <br></br>
        <input className = 'checkbox'type='radio' name='term' id='Spring'></input>
        <label className = 'label2' htmlFor='Spring'>Spring</label>

        <input className = 'checkbox'type='radio' name='term' id='Summer I'></input>
        <label className = 'label2' htmlFor='Summer I'>Summer I</label>

        <input className = 'checkbox'type='radio' name='term' id='Summer II'></input>
        <label className = 'label2' htmlFor='Summer II'>Summer II</label>

        <input className = 'checkbox'type='radio' name='term' id='Fall'></input>
        <label className = 'label2' htmlFor='Fall'>Fall</label>

        <input className = 'checkbox'type='radio' name='term' id='Winter'></input>
        <label className = 'label2' htmlFor='Winter'>Winter</label>

        </label>
        <br></br>

        <button type='submit' form='insert'>Submit</button>
      </form>
      </>
    )

} export default CourseInput;