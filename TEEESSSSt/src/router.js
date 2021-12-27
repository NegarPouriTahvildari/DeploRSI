let dbConfig=require("./server/appserver");
let express = require('express');
router = express.Router();

router.get(`/getUser`, (req, res) => {
    let getUser = (dataToSeach, callback) => {
        let sqlQueryGetUser = `SELECT * FROM user WHERE (id = ${dataToSeach.id})`;
        console.log(sqlQueryGetUser);
        dbConfig.getDB().query(sqlQueryGetUser, callback);
    };
});
router.post(`/addUser`, (req, res) => {
    let addUser = (dataToAdd, callback) => {
        let sqlQueryInsertUser = `INSERT INTO user (bday,drivinglicense,income, family,childbday, diabetic,dentist,glass,neuropathy,smoke,sleephospital,pet,travelfreq,travelpurpose,extremsport,cooking,horseriding) VALUES ("${dataToAdd.bday}","${dataToAdd.drivinglicense}","${dataToAdd.income}", "${dataToAdd.family}", "${dataToAdd.childbday}","${dataToAdd.diabetic}","${dataToAdd.dentist}","${dataToAdd.glass}","${dataToAdd.neuropathy}","${dataToAdd.smoke}","${dataToAdd.sleephospital}","${dataToAdd.pet}","${dataToAdd.travelfreq}","${dataToAdd.travelpurpose}","${dataToAdd.extremsport}","${dataToAdd.cooking}","${dataToAdd.horseriding}")`;
        console.log(sqlQueryInsertUser);
        dbConfig.getDB().query(sqlQueryInsertUser, callback);
}});
router.get(`/getUserId`, (dataToSeach, res) => {
    let sqlQuerySelectUserId= `SELECT id FROM user  WHERE (bday = "${dataToSeach.bday}" and drivinglicense="${dataToSeach.drivinglicense}" and income ="${dataToSeach.income}")and family ="${dataToSeach.family}")and childbday ="${dataToSeach.childbday}"and diabetic ="${dataToSeach.diabetic}"and dentist ="${dataToSeach.dentist}"and glass ="${dataToSeach.glass}"and neuropathy ="${dataToSeach.neuropathy}"and smoke ="${dataToSeach.smoke}"and sleephospital ="${dataToSeach.sleephospital}"and pet ="${dataToSeach.pet}"and travelfreq ="${dataToSeach.travelfreq}"and travelpurpose ="${dataToSeach.travelpurpose}"and extremsport ="${dataToSeach.extremsport}"and cooking ="${dataToSeach.cooking}"and horseriding ="${dataToSeach.horseriding}")`;
    console.log(sqlQuerySelectUserId);
    dbConfig.getDB().query(sqlQuerySelectUserId, callback);    
});
router.post(`/addJob`, (req, res) => {
    getUserId(dataToAdd, (err, results) => {
        let userid=results[0].id;
        let data={
            "userid":userid,
            "jobid":dataToAdd.jobid,
        }
    let addJob = (dataToAdd, callback) => {
        let sqlQueryInsertUserJob = `INSERT INTO userjob (userid,jobid) VALUES ("${dataToAdd.userid}","${dataToAdd.jobid}")`;
        console.log(sqlQueryInsertUserJob);
        dbConfig.getDB().query(sqlQueryInsertUserJob, callback);
    }});
});
//car
router.post(`/addUserCar`, (req, res) => {
    let userid,carid;
    getUserId(dataToAdd, (err, results) => {
        userid=results[0].id;
    });
    getCarId(dataToAdd, (err, results) => {
        carid=results[0].id;
    });
    let data={
            "userid":userid,
            "carid":carid,
    };   
    let addUserCar = (dataToAdd, callback) => {
        let sqlQueryInsertUserCar = `INSERT INTO usercar (userid,carid) VALUES ("${data.userid}","${data.carid}")`;
        console.log(sqlQueryInsertUserCar);
        dbConfig.getDB().query(sqlQueryInsertUserCar, callback);
    };
});
router.post(`/addCar`, (req, res) => {
let addCar = (dataToAdd, callback) => {
    let sqlQueryInsertCar = `INSERT INTO car (neworsecond, year,price,forwork) VALUES (?,?,?,?)`;
    let values = [dataToAdd.neworsecond, dataToAdd.year,dataToAdd.price,dataToAdd.forwork];
    console.log(sqlQueryInsertCar);
    dbConfig.getDB().query(sqlQueryInsertCar, values, callback);
};
});
router.get(`/getCarId`, (req, res) => {
let getCarId = (dataToAdd, callback) => {
    let sqlQueryGetCarId = `SELECT id FROM car WHERE neworsecond=? AND year=? AND price=?AND forwork=?ORDER BY id DESC`;
    console.log(sqlQueryGetCarId);
    let values = [dataToAdd.neworsecond, dataToAdd.year,dataToAdd.price,dataToAdd.forwork];
    dbConfig.getDB().query(sqlQueryGetCarId, values, callback);
};
});
//Motor
router.post(`/addMotor`, (req, res) => {
    let addMotor = (dataToAdd, callback) => {
        let sqlQueryInsertMotor = `INSERT INTO motorcycle (neworsecond, year,price,forwork) VALUES (?,?,?,?)`;
        let values = [dataToAdd.neworsecond, dataToAdd.year,dataToAdd.price,dataToAdd.forwork];
        console.log(sqlQueryInsertMotor);
        dbConfig.getDB().query(sqlQueryInsertMotor, values, callback);
    };
});
    router.get(`/getMotorId`, (req, res) => {
    let getMotorId = (dataToAdd, callback) => {
        let sqlQueryGetMotorId = `SELECT id FROM motorcycle WHERE neworsecond=? AND year=? AND price=?AND forwork=?ORDER BY id DESC`;
        console.log(sqlQueryGetMotorId);
        let values = [dataToAdd.neworsecond, dataToAdd.year,dataToAdd.price,dataToAdd.forwork];
        dbConfig.getDB().query(sqlQueryGetMotorId, values, callback);
    };
});

