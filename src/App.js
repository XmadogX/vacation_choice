import React from "react";
import { connect } from "react-redux";
import './App.css';
import { getCalendar, getStartDay } from "./redux/selectors";
import Mounts from "./component/Mounts";

const mounts = ["Январь","Февраль‎","Март‎","Апрель‎","Май‎","Июнь","Июль‎","Август‎","Сентябрь‎","Октябрь","Ноябрь","Декабрь"]
const viewOtp = (request,mount) => {
  mount = +mount + 1
  if(mount<10){
    mount = `0${mount}`
  }
  request.sort(function(a, b) {
    return a - b;
  });
  let ld = 0;
  let resp = "";
  request.filter((fd, isd) => {
    if(ld===0){
      ld = fd;
      resp += `${fd}.${mount}`;
    }
    if(ld!==fd){
      ld = ld - 1;
      if(ld < 10){
        if(+resp[resp.length-4] !==+ld ){
          resp += `-${ld}.${mount}`;
        }
      }
      else{
        if(+(resp[resp.length-5]+ resp[resp.length-4]) !==+ld){
          resp += `-${ld}.${mount}`;
        }
      }
      resp += ` ${fd}.${mount}`;
      ld = fd+1;
    }
    else{
      if(isd+1 === request.length && isd !== 0){
        resp += `-${ld}.${mount}`;
      }
      ld += 1
    }
  })
  return resp;
}
const viewOtps = (calendar,start_day) =>{
  let resp = ""
  let day_mount = 0
  Object.keys(calendar).filter((value)=>calendar[value].length>0).map((val, index)=>{
    if (index === 0){
      resp += viewOtp(calendar[val],val);
    }
    else{
      let resp_days = viewOtp(calendar[val],val)
      if(resp_days.substring(0, 2) === "1."){
        if(+(resp[resp.length-5]+ resp[resp.length-4]) === day_mount){
          let v = 5;
          let r = "";
          if(resp.length===5||resp[resp.length-6]===" "){
            v = 0;
            r = "-"
          }
          if(resp_days.substring(4,5) ==="-"){
            resp_days = resp.substring(0,resp.length-v)+r+resp_days.substring(5,resp_days.length)
          }
          else{
            resp_days = resp.substring(0,resp.length-v)+r+resp_days
          }

        }
        else{
          resp_days = `${resp} ${resp_days}`
        }
      }
      resp = `${resp_days}`;
    }
    day_mount = new Date(2019, +val+1, 0).getDate()
    return (resp)
  }
  )
  return resp;
}

const App = ({calendar,start_day}) => {
    return (
      <div className="App" style={{textAlign:"center",paddingBottom:"50px"}}>
        
        <div style={{borderBottom:"solid 2px #d2d2d2"}}>
          <h2>Выбрано:</h2>
          <div>
            {viewOtps(calendar)}
          </div>
        </div>
        <Mounts calendar = {calendar} mounts = {mounts} start_day = {start_day} />
      </div>
    );
}

 

const mapStateToProps = state => {
  const start_day = getStartDay(state)
  const calendar = getCalendar(state)
  return {calendar,start_day};
}

export default  connect(mapStateToProps)(App);