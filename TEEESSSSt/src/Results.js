import React ,{useState,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import {
   Grid, Switch,Paper,Button,FormGroup,Slider,
  FormControlLabel,Typography,Accordion,AccordionDetails,AccordionSummary, TextField,
} from '@material-ui/core';


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Axios from "axios";

let id=undefined;
let savedinsurance=[];
const Results=({goodbye , onQuestion , results , random, useriid})=>{ 
    Axios.get('http://localhost:3000/getUserId?',{
    //  Axios.get('http://api.aydablue.com/getUserId?',{
    params:{
      dataToSeach:useriid,
    }}).then((response)=>{
      if(response.data[0].id!=undefined){
      id=response.data[0].id;
      qAnswers.userid=response.data[0].id;
     userinsurance.userid=response.data[0].id;
    };
});
    const userinsurance={
    userid:id,
    insuranceid:undefined,
    rate:0,
    haveinsurance:false,
    consider:false,
    raterelevant:0,
    suggestion:undefined,
    random:random,
  };

  const qAnswers={
    userid:id,
    q1:false,
    q2:false,
    q3:false,
    q4:false,
  };
  const markss = [
    {
      value: 0,
      label: 'Totally disagree',
    },
    {
      value: 1,
      label: ' Disagree',
    },
    {
      value: 2,
      label: 'So So',
    },
    {
      value: 3,
      label: 'Agree',
    },
    {
      value: 4,
      label: 'Totally agree',
    },
  ];
  async function handleSubmit(insuranceid){
    userinsurance.userid=id;
    if(userinsurance.rate==null){
      userinsurance.rate=0;
    };
    if(userinsurance.raterelevant==null){
      userinsurance.raterelevant=0;
    };
    userinsurance.insuranceid=insuranceid;
    savedinsurance.push(insuranceid);
    const a= await Axios.post('http://localhost:3000/addUserInsurance',{
      //const a= await Axios.post('http://api.aydablue.com/addUserInsurance',{
      dataToAdd:userinsurance,
      }).then(()=>{});
      userinsurance.rate=0;
      userinsurance.haveinsurance=false;
      userinsurance.consider=false;
      userinsurance.raterelevant=0;
      userinsurance.suggestion="";
  };
  async function handleGB(){
    qAnswers.userid=id;
    if(qAnswers.userid!==undefined){
     Axios.post('http://localhost:3000/addUserQ',{
    //  Axios.post('http://api.aydablue.com/addUserQ',{
      dataToAdd:qAnswers,
      }).then(()=>{});     
    };
    goodbye();
  };
  const classes = useStyles();
  return(
    <Grid container spacing={1} justify="center" display="flex">
            <Paper className={classes.root}>
            <Grid item align="center" style={{margin:"1rem 0 0 1rem"}}>
              <Typography style={{fontWeight: 900}} >Results:</Typography>
                  {(results.map((insurance) => (
                    userinsurance.insuranceid=insurance.id,
                  //  insuranceid=insurance.id,
                      <Grid container direction='row' > 
                      <Grid style={{margin:"1rem 0 1rem 1rem"}} item xs={11}>
                      <Accordion defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon className={classes.icon} />}
                      >
                        <Typography style={{fontSize:16, fontWeight: 800}}>{insurance.name} Versicherung</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container direction="row" xs={12}>
                         <Grid align="left" item xs={6}>     
                         <Typography>This result is totally good. (Dieses Ergebnis ist absolut gut.)</Typography>
                         </Grid> 
                         <Grid style={{margin:"2rem 0 0 3rem"}} item xs={5}>
                         <Slider 
                          defaultValue={0}
                          valueLabelDisplay="on"
                          step={1}
                          marks={markss}
                          min={0}
                          max={4}
                          onChangeCommitted={(event) => userinsurance.rate=event.target.ariaValueNow}         
                          >
                             </Slider>
                             </Grid>
                             <Grid style={{marginTop:"2rem"}} align="left" item xs={6}>     
                         <Typography>This result is totally relevant. (Dieses Ergebnis ist absolut relevant.)</Typography>
                         </Grid> 
                         <Grid style={{margin:"2rem 0 0 3rem"}} item xs={5}>
                         <Slider 
                          defaultValue={0}
                          valueLabelDisplay="on"
                          step={1}
                          marks={markss}
                          min={0}
                          max={4}
                          onChangeCommitted={(event) => userinsurance.raterelevant=event.target.ariaValueNow}                     
                          >
                             </Slider>
                             </Grid>
                        <Grid align="left" item xs={10}>
                        <Typography>Did you have that insurance (Haben Sie diese Versicherung)?</Typography>
                        </Grid>
                        <Grid item xs={2}>
                        <FormGroup>
                         <FormControlLabel onChange={(e)=>{
                          userinsurance.haveinsurance=e.target.checked;
                    }} control={<Switch />} label="Ja"  />
                        </FormGroup>
                      </Grid>
                      <Grid align="left" item xs={10}>
                        <Typography>When yes, do you still consider this insurance products 
                          (Wenn ja, betrachten Sie diese Versicherungsprodukte immer noch als)?</Typography>
                        </Grid>
                        <Grid item xs={2}>
                        <FormGroup>
                         <FormControlLabel onChange={(e)=>{
                        userinsurance.consider=e.target.checked;
                    }} control={<Switch />} label="Ja"  />
                        </FormGroup>
                      </Grid>
                      <Grid align="left" style={{ marginTop:"1rem"}}item xs={10}>
                        <Typography>Do you have any suggestion regarding this insurance?(Haben Sie Vorschläge zu dieser Versicherung?)</Typography>
                      </Grid>
                      <Grid align="left" item xs={12}>
                        <TextField style={{minWidth:"40rem"}} onChange={(e)=>{
                        userinsurance.suggestion=e.target.value;}}>
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                      <Button onClick={()=>handleSubmit(insurance.id)} className={classes.buttonSu} >Save (Speichern)</Button>
                      </Grid>
                      </Grid>
                      </AccordionDetails>
                     </Accordion>         
                     </Grid>   
                     </Grid>    
               )))} 
               </Grid>
               <Grid style={{margin:"0 0 0 2rem"}}  container direction='row'spacing={1}> 
                <Grid item xs={10}>
                   <Typography>Were the questions relevant or there were some you wished that to be consider 
                     (Waren die Fragen relevant oder gab es einige, die Sie gerne berücksichtigt hätten?)? </Typography>
                   </Grid>
                   <Grid item xs={1}>
                    <FormGroup>
                   <FormControlLabel onChange={(e)=>{
                    qAnswers.q1=e.target.checked;
                    }} control={<Switch />} label="Yes" />
                  </FormGroup>
               </Grid>
               <Grid item xs={10}>
                   <Typography>Were the Results relevant in total (Waren die Ergebnisse insgesamt relevant)? </Typography>
                   </Grid>
                   <Grid item xs={1}>
                    <FormGroup>
                   <FormControlLabel onChange={(e)=>{
                    qAnswers.q2=e.target.checked;
                    }} control={<Switch />} label="Yes" />
                  </FormGroup>
               </Grid>
               <Grid item xs={10}>
                   <Typography>Were the questions too much in total (Waren die Fragen insgesamt zu viel?)? </Typography>
                   </Grid>
                   <Grid item xs={1}>
                    <FormGroup>
                   <FormControlLabel onChange={(e)=>{
                    qAnswers.q3=e.target.checked;
                    }} control={<Switch />} label="Yes" />
                  </FormGroup>
               </Grid>
               <Grid item xs={10}>
                   <Typography>Were the questions too private (Waren die Fragen zu privat?)? </Typography>
                   </Grid>
                   <Grid item xs={1}>
                    <FormGroup>
                   <FormControlLabel onChange={(e)=>{
                    qAnswers.q4=e.target.checked;
                    }} control={<Switch />} label="Yes" />
                  </FormGroup>
               </Grid>
               </Grid>
              <Grid container>
                <Grid item xs={6}>
                <Button className={classes.buttonSu} onClick={handleGB}>
                  Submit (Speichern) Final
                  </Button>      
                  </Grid>
                 { <Grid item align="right"xs={6}>
                  <Button onClick={onQuestion} className={classes.buttonSu} >
                    Back
                  </Button>
                </Grid>}
              </Grid>      
      </Paper>
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
    root: {
      height: 'auto',
      width: '70rem',
      margin: '2.5rem 2.5rem 4rem',
      background:'#F1FEF2',
      boxShadow: '0px 4px 10px rgba(41, 77, 98, 0.1)',
      borderRadius: '10px',
      border:"1px solid #1D592E",
      justifyContent: 'center',
    },
    buttonSu:{
      margin:"1rem 2rem 1rem 2rem",
      minWidth:"15rem",
      variant:"outlined",
      color:"#1D592E",
      border:"1px solid #19E251",
      background:"#FFFFFF"
    },
}));
export default Results;