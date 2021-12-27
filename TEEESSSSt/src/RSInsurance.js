import React ,{useState,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import {
  Box, Grid, Switch,Tabs, Tab,Paper,Button, Input,FormControl,FormGroup,
  FormControlLabel,Dialog,Chip,Typography,Select,MenuItem,Accordion,AccordionDetails,AccordionSummary,Slider,
} from '@material-ui/core';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Axios from "axios";

const user = {
  id: undefined,
  bday:undefined,
  drivinglicense:false,
  jobid:"1",
  income:0,
  family:false,
  childbday:undefined,
  diabetic:false,
  dentist:false,
  glass:false,
  neuropathy:false,
  smoke:false,
  sleephospital:false,
  pet:false, 
  horseriding:false,
  extremsport:false,
  cooking:false,
  travelfreq:0,
  abroud:false,
  travelfreqwork:0,
  //
};
 
const child={
  userid:undefined,
  childbday:undefined,
}
const car={
  id:undefined,
  neworsecond:false,
  year:undefined,
  price:0,
  forwork:false,
}
const motor={
  id:undefined,
  neworsecond:false,
  year:undefined,
  price:0,
  forwork:false,
}
const house={
  id:undefined,
  year:undefined,
  yearrenovate:undefined,
  size:0,
  bought:false,
  river:false,
  firstfloor:false,
  glass:false,
  garden:false,
}
function RSInsurance({isResult,notForm}) {
  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '<5',
    },
  ];
  function TabPanel(props) {
    const {
      children, value, index, ...other
    } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
        <Box p={3}>{children}</Box>
        )}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  //
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [jobb, setJob] = useState('1');
  const [status, setStatus] = useState('0');
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");
  let nextErr=false;
  let childDate=0;
  //let childrenDate;
  const [childrenDate, setchildrenDate] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSelect = (event) => {
    setJob(event.target.value);
    switch (event.target.value){
    case "1": {user.jobid="1";break;}
    case "2": {user.jobid="2";break;}
    case "3": {user.jobid="3";break;}
    case "4": {user.jobid="4";break;}
    case "5": {user.jobid="5";break;}
    case "6": {user.jobid="6";break;}
    case "7": {user.jobid="7";break;}
    }
  };
  const handleStatus = (event) => {
    setStatus(event.target.value);
    if(event.target.value=="0")
    user.family=false;
    else if(event.target.value=="1")
    user.family=true;
  };
  const handleOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleChildren = (event) => {
      childrenDate.push(childDate);
      setOpenDialog(false);
  };
