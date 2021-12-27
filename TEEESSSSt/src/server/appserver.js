const express = require("express");
const app = express();
const mysql=require("mysql2");
let bodyParser = require('body-parser');
const cors=require("cors");
const { json } = require("body-parser");

const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"rsinsurance",
});

/*const connection=mysql.createConnection({
    host:"api.aydablue.com",
    user:"root",
    password:"",
    database:"rsinsurance",
});*/

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post("/addUser",(req,res)=>{
    const dataToAdd=req.body.dataToAdd;
    let sqlQuery = `INSERT INTO user (bday,drivinglicense,jobid,income, family, diabetic,dentist,glass,neuropathy,smoke,sleephospital,pet,horseriding,extremsport,cooking,travelfreq,abroud,travelfreqwork) VALUES ("${dataToAdd.bday}","${dataToAdd.drivinglicense}","${dataToAdd.jobid}","${dataToAdd.income}", "${dataToAdd.family}","${dataToAdd.diabetic}","${dataToAdd.dentist}","${dataToAdd.glass}","${dataToAdd.neuropathy}","${dataToAdd.smoke}","${dataToAdd.sleephospital}","${dataToAdd.pet}","${dataToAdd.horseriding}","${dataToAdd.extremsport}","${dataToAdd.cooking}","${dataToAdd.travelfreq}","${dataToAdd.abroud}","${dataToAdd.travelfreqwork}");`;

    connection.query(sqlQuery,(err,result)=>{
    });
    connection.query("SELECT LAST_INSERT_ID() as 'id';",(err,result)=>{
        res.send(result);
    });    
});

app.post(`/addUserChild`, (req, res) => {
    const dataToAdd=req.body.dataToAdd;  
        let sqlQueryInsertUserchild = `INSERT INTO userchildren (userid,childbday) VALUES ("${dataToAdd.userid}","${dataToAdd.childbday}")`;      
        connection.query(sqlQueryInsertUserchild,(err,result)=>{
        });
});
app.post(`/addCar`, (req, res) => {
    const dataToAdd=req.body.dataToAdd;
    let sqlQueryInsertCar = `INSERT INTO car (neworsecond, year,price,forwork) VALUES (?,?,?,?)`;
    let values = [dataToAdd.neworsecond, dataToAdd.year,dataToAdd.price,dataToAdd.forwork];
    connection.query(sqlQueryInsertCar, values,(err,result)=>{
    });
    connection.query("SELECT LAST_INSERT_ID() as 'id';",(err,result)=>{
        res.send(result);
    });
});

app.post(`/addUserCar`, (req, res) => {
    const dataToAdd=req.body.dataToAdd;  
        let sqlQueryInsertUserCar = `INSERT INTO usercar (userid,carid) VALUES ("${dataToAdd.userid}","${dataToAdd.carid}")`;   
        connection.query(sqlQueryInsertUserCar,(err,result)=>{      
        });
});

