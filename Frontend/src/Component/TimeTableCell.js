import DeleteIcon from '@mui/icons-material/Delete';
import { TableCell } from '@mui/material';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import ConfirmModal from '../Component/ConfirmModal';
import { timeTableState } from '../Component/store';
import axios from 'axios';
import BackEnd from '../config.js'
import cookie from 'react-cookies';

function TimeTableCell({ day, timeNum }) {
  const [timeTableData, settimeTableData] = useRecoilState(timeTableState);
  const [hover, sethover] = useState(false);
  const [open, setopen] = useState(false);
  const [doubleopen, setdoubleopen] = useState(false);

  const timeData = useMemo(
    () =>
      timeTableData[day].find(
        (time) => time.start <= timeNum && timeNum < time.end,
      ),
    [day, timeNum, timeTableData],
  );
  const handleClose = useCallback(() => {
    setopen(false);
    setdoubleopen(false);
  }, []);
  const handleConfirm = useCallback(() => setopen(true), []);
  const handleDelete = useCallback(() => {
    setdoubleopen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    settimeTableData((oldtimeTableData) => {
      const oldData =  oldtimeTableData[day].filter( //지운 데이터
        (data) => data.id === timeData.id,
      );
      var mon = oldtimeTableData['mon'].findIndex(i=>i.days === oldData[0].days)
      var tue = oldtimeTableData['tue'].findIndex(i=>i.days === oldData[0].days)
      var wed = oldtimeTableData['wed'].findIndex(i=>i.days === oldData[0].days)
      var thu = oldtimeTableData['thu'].findIndex(i=>i.days === oldData[0].days)
      var fri = oldtimeTableData['fri'].findIndex(i=>i.days === oldData[0].days)
      
      var monday = []
      var tueday = []
      var wedday = []
      var thursday = []
      var friday = []

      if(mon !== -1){
        monday.push(oldtimeTableData['mon'].filter(className => className.name !== oldData[0].name))
      }
      if(tue !== -1){
        tueday.push(oldtimeTableData['tue'].filter(className => className.name !== oldData[0].name))
      }
      if(wed !== -1){
        wedday.push(oldtimeTableData['wed'].filter(className => className.name !== oldData[0].name))
      }
      if(thu !== -1){
        thursday.push(oldtimeTableData['thu'].filter(className => className.name !== oldData[0].name))
      }
      if(fri !== -1){
        friday.push(oldtimeTableData['fri'].filter(className => className.name !== oldData[0].name))
      }
      axios({
        method: 'put',
        url: BackEnd.timetableDelete +'/' + cookie.load('login').email,
        data: {
          classNumber:oldData[0].classNumber
        }
      });
    return {
        ...oldtimeTableData,
        ['mon']: monday.length === 0 ? [...oldtimeTableData['mon'], []]:[...monday[0]],
        ['tue']: tueday.length === 0 ? [...oldtimeTableData['tue'], []]:[...tueday[0]],
        ['wed']: wedday.length === 0 ? [...oldtimeTableData['wed'], []]:[...wedday[0]],
        ['thu']: thursday.length === 0 ? [...oldtimeTableData['thu'], []]:[...thursday[0]],
        ['fri']: friday.length === 0 ? [...oldtimeTableData['fri'], []]:[...friday[0]],
      };
    });
    setopen(false);
    setdoubleopen(false);
  }, [day, settimeTableData, timeData?.id]);

  return (
    <>
      {timeData?.start === timeNum ? (
        <TableCell
          style={{ backgroundColor: timeData.color, position: 'relative' }}
          align='center'
          rowSpan={timeData.end - timeData.start}
          onMouseOver={() => sethover(true)}
          onMouseLeave={() => sethover(false)}
        >
          {timeData.name}<br></br>
          {timeData.instructor}<br></br>
          {timeData.classroom}
          {hover ? (
            <div style={{ position: 'absolute', top: 5, right: 5 }}>
              <DeleteIcon
                style={{ cursor: 'pointer' }}
                onClick={handleConfirm}
              />
            </div>
          ) : null}
        </TableCell>
      ) : timeData?.start < timeNum && timeNum < timeData?.end ? null : (
        <TableCell />
      )}
      <ConfirmModal
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        confirmDelete={confirmDelete}
        doubleopen={doubleopen}
      ></ConfirmModal>
    </>
  );
}

export default memo(TimeTableCell);
