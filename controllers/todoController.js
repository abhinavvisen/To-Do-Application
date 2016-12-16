var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database

mongoose.connect('mongodb://test:test@ds133358.mlab.com:33358/todo');
var todoSchema = new mongoose.Schema({
  item:String
});

var Todo = mongoose.model('Todo',todoSchema);


var urlencodedParser = bodyParser.urlencoded({ extended: false });

//var data= [{item:'get milk'},{item:'walk dog'},{item:'kick some coding ass'}];


module.exports = function(app){

  app.get('/todo',function(req,res){
    Todo.find({},function(err,data){

      if(err) throw err;
      res.render('todo',{todos:data});
    });

  });
  app.post('/todo',urlencodedParser,function(req,res){
    var newTodo = Todo(req.body).save(function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

  app.delete('/todo/:item',function(req,res){

    Todo.find({item:req.params.item.replace(/\-/g,"")}).remove(function(err,data){
      if(err) throw err;
        res.json(data);
    });

  });
}
