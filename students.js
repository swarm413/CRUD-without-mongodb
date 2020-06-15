var fs=require('fs');
var dbPath='./db.json'
exports.find=function(){
  fs.readFile(dbPath,'utf8',function(err,data){
    JSON.parse(data).students
  })
}
exports.save=function(student,callback){
  fs.readFile(dbPath,'utf8',function(err,data){
    if(err){
      return callback(err)
    }
    var students=JSON.parse(data).students;
    student.id=students[students.length-1].id+1;
    students.push(student)
    var fileDate=JSON.stringify({
      students:students
    })
    fs.writeFile(dbPath,fileDate,function(err){
      if(err){return callback(err)}
      callback(null)
    })
  })
}
exports.updateById=function(student,callback){
  fs.readFile(dbPath,'utf8',function(err,data){
    if(err){
      return callback(err)
    }
    var students=JSON.parse(data).students
    var stu=students.find(function(item){
      return item.id ==parseInt(student.id)
    })
    for(var key in student){stu[key]=student[key]}
       var fileData=JSON.stringify({students:students})
       fs.writeFile(dbPath,fileData,function(err){
         if(err){
           return callback(err)
         }
         callback(null)
       })
  })
}
exports.findById=function(id,callback){
  fs.readFile(dbPath,'utf8',function(err,data){
    if(err){
      return callback(err)
    }
    var students=JSON.parse(data).students
    var ret=students.find(function(item){
      return item.id==id
    })
    callback(null,ret)
  })

}
exports.deleteById=function(id,callback){
  fs.readFile(dbPath,'utf8',function(err,data){
    if(err){return callback(err)}var students=JSON.parse(data).students
    var deleteId=students.findIndex(function(item){return item.id==parseInt(id)})
    students.splice(deleteId,1)
    var fileData=JSON.stringify({students:students})
    fs.writeFile(dbPath,fileData,function(err){
      if(err){return callback(err)}callback(null)
    })
  })
}

/*function(id,callback){
  fs.readFile(dbPath,'utf8',function(err,data){
    if(err){return callback(err)}var students=JSON.parse(data).sutdents;//我说怎么找半天找不到哪出错了，原来students打成sutdents了
    var deleteId=students.findIndex(function(item){
      return item.id==parseInt(id)
    })
    var fileDate=student.splice(deleteId,1)//另外这也错了，splice方法是直接返回到原来的数组，fileDate应当是JSON对象。因为还需要重新写入
    fs.writeFile(dbPath,fileDate,function(err){
      if(err){return callback(err)}
      callback(null)
    })
  })}*/