app.post(`/addUserResult`, (req, res) => {
    const dataToAdd=req.body.dataToAdd;  
        let sqlQueryInsertUserCar = `INSERT INTO userresult (userid,insuranceid) VALUES ("${dataToAdd.userid}","${dataToAdd.insuranceid}")`;   
        connection.query(sqlQueryInsertUserCar,(err,result)=>{  
        });
});
app.post(`/addMotor`, (req, res) => {
    const dataToAdd=req.body.dataToAdd;
        let sqlQueryInsertMotor = `INSERT INTO motorcycle (neworsecond, year,price,forwork) VALUES (?,?,?,?)`;
        let values = [dataToAdd.neworsecond, dataToAdd.year,dataToAdd.price,dataToAdd.forwork];
        connection.query(sqlQueryInsertMotor, values,(err,result)=>{
        });
        connection.query("SELECT LAST_INSERT_ID() as 'id';",(err,result)=>{
            res.send(result);
        });
});
app.post(`/addUserMotor`, (req, res) => {
    const dataToAdd=req.body.dataToAdd;  
        let sqlQueryInsertUserMotor = `INSERT INTO usermotor (userid,motorid) VALUES ("${dataToAdd.userid}","${dataToAdd.motorid}")`;
        connection.query(sqlQueryInsertUserMotor,(err,result)=>{
        });
});
app.post(`/addHouse`, (req, res) => {
    const dataToAdd=req.body.dataToAdd;
        let sqlQueryInsertHause = `INSERT INTO house (year, yearrenovate,size,bought,river,firstfloor,glass,garden) VALUES (?,?,?,?,?,?,?,?)`;
        let values = [dataToAdd.year, dataToAdd.yearrenovate,dataToAdd.size,dataToAdd.bought,dataToAdd.river,dataToAdd.firstfloor,dataToAdd.glass,dataToAdd.garden];
        connection.query(sqlQueryInsertHause, values, (err,result)=>{
        });
        connection.query("SELECT LAST_INSERT_ID() as 'id';",(err,result)=>{
            res.send(result);
        });
});
app.post(`/addUserHouse`, (req, res) => {
    const dataToAdd=req.body.dataToAdd;  
        let sqlQueryInsertUserHause = `INSERT INTO userhouse (userid,houseid) VALUES ("${dataToAdd.userid}","${dataToAdd.houseid}")`;
        connection.query(sqlQueryInsertUserHause,(err,result)=>{
        });
});
app.post(`/addUserInsurance`, (req, res) => {
    const dataToAdd=req.body.dataToAdd;  
        let query = `INSERT INTO userinsurance (userid,insuranceid,rate,haveinsurance,consider,raterelevant,suggestion,random) VALUES ("${dataToAdd.userid}","${dataToAdd.insuranceid}","${dataToAdd.rate}","${dataToAdd.haveinsurance}","${dataToAdd.consider}","${dataToAdd.raterelevant}","${dataToAdd.suggestion}","${dataToAdd.random}")`;
        connection.query(query,(err,result)=>{
        });
});
app.post(`/addUserQ`, (req, res) => {
    const dataToAdd=req.body.dataToAdd;  
        let query = `INSERT INTO userquestions (userid,q1answer,q2answer,q3answer,q4answer) VALUES ("${dataToAdd.userid}","${dataToAdd.q1}","${dataToAdd.q2}","${dataToAdd.q3}","${dataToAdd.q4}")`;
        connection.query(query,(err,result)=>{
        });
});

app.get(`/getInsurance`, (req, res) => {
    const dataToSeach=JSON.parse(req.query.dataToSeach);
    let getquery = `SELECT name as name, nameeng as nameeng  FROM insurance where id="${dataToSeach}"`;
    connection.query(getquery, (err,result)=>{
        const js = JSON.stringify(result);
          res.send(js);
    })
});
app.get(`/getInsurances`, (req, res) => {
    let getquery = `SELECT *  FROM insurance`;
    connection.query(getquery, (err,result)=>{
        const js = JSON.stringify(result);
          res.send(js);
    })
});
app.get(`/getUserId`, (req, res) => {
    const dataToSeach=JSON.parse(req.query.dataToSeach);
    let sqlQuerySelectUserId= `SELECT id FROM user  WHERE (bday = "${dataToSeach.bday}" and drivinglicense="${dataToSeach.drivinglicense}" and jobid="${dataToSeach.jobid}"and income ="${dataToSeach.income}"and family ="${dataToSeach.family}"and diabetic ="${dataToSeach.diabetic}"and dentist ="${dataToSeach.dentist}"and glass ="${dataToSeach.glass}"and neuropathy ="${dataToSeach.neuropathy}"and smoke ="${dataToSeach.smoke}"and sleephospital ="${dataToSeach.sleephospital}"and pet ="${dataToSeach.pet}"and horseriding ="${dataToSeach.horseriding}"and extremsport ="${dataToSeach.extremsport}"and cooking ="${dataToSeach.cooking}"and travelfreq ="${dataToSeach.travelfreq}"and abroud ="${dataToSeach.abroud}"and travelfreqwork ="${dataToSeach.travelfreqwork}")`;
    connection.query(sqlQuerySelectUserId,(err,result)=>{
        res.send(result);
  })   
});
app.get(`/getUserIdLast`, (req, res) => {
    let sqlQuerySelectUserId= `SELECT id FROM user order BY id DESC LIMIT 1`;
    connection.query(sqlQuerySelectUserId,(err,result)=>{
        res.send(result);
  })   
});

app.listen(process.env.PORT || PORT, () => {
  console.log("running SERVER");
});

connection.connect(err=>{
    if(err){
        throw err
    }
    console.log("connected");
  
});

