import React ,{useState,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import {
 Button, Grid,Paper,Typography
} from '@material-ui/core';

const Results=({isForm})=>{
  
  const classes = useStyles();
  return(
    <Grid container spacing={1} justifyContent="center" display="flex">
        <Grid item align="center">
            <Paper className={classes.root}>
                <Grid style={{margin:"2rem 0 2rem 0"}}>
                <Typography style={{fontWeight: 900}}  >Hello and welcome to this platform! </Typography>
                </Grid>
                <Grid style={{margin: "1rem 1rem 0 1rem"}}>
                This tool is for collecting data to implement and improving a recommendation system in insurance domain. The data will be anonymously saved, since the system will not ask your name and address, however some personal questions will be asked in order to help the system provide a suitable result.
The collecting data will eventually be used to improve a machine learning system to recommend insurance product. The results will be used in a master thesis, and also in an Adesso intern project.

At the end, you will see some results as insurance products in different categories. You will be asked some questions about the given results to help us improve the method of recommendation. If there is any problem in between please refresh the page and insert your entries again.

We would like to thank you in advance for your participation. 
                </Grid>
                <Grid style={{margin: "2rem 1rem 0 1rem"}}>
               (Deutsch: Dieses Tool ist für die Sammlung von Daten zur Implementierung und Verbesserung eines Empfehlungssystems im Versicherungsbereich gedacht. Die Daten werden anonym gespeichert, da das System Ihren Namen und Ihre Adresse nicht erfragt, jedoch werden einige persönliche Fragen gestellt, um dem System zu helfen, ein geeignetes Ergebnis zu liefern.
Die gesammelten Daten werden schließlich verwendet, um ein maschinelles Lernsystem zur Empfehlung von Versicherungsprodukten zu verbessern. Die Ergebnisse werden in einer Masterarbeit und auch in einem internen Projekt von Adesso verwendet.

Am Ende werden Sie einige Ergebnisse als Versicherungsprodukte in verschiedenen Kategorien sehen. Es werden Ihnen einige Fragen zu den Ergebnissen gestellt, die uns helfen sollen, die Empfehlungsmethode zu verbessern. Sollte es zwischendurch zu Problemen kommen, aktualisieren Sie bitte die Seite und geben Sie Ihre Daten erneut ein.
Wir danken Ihnen im Voraus für Ihre Teilnahme.)
                </Grid>
                <Button className={classes.buttonSu} onClick={isForm}>
                  Submit
                </Button>
            </Paper>
        </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
    root: {
      height: 'auto',
      width: '50rem',
      margin: '2.5rem 0 4rem',
      background:'#F1FEF2',
      boxShadow: '0px 4px 10px rgba(41, 77, 98, 0.1)',
      borderRadius: '10px',
      border:"1px solid #1D592E",
      justifyContent: 'center',
    },
    buttonSu:{
        margin:"2rem 0 2rem 0",
        minWidth:"15rem",
        variant:"outlined",
        color:"#1D592E",
        border:"1px solid #19E251",
        background:"#FFFFFF"
      },
}));
export default Results;