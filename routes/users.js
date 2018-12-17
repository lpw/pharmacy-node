var express= require("express");
var router = express.Router();
const fs = require('fs');
const async = require('async');
let rawdata = fs.readFileSync('medicine.json');  
let medData = JSON.parse(rawdata);
var flatten = require('array-flatten')

let writeDat = async function(data){
    return await fs.writeFileSync('medicine.json', data);
}

let deletedata = function(data, id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = data.findIndex(x => x.id == id);
          data.splice(index, 1);
        data = JSON.stringify(data, null, 2); 
            resolve();
        }, 1000);
    });
}

router.get('/',function(req,res){
    var arry =  [1, 2, [3, 4]];
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    let aa= arry.reduce((acc, val) => acc.concat(val), []);
    return res.json({success:true, results: aa}) ;
});

router.post('/create',function(req,res){
    let medicin = { id: "", name : req.body.name, price : req.body.price, type: req.body.type, manufacturer: req.body.manufacturer,
    expiration_date: req.body.expiration_date , batch_no: req.body.batch_no};
    let medlen =  medData.medicines.length;
    let currentID = parseInt(medData.medicines[medlen - 1].id) + 1;
        medicin.id = currentID;
        medData.medicines.push(medicin);

    let data = JSON.stringify(medData, null, 2);    
    fs.writeFileSync('medicine.json', data); 
    return res.json({success:true, message:'Record added successfully.'})
});

router.put('/update/:id',function(req,res){
    let medicn = { id: req.body.id, name : req.body.name, price : req.body.price, type: req.body.type, manufacturer: req.body.manufacturer,
    expiration_date: req.body.expiration_date , batch_no: req.body.batch_no};
     let medobj = medData.medicines.find(x => x.id == req.body.id);
     let index = medData.medicines.indexOf(medobj);
     medData.medicines[index] = medicn;
    let data = JSON.stringify(medData, null, 2);    
    fs.writeFileSync('medicine.json', data);  
    return res.json({success:true, message:'Record updated successfully.'})
});

router.delete('/delete/:id',function(req,res, next){
    //let medobj = medData.medicines.find(x => x.id == req.params.id);
    //const index = medData.medicines.indexOf(medobj);
    try {
        const index = medData.medicines.findIndex(x => x.id == req.body.id);
        medData.medicines.splice(index, 1);
        let data = JSON.stringify(medData, null, 2);  
        console.log("index", index);
        console.log(medData);  
        //fs.writeFileSync('medicine.json', data);
        writeDat(data);
        return res.json({success:true, message:'Record deleted successfully.'})
    } catch (error)
    {
        return next(error);
    }
});

module.exports = router;