router.post(`/addUserMotor`, (req, res) => {
    let userid,motorid;
    getUserId(dataToAdd, (err, results) => {
        userid=results[0].id;
    });
    getMotorId(dataToAdd, (err, results) => {
        motorid=results[0].id;
    });
    let data={
            "userid":userid,
            "motorid":motorid,
    };   
    let addUserMotor = (dataToAdd, callback) => {
        let sqlQueryInsertUserMotor = `INSERT INTO usermotor (userid,carid) VALUES ("${data.userid}","${data.motorid}")`;
        console.log(sqlQueryInsertUserMotor);
        dbConfig.getDB().query(sqlQueryInsertUserMotor, callback);
    };
});
//house
router.post(`/addHouse`, (req, res) => {
    let addHouse = (dataToAdd, callback) => {
        let sqlQueryInsertHause = `INSERT INTO hause (year, yearrenovate,size,bought,river,firstfloor,glass,garden) VALUES (?,?,?,?,?,?,?,?)`;
        let values = [dataToAdd.year, dataToAdd.yearrenovate,dataToAdd.size,dataToAdd.bought,dataToAdd.river,dataToAdd.firstfloor,dataToAdd.glass,dataToAdd.garden];
        console.log(sqlQueryInsertHause);
        dbConfig.getDB().query(sqlQueryInsertHause, values, callback);
    };
});
    router.get(`/getHauseId`, (req, res) => {
    let getHauseId = (dataToAdd, callback) => {
        let sqlQueryGetHauseId = `SELECT id FROM hause WHERE year=?, yearrenovate=?,size=?,bought=?,river=?,firstfloor=?,glass=?,garden=? ORDER BY id DESC`;
        console.log(sqlQueryGetHauseId);
        let values = [dataToAdd.year, dataToAdd.yearrenovate,dataToAdd.size,dataToAdd.bought,dataToAdd.river,dataToAdd.firstfloor,dataToAdd.glass,dataToAdd.garden];
        dbConfig.getDB().query(sqlQueryGetHauseId, values, callback);
    };
});

router.post(`/addUserHause`, (req, res) => {
    let userid,houseid;
    getUserId(dataToAdd, (err, results) => {
        userid=results[0].id;
    });
    getHouseId(dataToAdd, (err, results) => {
        hauseid=results[0].id;
    });
    let data={
            "userid":userid,
            "hauseid":hauseid,
    };   
    let addUserHause = (dataToAdd, callback) => {
        let sqlQueryInsertUserHause = `INSERT INTO userhause (userid,carid) VALUES ("${data.userid}","${data.hauseid}")`;
        console.log(sqlQueryInsertUserHause);
        dbConfig.getDB().query(sqlQueryInsertUserHause, callback);
    };
});

//----
module.exports=router;
/*module.exports = {
    addUser: addUser,
    getUserId:getUserId,
    addJob:addJob,
    addUserCar:addUserCar,
    addCar:addCar,
    getCarId:getCarId,
    addUserCar:addUserCar,
    addMotor:addMotor,
    getMotorId:getMotorId,
    addUserMotor:addUserMotor,
    addHouse:addHouse,
    getHauseId:getHauseId,
    addUserHause:addUserHause,
    getUser:getUser,
};
*/