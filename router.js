var fs=require("fs");
var express=require('express');
var Student=require('./students.js')
var router=express.Router();
router.get('/students',function(req,res){
  fs.readFile("./db.json",'utf8',function(err,data){
    if(err){
      return res.status(500).send('Server Error!')
    }
    var students=JSON.parse(data).students;
    res.render('index.html',{students:students})
})
});
router.get('/students/new',function(req,res){res.render("new.html")
})
router.post('/students/new',function(req,res){
  var student=req.body;Student.save(student,function(err){
    if(err){return res.status(500).send('Server Error!')}
      res.redirect('/students');
  })
})
router.get('/students/edit',function(req,res){
  var id=parseInt(req.query.id);
 Student.findById(id,function(err,student){
   if(err){return res.status(500).send('Server error')}
  res.render('edit.html',{
    student:student
  })
})
})
router.post('/students/edit',function(req,res){Student.updateById(req.body,function(err){
  if(err){
    return res.status(500).sent('Server error.')
  }
  res.redirect('/students')
})
})

router.get('/students/delete',function(req,res){
  var id=req.query.id;
  Student.deleteById(id,function(err){
    if(err){return res.status(500).send('Server error')}
    res.redirect('/students')
  })
})
module.exports=router;
