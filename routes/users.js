var express= require("express");
var router = express.Router();
const fs = require('fs');
let rawdata = fs.readFileSync('medicine.json');  
let medData = JSON.parse(rawdata);

router.get('/',function(req,res){
    return res.json({success:true, results:medData}) ;
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

router.delete('/delete/:id',function(req,res){
    let medobj = medData.medicines.find(x => x.id == req.body.id);
    const index = medData.medicines.indexOf(medobj);
    medData.medicines.splice(index, 1);
    let data = JSON.stringify(medData, null, 2);    
    fs.writeFileSync('medicine.json', data);
    return res.json({success:true, message:'Record deleted successfully.'})
});

module.exports = router;
