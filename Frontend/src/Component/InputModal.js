import {Button,Dialog,DialogActions,DialogContent,DialogTitle,TextField,} from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { timeTableState } from '../Component/store';
import { v4 as uuidv1 } from 'uuid';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import BackEnd from '../config.js'
import cookie from 'react-cookies';

function InputModal({
  showModal,
  handleClose,
  dayData = '',
  startTimeData = 0,
  endTimeData = 0,
  lectureNameData = '',
  colorData = '#DFFFFF',
  lectureid = '',
  idNum,
}) {
  const {
    formState: { errors },
    control,
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  const [timeTableData, setttimeTableData] = useRecoilState(timeTableState);
  const [data,setData] = useState();
  useEffect(() => {
    if (showModal) {
      reset({
        lectureId: lectureid,
        lecturename: lectureNameData,
        day: dayData,
        startTime: startTimeData,
        endTime: endTimeData,
        lectureColor: colorData,
      });
    }
  }, [
    colorData,
    dayData,
    endTimeData,
    lectureNameData,
    reset,
    showModal,
    startTimeData,
  ]);
  function getRandomPastelColor() {
    var hue = Math.floor(Math.random() * 360); // Random hue value between 0 and 360
    var pastelSaturation = Math.floor(Math.random() * 30) + 70; // Random saturation between 70 and 100
    var pastelLightness = Math.floor(Math.random() * 30) + 70; // Random lightness between 70 and 100
  
    var pastelColor = 'hsl(' + hue + ', ' + pastelSaturation + '%, ' + pastelLightness + '%)';
    return pastelColor;
  }

  // 로그인시 시간표 가져오기
  useEffect(() => {
    axios({
      method: 'get',
      url: BackEnd.timetableGet + '/'+cookie.load('login').email,
      responseType: 'JSON'
  }).then((response) =>  {
    // response Action
    var data = JSON.parse(response.data)
    let storeData = []
    let dayss = []
    for(var i = 0 ; i < data.length ; i++){
      var datas = {
        start: 0,
        end: 0,
        name: '', 
        instructor: '',
        classNumber: '',
        days: [],
        classroom: '',
        color: '',
        id: uuidv1(),
      }
      var dayy = []
      for(var j = 0 ; j < data[i].days.length ; j++){
        dayy.push(data[i].days[j].days.toString())
      }
      datas.start = timeRounding(data[i].days[0].startTime)
      datas.end = timeRounding(data[i].days[0].endTime)
      datas.name = data[i].subject + data[i].CRS
      datas.instructor = data[i].instructor
      datas.days = data[i].days
      datas.classNumber = data[i].classNumber
      datas.classroom = data[i].days[0].room
      datas.color = getRandomPastelColor()
      storeData.push(datas)
      dayss.push(dayy)
    }
    let monday = []
    let tueday = []
    let wedday = []
    let thuday = []
    let friday = []
    for(var i = 0; i<storeData.length; i++){
      if(dayss[i].includes('Mon')===true){
        monday.push(storeData[i])
      }
      if(dayss[i].includes('Tue')===true){
        tueday.push(storeData[i])
      }
      if(dayss[i].includes('Wed')){
        wedday.push(storeData[i])
      }
      if(dayss[i].includes('Thu')){
        thuday.push(storeData[i])
      }
      if(dayss[i].includes('Fri')){
        friday.push(storeData[i])
      }
    }
    setttimeTableData((oldTimeData) => ({
      ...oldTimeData,
      ['mon']:[...oldTimeData['mon'], ...monday],
      ['tue']:[...oldTimeData['tue'], ...tueday],
      ['wed']:[...oldTimeData['wed'], ...wedday],
      ['thu']:[...oldTimeData['thu'], ...thuday],
      ['fri']:[...oldTimeData['fri'], ...friday],
    }));
  });
},[])

  useEffect(() => { 
    var dayy = []
    if (!data) {
      return;
    }
    for(var i = 0 ; i<data.days.length;i++){
      dayy.push(data.days[i].days.toString())
    }
    const datas = {
      start: timeRounding(data.days[0].startTime),
      end: timeRounding(data.days[0].endTime),
      classNumber:data.classNumber,
      name: data.subject + data.CRS, 
      instructor: data.instructor,
      classroom: data.days[0].room,
      color: getRandomPastelColor(),
      id: uuidv1(),
    };
    
    setttimeTableData((oldTimeData) => ({
      ...oldTimeData,
      ['mon']: dayy.includes('Mon') ? [...oldTimeData['mon'], datas] : [...timeTableData['mon']],
      ['tue']: dayy.includes('Tue') ? [...oldTimeData['tue'], datas] : [...timeTableData['tue']],
      ['wed']: dayy.includes('Wed') ? [...oldTimeData['wed'], datas] : [...timeTableData['wed']],
      ['thu']: dayy.includes('Thu') ? [...oldTimeData['thu'], datas] : [...timeTableData['thu']],
      ['fri']: dayy.includes('Fri') ? [...oldTimeData['fri'], datas] : [...timeTableData['fri']],
    }));
    handleClose();
  },[data])

  function timeRounding(time) {
    var arr = time.split(':');
    var arr2 = arr[1].split(' ');
    var hour = parseInt(arr[0]);
    if (arr2[1] === 'PM') {
        if (hour !== 12) {
            hour += 12;
        }
    } 
    if (arr2[1] === 'AM') {
        if ( hour === 12) {
            hour = 0
        }
    }
    if (parseInt(arr2[0]) > 30) {
        hour += 1
    }
    return hour
}
function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

  function Submit(courseid) {
    if(isNumeric(courseid.lectureid)){
      axios({
        method: 'get',
        url: BackEnd.courseGet + courseid.lectureid,
        responseType: 'JSON'
      }).then((response) =>  {
        // response Action
        var data = JSON.parse(response.data)
        axios({
          method: 'put',
          url: BackEnd.timetableAdd +'/' + cookie.load('login').email,
          data: {
            classNumber: courseid.lectureid,
          }
        }).then((response) => {

        }).catch((err) => {
          alert(err.response.statusText);
        });
        setData(data)
      }).catch((error) =>{
        alert(error.response.statusText);
      });
    }
    else{
      alert('Your Input is not numeric. Type again.');
    }
}
  return (
    <Dialog open={showModal} onClose={handleClose}>
      <form onSubmit={handleSubmit(Submit)}>
        <DialogTitle align='center'> Type Course ID</DialogTitle>
        <DialogContent style={{ width: '400px' }}>
          <Controller
            control={control}
            name='lectureid'
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.lectureid}
                style={{ marginTop: '30px', width: '350px' }}
                autoComplete='off'
                label='Course Number'
              />
            )}
          />
          {errors.lectureName?.type === 'required' && (
            <p style={{ color: '#d32f2f' }}></p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'>Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default InputModal;