const handleSaveFinal=()=>{
  nextErr=false;
  if(user.bday!==undefined){
    Axios.post('http://localhost:3000/addUser',{
      //Axios.post('http://api.aydablue.com/addUser',{
    dataToAdd:user,
    }).then((result)=>{
      user.id=result.data[0].id;
      child.userid=result.data[0].id;
      if(childrenDate!==undefined)  { 
        for(let i=0 ; i<childrenDate.length;i+=1){ 
          child.childbday=childrenDate[i];
          Axios.post('http://localhost:3000/addUserChild',{
            //Axios.post('http://api.aydablue.com/addUserChild',{
          dataToAdd:child,
          }).then(()=>{
      });
      }};
      
      if(car.year!=undefined){
        console.log("car");
      Axios.post('http://localhost:3000/addCar',{
        // Axios.post('http://api.aydablue.com/addCar',{
    dataToAdd:car,
    }).then((result)=>{
      car.id=result.data[0].id;
      if(car.id!==undefined){
        const data={
          userid:user.id,
          carid:car.id,
        }
        Axios.post('http://localhost:3000/addUserCar',{
          //Axios.post('http://api.aydablue.com/addUserCar',{
          dataToAdd:data,
          }).then(()=>{});
      };
    });
    }else{      
      nextErr=false;
      if(car.price!=0 || car.forwork==true || car.neworsecond==true){
        setError("*Please give your car's made year (Bitte geben Sie das Herstellungsjahr Ihres Fahrzeugs an)");
        nextErr=true;
      };
    };
  if(motor.year!==undefined){
    console.log("motor");
    Axios.post('http://localhost:3000/addMotor',{
      //Axios.post('http://api.aydablue.com/addMotor',{
    dataToAdd:motor,
    }).then((result)=>{
      motor.id=result.data[0].id;
      if(motor.id!==undefined){
        const data={
          userid:user.id,
          motorid:motor.id,
        }
        Axios.post('http://localhost:3000/addUserMotor',{
          //Axios.post('http://api.aydablue.com/addUserMotor',{
          dataToAdd:data,
          }).then(()=>{});
      };
    });
  }else{
    nextErr=false;
    if(motor.price!==0 || motor.forwork==true || motor.neworsecond==true){
      setError("*Please give your motors's made year (Bitte geben Sie das Herstellungsjahr Ihres Motor an)");
      nextErr=true;
    };
  };
  if(house.year!=undefined || house.yearrenovate!=undefined){
    console.log("house");
    Axios.post('http://localhost:3000/addHouse',{
      //Axios.post('http://api.aydablue.com/addHouse',{
    dataToAdd:house,
    }).then((result)=>{
      house.id=result.data[0].id;
      if(house.id!==undefined){
        const data={
          userid:user.id,
          houseid:house.id,
        }
        Axios.post('http://localhost:3000/addUserHouse',{
          //Axios.post('http://api.aydablue.com/addUserHouse',{
          dataToAdd:data,
          }).then(()=>{});
      };
    });
  }else{
    nextErr=false;
    if(house.bought==true || house.firstfloor==true || house.garden==true || house.river==true || house.size!==0){
      setError("*Please give your house's made year (Bitte geben Sie das Herstellungsjahr Ihres Hause an)");
      nextErr=true;
    };
    };
    if(nextErr==false){
      isResult(user,childrenDate,car,motor,house);
      };
    });    
   }   
   else{
     setError("*Please give your birthday (Bitte Ihre Geburtsdatum hinzufügen)");
     nextErr=true;
   };
};
  //
  return (
  <Box mx="auto">
      <Grid container spacing={1} justifyContent="center" display="flex">
        <Grid item align="center">
          <Paper className={classes.root}>
            <Tabs
              orientation="vertical"
              value={value}
              variant="fullWidth"
              onChange={handleChange}
              aria-label="Vertical panel"
              className={classes.tabs}
            >
              <Tab
                label={(
                  <Button className={classes.button}>
                    Personal Information
                  </Button>
)}
                {...a11yProps(0)}
              />
              <Tab
                label={(
                  <Button className={classes.button}>
                    Job (Beruf)
                  </Button>
)}
                {...a11yProps(1)}
              />
              <Tab
                label={(
                  <Button className={classes.button}>
                    Family (Familie)
                    </Button>
)}
                {...a11yProps(2)}
              />
              <Tab
                label={(
                  <Button className={classes.button}>
                    Health Status (Gesundheit)
                  </Button>
)}
                {...a11yProps(3)}
              />
              <Tab
                label={(
                  <Button className={classes.button}>
                    Properties (Zugehörigkeit)
                    </Button>
)}
                {...a11yProps(4)}
              />
              <Tab
                label={(
                  <Button className={classes.button}>
                    Hobbies (Hobbys) </Button>
)}
                {...a11yProps(5)}
              />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.root} style={{ width: '50rem', height: 'auto' }}>
            <TabPanel value={value} index={0}>
            <Grid container>
                <Grid item xs={12}>
                  <Typography>Date of birth (Geburtsdatum): </Typography>
                  <Input  className={classes.select} type="date" label="Date of birth:" 
                    onChange={(e)=>{
                    user.bday=e.target.value;
                    }}
                    />
                  </Grid>
                <Grid item xs={4}>
                <Typography >Driving License (Führerscheine): </Typography>
                </Grid>
                <Grid item xs={7}>
                  <FormGroup>
                    <FormControlLabel 
                    onChange={(e)=>{
                    user.drivinglicense=e.target.checked;
                    }} 
                    control={<Switch  />} label="Ja" />
                  </FormGroup>
                </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                  <Button className={classes.buttonSu}>
                  Save (Speichern)
                    </Button>      
                    </Grid>
                    <Grid item align="right"xs={6}>
                    <Button className={classes.buttonSu} onClick={notForm}>
                      Back
                    </Button>
                    </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box direction="column">
                <Box direction="row">
                     <FormControl fullWidth>
                     <Typography>Job (Beruf):
                        <Select
                          className={classes.select}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={jobb}
                          onChange={handleSelect}
                        >
                          <MenuItem value={"1"}>Student</MenuItem>
                          <MenuItem value={"2"}>Employee (Angestellter)</MenuItem>
                          <MenuItem value={"3"}>Self-Employee (Selbstständige)</MenuItem>
                          <MenuItem value={"4"}>Officer (Beamte)</MenuItem>
                          <MenuItem value={"5"}>Doctor (Arzt)</MenuItem>
                          <MenuItem value={"6"}>Pensioner (Rentner)</MenuItem>
                          <MenuItem value={"7"}>Jobless (Arbeitslos)</MenuItem>
                        </Select>
                        </Typography>
                      </FormControl>
                </Box>
                <Box direction="row">
                  <Typography>Income (Einkommen): 
                    <Input 
                    onChange={(e)=>{
                    user.income=e.target.value;
                    }} 
                    type="string"/> (Netto) Euros</Typography>
                </Box>
                <Grid container>
                <Grid item xs={6}>
                <Button className={classes.buttonSu} >
                Save (Speichern)
                  </Button>      
                  </Grid>
                  <Grid item align="right"xs={6}>
                  <Button className={classes.buttonSu} onClick={notForm}>
                    Back
                  </Button>
                  </Grid>
              </Grid>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
            <Box direction="column">
                <Box direction="row">
                     <FormControl fullWidth>
                     <Typography>Family Status (Familienstand:)
                        <Select
                          className={classes.select}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={status}
                          onChange={handleStatus}
                        >
                          <MenuItem value={"0"}>Single (Ledig)</MenuItem>
                          <MenuItem value={"1"}>Married / Have a Partner (Verheiratet/mit Partner)</MenuItem>
                        </Select>
                        </Typography>
                      </FormControl>
                </Box>
                <Box direction="row">
                  <Typography>Children (Kinder): </Typography>
                  <AddCircleOutlineIcon cursor="pointer" onClick={handleOpen}/>
                  {childrenDate.map((childDate) => (
                    <Box margin="0.5rem 0 0 0">
                      <Chip
                        label={`Birthday: ${childDate}`}
                      />
                    </Box>
                  ))}
                </Box>
                <Grid container>
                <Grid item xs={6}>
                <Button className={classes.buttonSu} >
                Save (Speichern)
                  </Button>      
                  </Grid>
                  <Grid item align="right"xs={6}>
                  <Button className={classes.buttonSu} onClick={notForm}>
                    Back
                  </Button>
                  </Grid>
              </Grid>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={11}>
                <Typography >Are you a Diabetice? (Sind Sie Diabetiker?) </Typography>
                </Grid>
                <Grid item xs={1}>
                  <FormGroup>
                    <FormControlLabel onChange={(e)=>{
                    user.diabetic=e.target.checked;
                    }}  control={<Switch  />} label="Ja"  />
                  </FormGroup>
                </Grid>
                <Grid item xs={11}>
                 <Typography >Are you in need of Dentists more that once a year?-Except the regular check-ups 
                   (Müssen Sie öfter als einmal im Jahr zum Zahnarzt?-außer den regelmäßigen Kontrolluntersuchungen?) </Typography>
                </Grid>
                <Grid item xs={1}>
                  <FormGroup>
                    <FormControlLabel onChange={(e)=>{
                    user.dentist=e.target.checked;
                    }}  control={<Switch  />} label="Ja" />
                  </FormGroup>
                  </Grid>
                <Grid item xs={11}>
                <Typography >Do you wear glasses in need for better vision? (Benötigen Sie eine Brille, um besser sehen zu können?)</Typography>
                </Grid>
                <Grid item xs={1}>
                  <FormGroup>
                    <FormControlLabel onChange={(e)=>{
                    user.glass=e.target.checked;
                    }}  control={<Switch  />} label="Ja" />
                  </FormGroup>
                </Grid>
                <Grid item xs={11}>
                 <Typography >Do you in need of Naturopath regularly? (Brauchen Sie regelmäßig einen Heilpraktiker?) </Typography>
                </Grid>
                <Grid item xs={1}>
                  <FormGroup>
                    <FormControlLabel onChange={(e)=>{
                    user.neuropathy=e.target.checked;
                    }}  control={<Switch  />} label="Ja"  />
                  </FormGroup>
                </Grid>
                <Grid item xs={11}>
                <Typography >Do you smoke? (Rauchen Sie?) </Typography>
                </Grid>
                <Grid item xs={1}>
                  <FormGroup>
                    <FormControlLabel onChange={(e)=>{
                    user.smoke=e.target.checked;
                    }}  control={<Switch  />} label="Ja"  />
                  </FormGroup>
                </Grid>
                <Grid item xs={11}>
                 <Typography >Do you need to go to hospital more that 2 times a year? (Müssen Sie öfter als 2 Mal im Jahr ins Krankenhaus?) </Typography>
                </Grid>
                <Grid item xs={1}>
                  <FormGroup>
                    <FormControlLabel onChange={(e)=>{
                    user.sleephospital=e.target.checked;
                    }}  control={<Switch  />} label="Ja" />
                  </FormGroup>
                </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={6}>
                <Button className={classes.buttonSu} >
                Save (Speichern)
                  </Button>      
                  </Grid>
                  <Grid item align="right"xs={6}>
                  <Button className={classes.buttonSu} onClick={notForm}>
                    Back
                  </Button>
                  </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Box style={{ margin:"0 0 1rem 0"}} item xs={12}>
              <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.icon} />}
                  >
                    <Typography>Do you want to buy a car or change your car insurance: (Möchten Sie ein Auto kaufen oder Ihre Kfz-Versicherung wechseln?) </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                  <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={9}>
                        <Typography >New Car or Second hand (Neuwagen oder Gebrauchtwagen?)?  </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <FormGroup style={{margin:"0 0 1rem 0"}} >
                          <FormControlLabel control={<Switch  />}  label="Second hand (Gebraucht)" 
                          onChange={(e)=>{
                           car.neworsecond=true;
                          }}/>
                          </FormGroup>
                        </Grid>
                        <Grid item xs={5}>
                        <Typography>Year of make (Jahr der Herstellung:):  </Typography>
                        </Grid>
                        <Grid item xs={7}>
                        <Input className={classes.select} type="date" 
                        onChange={(e)=>{
                          car.year=e.target.value;
                          }}/>
                        </Grid>
                        <Grid item xs={5}>
                        <Typography>Price (Kaufpreis):  </Typography>
                        </Grid>
                         <Grid item xs={7}>
                        <Input className={classes.select} type="string" 
                        onChange={(e)=>{
                         car.price=e.target.value;
                          }}/>
                         </Grid>
                        <Grid item xs={9}>
                        <Typography>For work (Für die Arbeit:): </Typography>
                       </Grid>
                       <Grid item xs={3}>
                        <FormGroup>
                          <FormControlLabel control={<Switch  />} label="Ja" 
                          onChange={(e)=>{
                            car.forwork=true;
                            }} />
                        </FormGroup>
                   </Grid>
                  </Grid>
                  </AccordionDetails>
               </Accordion>
                </Box>
                <Box style={{ margin:"0 0 1rem 0"}} item xs={12}>
              <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.icon} />}
                  >
                    <Typography>Do you want to Motorcycle a car or change your Motorcycle insurance
                       (Möchten Sie ein Motorrad versichern oder Ihre Motorradversicherung ändern?): </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                  <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={9}>
                        <Typography >New Motorcycle or Second hand (Neues Motorrad oder gebraucht?)?  </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <FormGroup style={{margin:"0 0 1rem 0"}} >
                          <FormControlLabel control={<Switch  />} label="Second hand (Gebraucht)"
                          onChange={(e)=>{
                            motor.neworsecond=true;
                            }} />
                          </FormGroup>
                        </Grid>
                        <Grid item xs={5}>
                        <Typography>Year of make (Jahr der Herstellung:):  </Typography>
                        </Grid>
                        <Grid item xs={7}>
                        <Input className={classes.select} type="date" 
                        onChange={(e)=>{
                            motor.year=e.target.value;
                            }}  />
                        </Grid>
                        <Grid item xs={5}>
                        <Typography>Price (Kaufpreis):  </Typography>
                        </Grid>
                         <Grid item xs={7}>
                        <Input className={classes.select} type="string" onChange={(e)=>{
                            motor.price=e.target.value;
                            }}/>
                         </Grid>
                        <Grid item xs={9}>
                        <Typography>For work (Für die Arbeit:): </Typography>
                       </Grid>
                       <Grid item xs={3}>
                        <FormGroup>
                          <FormControlLabel control={<Switch  />}  label="Ja" 
                          onChange={(e)=>{
                            motor.forwork=true;
                            }}/>
                        </FormGroup>
                   </Grid>
                  </Grid>
                  </AccordionDetails>
               </Accordion>
            </Box>
            <Box style={{ margin:"0 0 1rem 0"}} item xs={12}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.icon} />}
                  ><Typography>House (Hause): </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                  <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={5}>
                        <Typography>Year of make (Jahr der Herstellung:):  </Typography>
                        </Grid>
                        <Grid item xs={7}>
                        <Input className={classes.select} type="date"
                        onChange={(e)=>{
                            house.year=e.target.value;
                            }}/>
                        </Grid>
                        <Grid item xs={5}>
                        <Typography>Year of renovate (Jahr der Renovierung:):  </Typography>
                        </Grid>
                        <Grid item xs={7}>
                        <Input className={classes.select} type="date" 
                        onChange={(e)=>{
                          house.yearrenovate=e.target.value;
                          }}/>
                        </Grid>
                        <Grid item xs={5}>
                        <Typography>Size of house (Größe des Hauses:):  </Typography>
                        </Grid>
                         <Grid item xs={7}>
                        <Input className={classes.select} type="string"
                        onChange={(e)=>{
                          house.size=e.target.value;
                          }}/>
                         </Grid>
                      <Grid item xs={9}>
                        <Typography>Rent or bought (Mieten oder kaufen)? </Typography>
                       </Grid>
                      <Grid item xs={3}>
                        <FormGroup>
                         <FormControlLabel control={<Switch />} label="Bought(Gekauft)" onChange={(e)=>{
                            house.bought=true;
                            }} />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography>Is the house near a river or lake or see
                           (Liegt das Haus in der Nähe eines Flusses oder Sees oder eines Meeres)? </Typography>
                       </Grid>
                      <Grid item xs={3}>
                        <FormGroup>
                         <FormControlLabel control={<Switch />}  label="Ja" onChange={(e)=>{
                            house.river=true;
                            }}/>
                        </FormGroup>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography>Is the house in first or minus floor
                           (Befindet sich das Haus im Untergeschoss oder in der ersten Etage?)? </Typography>
                       </Grid>
                      <Grid item xs={3}>
                        <FormGroup>
                         <FormControlLabel control={<Switch />} label="Ja" onChange={(e)=>{
                            house.firstfloor=true;
                            }}  />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography>Does the house have big glasses (Hat das Haus große Gläser)? </Typography>
                       </Grid>
                      <Grid item xs={3}>
                        <FormGroup>
                         <FormControlLabel control={<Switch />} label="Ja" onChange={(e)=>{
                            house.glass=true;
                            }} />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography>Does the house have garden (hat das Haus einen Garten)? </Typography>
                       </Grid>
                      <Grid item xs={3}>
                        <FormGroup>
                         <FormControlLabel control={<Switch />} label="Ja" onChange={(e)=>{
                            house.garden=true;
                            }} />
                        </FormGroup>
                      </Grid>
                  </Grid>
                  </AccordionDetails>
               </Accordion>
            </Box>
            <Grid item xs={3}>
              <Typography>Pet (Haustier) ? </Typography>
             </Grid>
                <Grid item xs={9}>
               <FormGroup>
               <FormControlLabel onChange={(e)=>{
                    user.pet=e.target.checked;
                    }}  control={<Switch />} label="Ja" />
               </FormGroup>
             </Grid>
            </Grid>
              <Box/>
              <Grid container>
                <Grid item xs={6}>
                <Button className={classes.buttonSu} >
                Save (Speichern)
                  </Button>      
                  </Grid>
                  <Grid item align="right"xs={6}>
                  <Button className={classes.buttonSu} onClick={notForm}>
                    Back
                  </Button>
                  </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={5}>
               <Grid style={{marginTop:"1rem"}} container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={8}>
                 <Typography>Travel Frequency Per Year private (Reisehäufigkeit im Jahr privat:):</Typography>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                          <Slider 
                          defaultValue={0}
                          valueLabelDisplay="on"
                          step={1}
                          marks={marks}
                          min={0}
                          max={5}
                          onChangeCommitted={(event) => user.travelfreq=event.target.ariaValueNow}                          
                          >
                             </Slider>
                             
                </Grid>
                <Grid style={{marginTop:"1.75rem"}} item xs={9}>
                 <Typography>Travel Frequency Per Year for work (Reisehäufigkeit im Jahr für die Arbeit:):</Typography>
                </Grid>               
                <Grid style={{marginTop:"1.75rem"}} item xs={3}>
                          <Slider 
                          defaultValue={0}
                          valueLabelDisplay="on"
                          step={1}
                          marks={marks}
                          min={0}
                          max={5} 
                          onChangeCommitted={(event) => user.travelfreqwork=event.target.ariaValueNow}                 
                          >
                             </Slider>
                </Grid>
                <Grid item xs={5}>
                 <Typography>Travel abroud? (Auslandsreise:):</Typography>
                </Grid>
                <Grid item xs={7}>
                <FormGroup>
                    <FormControlLabel onChange={(e)=>{
                    user.abroud=e.target.checked;
                    }}  control={<Switch  />} label="Ja" />
                  </FormGroup>
                </Grid>
                <Grid item xs={5}>
                 <Typography>Horse back riding? (Reiten):</Typography>
                </Grid>
                <Grid item xs={7}>
                <FormGroup>
                    <FormControlLabel onChange={(e)=>{
                    user.horseriding=e.target.checked;
                    }}  control={<Switch  />} label="Ja" />
                  </FormGroup>
                </Grid>
                <Grid item xs={5}>
                 <Typography>Extreme Sport (Extremsport):</Typography>
                </Grid>
                <Grid item xs={7}>
                <FormGroup>
                    <FormControlLabel onChange={(e)=>{
                    user.extremsport=e.target.checked;
                    }}  control={<Switch  />} label="Ja" />
                  </FormGroup>
                </Grid>
                <Grid item xs={5}>
                 <Typography>Cooking (Kochen):</Typography>
                </Grid>
                <Grid item xs={7}>
                  <FormGroup>
                    <FormControlLabel onChange={(e)=>{
                    user.cooking=e.target.checked;
                    }}  control={<Switch  />} label="Ja"  />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{marginTop: "1rem"}}>
                <Typography style={{color: "red"}} >{`${error}`}</Typography>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                <Button className={classes.buttonSu} onClick={handleSaveFinal}>
                Submit (Speichern) Final
                  </Button>      
                  </Grid>
                  <Grid item align="right"xs={6}>
                  <Button className={classes.buttonSu} onClick={notForm}>
                    Back
                  </Button>
                  </Grid>
              </Grid>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={openDialog}> 
      <Grid align="right" >
        <CancelIcon style={{ color:"19E251" }} cursor="pointer" onClick={handleClose}/>
        </Grid>
      <Grid style={{margin:"1rem 1rem 1rem 1rem"}} >  
        <Typography>Date of birth (Geburtsdatum): 
          <Input className={classes.select} type="date" 
          onChange={(event)=>{childDate=event.target.value}}
         />
        </Typography>
        <Grid align="center">
        <Button minwidth="2rem" className={classes.buttonSu} onClick={handleChildren}>
        Submit (Speichern)
        </Button>
        </Grid>
        </Grid>
      </Dialog>
    </Box>
  );
}
const useStyles = makeStyles(() => ({
  root: {
    height: '35rem',
    width: '22rem',
    minWidth: '20rem',
    margin: '2.5rem 2.5rem 4rem',
    background:'#F1FEF2',
    boxShadow: '0px 4px 10px rgba(41, 77, 98, 0.1)',
    borderRadius: '10px',
    border:"1px solid #1D592E",
    justifyContent: 'center',
  },
  image: {
    width: '8rem',
    height: '8rem',
    top: '2rem',
  },
  tabs: {
    marginTop: '1rem',
    '& .MuiTabs-indicator': {
      display: 'none',
      justifyContent:"center",
    },
    '& .MuiButtonBase-root.MuiTab-root': {
      marginTop: '2rem',
      textTransform: 'capitalize',
    },
    '& .Mui-selected': {
    },
  },
  radio:{  
    marginLeft:"1rem",
    flexWrap: 'nowrap',
  flexDirection: 'row',
},
  button: {
    minWidth:"15rem",
    variant:"outlined",
    border:"1px solid black",
    background:"#FFFFFF"
  },
  buttonSu:{
    marginTop:"2rem",
    minWidth:"15rem",
    variant:"outlined",
    color:"#1D592E",
    border:"1px solid #19E251",
    background:"#FFFFFF"
  },
  select:{
    margin:"0 0 2rem 2rem",
    minWidth:"15rem",
  }
}));
export default RSInsurance;
