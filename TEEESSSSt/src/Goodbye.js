import React ,{useState,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import {
   Grid,Paper,Typography,
} from '@material-ui/core';
import Axios from "axios";

export async function result(res){
   await Axios.post('http://localhost:3000/addUserResult',{
     //await Axios.post('http://api.aydablue.com/addUserResult',{
   dataToAdd:res,
   }).then(()=>{});
 }; 
const Goodbye=({results,user})=>{
  
  results.forEach(element => {
    let res={
          userid:user.id,
          insuranceid:element.id,
    };
   result(res);
  });
    const classes = useStyles();
  return(
    <Grid container spacing={1} justify="center" display="flex">
    <Paper className={classes.root}>
        <Grid style={{padding:"5rem 5rem 5rem 5rem"}} direction="column" container spacing={5} align="center">
            <Grid item>
            <Typography style={{fontWeight: 2000}}>
          Thank you for your participation
            </Typography>
            </Grid>
            <Grid item>
            <Typography style={{fontWeight: 2000}}>
          Vielen Dank für Ihre Teilnahme
            </Typography>
            </Grid>
        </Grid>
        </Paper>
   </Grid>
  );
};
const useStyles = makeStyles(() => ({
    root: {
      height: 'auto',
      width: 'auto',
      margin: '5.5rem 2.5rem 4rem',
      background:'#F1FEF2',
      boxShadow: '0px 4px 10px rgba(41, 77, 98, 0.1)',
      borderRadius: '10px',
      border:"1px solid #1D592E",
      justifyContent: 'center',
    },
}));
export default Goodbye;