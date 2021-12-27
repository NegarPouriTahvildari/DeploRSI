import React ,{useState,useEffect}from 'react';
import RSInsurance from './RSInsurance';
import Results from './Results';
import Introduction from './Introduction';
import Goodbye from './Goodbye';

import Axios from "axios";
import moment from 'moment';
 
let user;
let childrenDate;
let car;
let motor;
let house;
let insurances=[];
let rrandom;

let insuranceIds=[];

function App() {
  
  const [result,setResult]=useState(false);
  const [form,setForm]=useState(false);
  const [gB,setGB]=useState(false);
  const [intro,setIntro]=useState(true);
  const[all,setall]=useState(undefined);
    function isResult(currentuser,childrenuser,caruser, motoruser , houseuser){  
    user=currentuser;
    childrenDate=childrenuser;
    car=caruser;
    motor=motoruser;
    house=houseuser;
    calcResults();
    setIntro(false);
    setGB(false);
    setForm(false);
    setResult(true);
   };

   function isForm(){
    Axios.get('http://localhost:3000/getInsurances?',{
      //Axios.get('http://api.aydablue.com/getInsurances?',{
    }).then((response)=>{ setall(response.data);}); 
    setForm(true);
   };
   function notForm(){
    setForm(false);
    setIntro(true);
    setGB(false);
    setResult(false);
   };
   function goodbye(){
     setGB(true);
     setResult(false);
     setForm(false);
     setIntro(false);
   }
   function onQuestion(){
     setGB(false);
     setResult(false);
     setForm(true);
     setIntro(false);
   };
   const findResults=()=>{
    if(user.family==false){
      //singles
      //personal
      if(!user.drivinglicense){
        let years=parseInt(moment().diff(moment(user.bday, "YYYY-MM-DD"), 'years'));
        if(years > 40){
          insuranceIds.push(10,9,18,28,14,25,31,32);
        }
        else if(years>18 && years<40){
            insuranceIds.push(10,9,18,28,14,25);
        }
        else if(years<18){
          insuranceIds.push(10,14);
        }
      }else{
        let years=parseInt(moment().diff(moment(user.bday, "YYYY-MM-DD"), 'years'));
        if(years<40){
          insuranceIds.push(10,9,18,28,14,25,31,32,2,13);
        }
        else if(years>18 && years<40){
          insuranceIds.push(10,9,18,28,14,25,2,13);
        }
        else if(years<18){
          insuranceIds.push(10,2,25);
        }
      };

    //job
    switch(user.jobid){
      case 2:{
        if(user.income>5000){
          insuranceIds.push(19,32,31,25,29,30,15,42);
        }else if(user.income>1000 && user.income<5000){
          insuranceIds.push(19,32,31,25,29);
        }
        break;}
      case 3:{
        if(user.income>5000){ 
          insuranceIds.push(19,31,13,25,8,29,23,24,39,15,40,41,42);
        }else if(user.income>1000 && user.income<5000){
          
          insuranceIds.push(19,31,13,25,8,29,23,24,39);
        }else if(user.income<1000){
          insuranceIds.push(23,24,39);
        };
        break;}
      case 4:{
        if(user.income>5000){
          insuranceIds.push(19,13,25,23,24,29,31,32,40,30,42);
        }else if(user.income>1000 && user.income<5000){
          insuranceIds.push(19,13,25,23,24,29,31,32);
        }else if(user.income<1000){
          insuranceIds.push(19,13,25,23,24,29);
        };
        break;}
      case 5:{
        if(user.income>5000){
          insuranceIds.push(15,29,23,19,31,13,25,40,30,42);
        }else if(user.income>1000 && user.income<5000){
          insuranceIds.push(15,29,23,19,31);
        }else if(user.income<1000){  
          insuranceIds.push(15,29,23,18);
        };
        break;}
      case 6:{
        insuranceIds.push(19,32,25,15,16);
        break;}
      case 7:{
        let years=parseInt(moment().diff(moment(user.bday, "YYYY-MM-DD"), 'years'));
        if(years>18){
        insuranceIds.push(14,4,10);
        break;}
      }
  
      }
      //child
      if(childrenDate!==undefined){
      childrenDate.forEach((bday)=>{
      let years=parseInt(moment().diff(moment(bday, "YYYY-MM-DD"), 'years'));
      if(years>16){
        insuranceIds.push(36,37,11,6,7,1,13);
      }else if(years<16){
        insuranceIds.push(36,37,11,6,7,27);
      }
    });};
    //health 
    if(user.diabetic){
      insuranceIds.push(33);
    }
    if(user.glass || user.neuropathy || user.smoke){
      insuranceIds.push(15);
    }
    if(user.hospital ){
      insuranceIds.push(16);
    }
    if(user.dentist){
        insuranceIds.push(17);
    }
    //pet
    if(user.pet){
      insuranceIds.push(12,38);
    }
    //travel
    if(!user.abroud){       
    if(user.travelfreq<2 && user.travelfreqwork<2 && user.travelfreq>0 && user.travelfreqwork>0 ){
      
      insuranceIds.push(21);
    } else if(user.travelfreq>2 || user.travelfreqwork>2){
      
      insuranceIds.push(21,22);
    }
  }else {
    insuranceIds.push(20,21,22);
  }
    //hobbies
    if(user.extremsport){
      insuranceIds.push(15,16,25);
    }
    if(user.cooking){
      insuranceIds.push(5);
    }
    if(user.horseriding){
      insuranceIds.push(12,38,25);
    }
     //car
     if(car!==undefined){
     if(!car.forwork){
      let years=parseInt(moment().diff(moment(car.year, "YYYY-MM-DD"), 'years'));
        if(years>30){
          insuranceIds.push(3);
        }
        if(years>10 && years<30){
          if(car.price<10000){
            insuranceIds.push(1,25);
          }else {
            insuranceIds.push(2);
          }
        }
        if(years<10){
          if(car.price<10000){
            insuranceIds.push(1,25);
          }else {
            insuranceIds.push(2,41);
          }
        }
     }else{
      let years=parseInt(moment().diff(moment(car.year, "YYYY-MM-DD"), 'years'));
      if(years>30){
        insuranceIds.push(3);
      }
      if(years>10 && years<30){
        if(car.price<10000){
          insuranceIds.push(2);
        }else {
          insuranceIds.push(2,41);
        }
      }
      if(years<10){
        if(car.price<10000){
          insuranceIds.push(1,25);
        }else {
          insuranceIds.push(2,41);
        }
      }
     }
    }
    //motor
    if(motor!==undefined){
    if(!motor.forwork){
      let years=parseInt(moment().diff(moment(motor.year, "YYYY-MM-DD"), 'years'));
        if(years>30){
          insuranceIds.push(3);
        }
        if(years>10 && years<30){
          if(motor.price<10000){
            insuranceIds.push(34,25);
          }else {
            insuranceIds.push(35);
          }
        }
        if(years<10){
          if(motor.price<10000){
            insuranceIds.push(34,25);
          }else {
            insuranceIds.push(35,41);
          }
        }
     }else{
      let years=parseInt(moment().diff(moment(motor.year, "YYYY-MM-DD"), 'years'));
      if(years>30){
        insuranceIds.push(3);
      }
      if(years>10 && years<30){
        if(motor.price<10000){
          insuranceIds.push(35);
        }else {
          insuranceIds.push(34,41);
        }
      }
      if(years<10){
        if(motor.price<10000){
          insuranceIds.push(34,25);
        }else {
          insuranceIds.push(35,41);
        }
      }
     }
    }
    //house
    if(house!==undefined){
    if(!house.bought){
      //rent
      //ba sale renovate
      if(house.yearrenovate!==undefined){
      let years=parseInt(moment().diff(moment(house.yearrenovate, "YYYY-MM-DD"), 'years'));
      if(house.river || house.firstfloor || house.glass || house.garden){
     
    if(years>50){
          if(house.size>200){
            insuranceIds.push(5,8,9);
          }
          if(house.size>80 && house.size<200){                  
          insuranceIds.push(5,8,9);
          }
          if(house.size<80){          
          insuranceIds.push(5);
          }
          
        }
        if(years>10 && years<50){
          if(house.size>200){
            insuranceIds.push(5,8,9);
          }
          if(house.size>80 && house.size<200){
            insuranceIds.push(5,8);
          }
          if(house.size<80){
            insuranceIds.push(5);
          }
        }
        if(years<10){
          if(house.size>200){
            insuranceIds.push(5,8);
          }
          if(house.size>80 && house.size<200){
            insuranceIds.push(5,8);
          }
          if(house.size<80){
            insuranceIds.push(5);
          }
        }
      }
      else{
        //bi plus
        if(years>50){
          if(house.size>200){
            insuranceIds.push(5,8,9);
          }
          if(house.size>80 && house.size<200){                  
          insuranceIds.push(4,8,9);
          }
          if(house.size<80){          
          insuranceIds.push(4);
          }
          
        }
        if(years>10 && years<50){
          if(house.size>200){
            insuranceIds.push(5,8,9);
          }
          if(house.size>80 && house.size<200){
            insuranceIds.push(5,8);
          }
          if(house.size<80){
            insuranceIds.push(4);
          }
        }
        if(years<10){
          if(house.size>200){
            insuranceIds.push(5,8);
          }
          if(house.size>80 && house.size<200){
            insuranceIds.push(4,8);
          }
          if(house.size<80){
            insuranceIds.push(4);
          }
        }
      }
    }
    //ba sal
      else if(house.year!==undefined){
        let years=parseInt(moment().diff(moment(house.year, "YYYY-MM-DD"), 'years'));
        if(house.river || house.firstfloor || house.glass || house.garden){
          //ba plus
        if(years>50){
          if(house.size>200){
            insuranceIds.push(5,8,9);
          }
          if(house.size>80 && house.size<200){                  
          insuranceIds.push(5,8,9);
          }
          if(house.size<80){          
          insuranceIds.push(5);
          }
          
        }
        if(years>10 && years<50){
          if(house.size>200){
            insuranceIds.push(5,8,9);
          }
          if(house.size>80 && house.size<200){
            insuranceIds.push(5,8);
          }
          if(house.size<80){
            insuranceIds.push(5);
          }
        }
        if(years<10){
          if(house.size>200){
            insuranceIds.push(5,8);
          }
          if(house.size>80 && house.size<200){
            insuranceIds.push(5,8);
          }
          if(house.size<80){
            insuranceIds.push(5);
          }
        }
      }
      else{
        //bi plus
        if(years>50){
          if(house.size>200){
            insuranceIds.push(5,8,9);
          }
          if(house.size>80 && house.size<200){                  
          insuranceIds.push(4,8,9);
          }
          if(house.size<80){          
          insuranceIds.push(4);
          }
          
        }
        if(years>10 && years<50){
          if(house.size>200){
            insuranceIds.push(5,8,9);
          }
          if(house.size>80 && house.size<200){
            insuranceIds.push(5,8);
          }
          if(house.size<80){
            insuranceIds.push(4);
          }
        }
        if(years<10){
          if(house.size>200){
            insuranceIds.push(5,8);
          }
          if(house.size>80 && house.size<200){
            insuranceIds.push(4,8);
          }
          if(house.size<80){
            insuranceIds.push(4);
          }
        }
      }
    }
    }//bought
    else{
      //ba sale renovate
      if(house.yearrenovate!==undefined){
        let years=parseInt(moment().diff(moment(house.yearrenovate, "YYYY-MM-DD"), 'years'));
        if(house.river || house.firstfloor || house.glass || house.garden){      
          if(years>50){           
           insuranceIds.push(5,8,9,41);
          }
          if(years>10 && years<50){
            if(house.size>80 ){
              insuranceIds.push(5,8,9);
            }
            if(house.size<80){
              insuranceIds.push(5,8);
            }
          }
          if(years<10){
            if(house.size>80){
              insuranceIds.push(5,8,9);
            }
            if(house.size<80){
              insuranceIds.push(5,8);
            }
          }
        }
        else{
          //bi plus
          if(years>50){                  
            insuranceIds.push(5,8,9);            
          }
          if(years>10 && years<50){
              insuranceIds.push(4,8,9);
            }
            if(house.size<80){
              insuranceIds.push(4,8);
            }
          }
          if(years<10){
            if(house.size>200){
              insuranceIds.push(5,8,9);
            }
            if(house.size>80 && house.size<200){
              insuranceIds.push(4,8,9);
            }
            if(house.size<80){
              insuranceIds.push(4,8);
            }
          }
        }
      //ba sal
        else if(house.year!==undefined){
          let years=parseInt(moment().diff(moment(house.year, "YYYY-MM-DD"), 'years'));
          if(house.river || house.firstfloor || house.glass || house.garden){      
            if(years>50){           
             insuranceIds.push(5,8,9,41);
            }
            if(years>10 && years<50){
              if(house.size>80 ){
                insuranceIds.push(5,8,9);
              }
              if(house.size<80){
                insuranceIds.push(5,8);
              }
            }
            if(years<10){
              if(house.size>80){
                insuranceIds.push(5,8,9);
              }
              if(house.size<80){
                insuranceIds.push(5,8);
              }
            }
          }
          else{
            //bi plus
            if(years>50){                  
              insuranceIds.push(5,8,9);            
            }
            if(years>10 && years<50){
                insuranceIds.push(4,8,9);
              }
              if(house.size<80){
                insuranceIds.push(4,8);
              }
            }
            if(years<10){
              if(house.size>200){
                insuranceIds.push(5,8,9);
              }
              if(house.size>80 && house.size<200){
                insuranceIds.push(4,8,9);
              }
              if(house.size<80){
                insuranceIds.push(4,8);
              }
        }
      }
    }
  }
}
  //end single
  else{
      //family
       //personal
      if(!user.drivinglicense){
        let years=parseInt(moment().diff(moment(user.bday, "YYYY-MM-DD"), 'years'));
        if(years > 40){
          insuranceIds.push(11,9,18,28,15,31,32);
        }
        else if(years>18 && years<40){
            insuranceIds.push(11,9,18,28,15);
        }
      }else{
        let years=parseInt(moment().diff(moment(user.bday, "YYYY-MM-DD"), 'years'));
        if(years<40){
          insuranceIds.push(11,9,18,28,15,1,25,31,32);
        }
        else if(years>18 && years<40){
          insuranceIds.push(11,9,18,28,15,1,25);
        }
      };

    //job
    switch(user.jobid){
      case 2:{
        if(user.income>5000){
          insuranceIds.push(19,32,31,25,29,30,15,42);
        }else if(user.income>1000 && user.income<5000){
          insuranceIds.push(18,32,31,25,29);
        }
        break;}
      case 3:{
        if(user.income>5000){ 
          insuranceIds.push(15,31,19,13,25,40,8,23,39,24,42,41);
        }else if(user.income>1000 && user.income<5000){
          
          insuranceIds.push(19,15,31,13,25,8,29,23,24,39);
        }else if(user.income<1000){
          insuranceIds.push(23,24,39,13,25);
        };
        break;}
      case 4:{
        if(user.income>5000){
          insuranceIds.push(19,13,25,23,24,29,31,32,41,30,42);
        }else if(user.income>1000 && user.income<5000){
          insuranceIds.push(19,13,25,23,24,29,31,32,15);
        }else if(user.income<1000){
          insuranceIds.push(19,13,25,23,24,29);
        };
        break;}
      case 5:{
        if(user.income>5000){
          insuranceIds.push(15,29,23,19,31,13,25,40,30,42,16);
        }else if(user.income>1000 && user.income<5000){
          insuranceIds.push(15,29,23,19,31,32);
        }else if(user.income<1000){  
          insuranceIds.push(15,29,23);
        };
        break;}
      case 6:{
          insuranceIds.push(19,32,31,25,15,16);
        break;}
      case 7:{
        insuranceIds.push(15,4);
        break;}  
      }
      //child
      if(childrenDate!==undefined){
      childrenDate.forEach((bday)=>{
      let years=parseInt(moment().diff(moment(bday, "YYYY-MM-DD"), 'years'));
      if(years>16){
        insuranceIds.push(36,37,11,6,7,1,13,40);
      }else if(years<16){
        insuranceIds.push(36,37,11,6,7,27,40);
      }
    });};
    //health 
    if(user.diabetic){
      insuranceIds.push(33,23);
    }
    if(user.glass || user.neuropathy || user.smoke){
      insuranceIds.push(15);
    }
    if(user.hospital ){
      insuranceIds.push(16,23);
    }
    if(user.dentist){
        insuranceIds.push(17);
    }
    //pet
    if(user.pet){
      insuranceIds.push(12,38);
    }
    //travel
    if(!user.abroud){       
    if(user.travelfreq<2 && user.travelfreqwork<2 ){
      
      insuranceIds.push(21);
    } else if(user.travelfreq>2 || user.travelfreqwork>2){
      
      insuranceIds.push(21,22);
    }
  }else {
    insuranceIds.push(20,21,22);
  }
    //hobbies
    if(user.extremsport){
      insuranceIds.push(15,16,25);
    }
    if(user.cooking){
      insuranceIds.push(7);
    }
    if(user.horseriding){
      insuranceIds.push(12,38,25);
    }
     //car
     if(car!==undefined){
     if(!car.forwork){
      let years=parseInt(moment().diff(moment(car.year, "YYYY-MM-DD"), 'years'));
        if(years>30){
          insuranceIds.push(3);
        }
        if(years>10 && years<30){
          if(car.price<10000){
            insuranceIds.push(1,25);
          }else {
            insuranceIds.push(2);
          }
        }
        if(years<10){
          if(car.price<10000){
            insuranceIds.push(1,25);
          }else {
            insuranceIds.push(2,41);
          }
        }
     }else{
      let years=parseInt(moment().diff(moment(car.year, "YYYY-MM-DD"), 'years'));
      if(years>30){
        insuranceIds.push(3);
      }
      if(years>10 && years<30){
        if(car.price<10000){
          insuranceIds.push(2);
        }else {
          insuranceIds.push(2,41);
        }
      }
      if(years<10){
        if(car.price<10000){
          insuranceIds.push(1,25);
        }else {
          insuranceIds.push(2,41);
        }
      }
     }
    }
    //motor
    if(motor!==undefined){
    if(!motor.forwork){
      let years=parseInt(moment().diff(moment(motor.year, "YYYY-MM-DD"), 'years'));
        if(years>30){
          insuranceIds.push(3);
        }
        if(years>10 && years<30){
          if(motor.price<10000){
            insuranceIds.push(34,25);
          }else {
            insuranceIds.push(35);
          }
        }
        if(years<10){
          if(motor.price<10000){
            insuranceIds.push(34,25);
          }else {
            insuranceIds.push(35,41);
          }
        }
     }else{
      let years=parseInt(moment().diff(moment(motor.year, "YYYY-MM-DD"), 'years'));
      if(years>30){
        insuranceIds.push(3);
      }
      if(years>10 && years<30){
        if(motor.price<10000){
          insuranceIds.push(35);
        }else {
          insuranceIds.push(34,41);
        }
      }
      if(years<10){
        if(motor.price<10000){
          insuranceIds.push(34,25);
        }else {
          insuranceIds.push(35,41);
        }
      }
     }
    }
    //house
    if(house!==undefined){
    if(!house.bought){
      //rent
      //ba sale renovate
      if(house.yearrenovate!==undefined){
      let years=parseInt(moment().diff(moment(house.yearrenovate, "YYYY-MM-DD"), 'years'));
      if(house.river || house.firstfloor || house.glass || house.garden){
     
        if(years>50){
          if(house.size>200){
            insuranceIds.push(7,8,9);
          }
          if(house.size>80 && house.size<200){                  
          insuranceIds.push(7,8,9);
          }
          if(house.size<80){          
          insuranceIds.push(7);
          }
          
        }
        if(years>10 && years<50){
          if(house.size>200){
            insuranceIds.push(7,8,9);
          }
          if(house.size>80 && house.size<200){
            insuranceIds.push(7,8);
          }
          if(house.size<80){
            insuranceIds.push(7);
          }
        }
        if(years<10){
          if(house.size>200){
            insuranceIds.push(7,8);
          }
          if(house.size>80 && house.size<200){
            insuranceIds.push(7,8);
          }
          if(house.size<80){
            insuranceIds.push(7);
          }
        }
      }
      else{
        //bi plus
        if(years>50){
          if(house.size>200){
            insuranceIds.push(7,8,9);
          }
          if(house.size>80 && house.size<200){                  
          insuranceIds.push(6,8,9);
          }
          if(house.size<80){          
          insuranceIds.push(6);
          }
          
        }
        if(years>10 && years<50){
          if(house.size>200){
            insuranceIds.push(7,8,9);
          }
          if(house.size>80 && house.size<200){
            insuranceIds.push(7,8);
          }
          if(house.size<80){
            insuranceIds.push(6);
          }
        }
        if(years<10){
          if(house.size>200){
            insuranceIds.push(7,8);
          }
          if(house.size>80 && house.size<200){
            insuranceIds.push(6,8);
          }
          if(house.size<80){
            insuranceIds.push(6);
          }
        }
      }
    }
    //ba sal
      else if(house.year!==undefined){
        let years=parseInt(moment().diff(moment(house.year, "YYYY-MM-DD"), 'years'));
        if(house.river || house.firstfloor || house.glass || house.garden){
          //ba plus
        if(years>50){
          if(house.size>200){
            insuranceIds.push(7,8,9);
          }
          if(house.size>80 && house.size<200){                  
          insuranceIds.push(7,8,9);
          }
          if(house.size<80){          
          insuranceIds.push(7);
          }
          
        }
        if(years>10 && years<50){
          if(house.size>200){
            insuranceIds.push(7,8,9);
          }
          if(house.size>80 && house.size<200){
            insuranceIds.push(7,8);
          }
          if(house.size<80){
            insuranceIds.push(7);
          }
        }
        if(years<10){
          if(house.size>200){
            insuranceIds.push(7,8);
          }
          if(house.size>80 && house.size<200){
            insuranceIds.push(7,8);
          }
          if(house.size<80){
            insuranceIds.push(7);
          }
        }
      }
      else{
        //bi plus
        if(years>50){
          if(house.size>200){
            insuranceIds.push(7,8,9);
          }
          if(house.size>80 && house.size<200){                  
          insuranceIds.push(6,8,9);
          }
          if(house.size<80){          
          insuranceIds.push(6);
          }
          
        }
        if(years>10 && years<50){
          if(house.size>200){
            insuranceIds.push(7,8,9);
          }
          if(house.size>80 && house.size<200){
            insuranceIds.push(7,8);
          }
          if(house.size<80){
            insuranceIds.push(6);
          }
        }
        if(years<10){
          if(house.size>200){
            insuranceIds.push(7,8);
          }
          if(house.size>80 && house.size<200){
            insuranceIds.push(6,8);
          }
          if(house.size<80){
            insuranceIds.push(6);
          }
        }
      }
    }
    }//bought
    else{
      //ba sale renovate
      if(house.yearrenovate!==undefined){
        let years=parseInt(moment().diff(moment(house.yearrenovate, "YYYY-MM-DD"), 'years'));
        if(house.river || house.firstfloor || house.glass || house.garden){      
          if(years>50){           
           insuranceIds.push(7,8,9,41);
          }
          if(years>10 && years<50){
            if(house.size>80 ){
              insuranceIds.push(7,8,9);
            }
            if(house.size<80){
              insuranceIds.push(7,8);
            }
          }
          if(years<10){
            if(house.size>80){
              insuranceIds.push(7,8,9);
            }
            if(house.size<80){
              insuranceIds.push(7,8);
            }
          }
        }
        else{
          //bi plus
          if(years>50){                  
            insuranceIds.push(7,8,9);            
          }
          if(years>10 && years<50){
              insuranceIds.push(6,8,9);
            }
            if(house.size<80){
              insuranceIds.push(6,8);
            }
          }
          if(years<10){
            if(house.size>200){
              insuranceIds.push(7,8,9);
            }
            if(house.size>80 && house.size<200){
              insuranceIds.push(6,8,9);
            }
            if(house.size<80){
              insuranceIds.push(6,8);
            }
          }
        }
      //ba sal
        else if(house.year!==undefined){
          let years=parseInt(moment().diff(moment(house.year, "YYYY-MM-DD"), 'years'));
          if(house.river || house.firstfloor || house.glass || house.garden){      
            if(years>50){           
             insuranceIds.push(7,8,9,41);
            }
            if(years>10 && years<50){
              if(house.size>80 ){
                insuranceIds.push(7,8,9);
              }
              if(house.size<80){
                insuranceIds.push(7,8);
              }
            }
            if(years<10){
              if(house.size>80){
                insuranceIds.push(7,8,9);
              }
              if(house.size<80){
                insuranceIds.push(7,8);
              }
            }
          }
          else{
            //bi plus
            if(years>50){                  
              insuranceIds.push(7,8,9);            
            }
            if(years>10 && years<50){
                insuranceIds.push(6,8,9);
              }
              if(house.size<80){
                insuranceIds.push(6,8);
              }
            }
            if(years<10){
              if(house.size>200){
                insuranceIds.push(7,8,9);
              }
              if(house.size>80 && house.size<200){
                insuranceIds.push(6,8,9);
              }
              if(house.size<80){
                insuranceIds.push(6,8);
              }
        }
      }
    }
  }
}

    insuranceIds.sort(); 
    let swap=insuranceIds;
    insuranceIds.forEach((e ,index)=>{
      swap.forEach((i,ind)=>{
        if(e==i && index!==ind){
          insuranceIds.splice(index,1);
        };
      });
    });
    swap=insuranceIds;
     insuranceIds.forEach(e=>{
      swap.forEach((i,index)=>{
        if(e==10 && i==11){
          insuranceIds.splice(index,1);
        }
        if(e==18 && i==19){
          insuranceIds.splice(index,1);
        }
        if(e==28 && i==29){
          insuranceIds.splice(index,1);
        }
        if(e==31 && i==33){
          insuranceIds.splice(index,1);
        }
        if(e==4 && i==5){
          insuranceIds.splice(index,1);
        }
        if(i==7 && (e==6 || e==5 || e==4)){          
          insuranceIds.splice(index,1);
        }
        if(e==29 && i==28){
          insuranceIds.splice(index,1);
        }
        if(e==1 && i==2){
          insuranceIds.splice(index,1);
        }
        if((e==1||e==2) && i==3){
          insuranceIds.splice(index,1);
        }
        if(e==34 && i==35){
          insuranceIds.splice(index,1);
        }
        if(e==14 && i==15){
          insuranceIds.splice(index,1);
        }
        if(e==26 && i==37){
          insuranceIds.splice(index,1);
        }         
      });
     });
     let count=0;
     if(insuranceIds.length>7){
      insuranceIds.forEach(e=>{
        all.forEach(i=>{
          if(count<7){
          if(e==i.id && i.rank==1 ){
            insurances.push(i);
              count+=1;
          }};
        });
      });    
     if(count<7){
    insuranceIds.forEach(e=>{
      all.forEach(i=>{
        if(count<7){
        if(e==i.id && i.rank==2 ){
            insurances.push(i);
            count+=1;
        }};
      });
    });
    };
    if(count<7){
      insuranceIds.forEach(e=>{
        all.forEach(i=>{
          if(count<7){
          if(e==i.id && i.rank==3 ){
              insurances.push(i);
              count+=1;
          }
        };
        });
      });
      };   
    }
    else {
      insuranceIds.forEach(e=>{
      all.forEach(i=>{
        if(e==i.id){
            insurances.push(i);
        };
        });
      });
    };
  };
   function calcResults(){     
    let random=Math.round(Math.random());
    if(random==0){
    console.log("random");
    rrandom=0;
    //bayad random biar
    var indexx= []; 
    indexx.push(Math.floor(Math.random() * 42)+1);
    indexx.push(Math.floor(Math.random() * 42)+1);
    indexx.push(Math.floor(Math.random() * 42)+1);
    indexx.push(Math.floor(Math.random() * 42)+1);
    indexx.push(Math.floor(Math.random() * 42)+1);
    indexx.push(Math.floor(Math.random() * 42)+1);
    indexx.push(Math.floor(Math.random() * 42)+1);
    let swap=indexx;
    indexx.forEach((e ,index)=>{
      swap.forEach((i,ind)=>{
        if(e==i && index!==ind){
          indexx.splice(index,1);
        };
      });
    });
    swap=indexx;
    indexx.forEach(e=>{
      swap.forEach((i,index)=>{
        if(e==10 && i==11){
          indexx.splice(index,1);
        }
        if(e==18 && i==19){
          indexx.splice(index,1);
        }
        if(e==28 && i==29){
          indexx.splice(index,1);
        }
        if(e==31 && i==33){
          indexx.splice(index,1);
        }
        if(e==4 && i==5){
          indexx.splice(index,1);
        }
        if(i==7 && (e==6 || e==5 || e==4)){          
          indexx.splice(index,1);
        }
        if(e==29 && i==28){
          indexx.splice(index,1);
        }
        if(e==1 && i==2){
          indexx.splice(index,1);
        }
        if((e==1||e==2) && i==3){
          indexx.splice(index,1);
        }
        if(e==34 && i==35){
          indexx.splice(index,1);
        }
        if(e==14 && i==15){
          indexx.splice(index,1);
        }
        if(e==26 && i==37){
          indexx.splice(index,1);
        }         
      });
     });
      indexx.forEach(e=>{
        all.forEach(i=>{
          if(e==i.id){
            insurances.push(i);
          };
        });
      });
  }else{
    console.log("noooorandom");
    rrandom=1;
    //DT
    findResults();   
  };
};

  return (
    <div>
      {(!form && intro)&&(
        <Introduction isForm={isForm}></Introduction>
        )}
    {(!result && form)&&(
    <RSInsurance notForm={notForm} isResult={isResult}></RSInsurance>
    )}
    {(result && !gB && !form)&&(
    <Results goodbye={goodbye} onQuestion={onQuestion} results={insurances}  random={rrandom} useriid={user}></Results>
    )}
     {(gB && !result && !form && !intro)&&(
    <Goodbye results={insurances} user={user}></Goodbye>
    )}
  </div>
  );
}

export default App;
