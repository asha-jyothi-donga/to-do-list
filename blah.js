//Hare Krishna __/\__

//get todays date
var today=new Date();
var dd=String(today.getDate()).padStart(2,'0');
var mm=String(today.getMonth()+1).padStart(2,'0');
var yyyy=today.getFullYear();
var week=today.getDay();
var dy=new Array(7);
dy[0]='Sunday';    dy[2]='Tuesday';  dy[3]='Wednesday';
dy[4]='Thursday';  dy[1]='Monday';      dy[5]='Friday';  dy[7]='Saturday';
today=dy[week]+' '+dd+'-'+mm+'-'+yyyy;
document.getElementById("dated").innerHTML=today;
var localStorage=window.localStorage;
//create the array of list

var todo=[];
if(localStorage.getItem('addedTodo')) 
  todo=JSON.parse(localStorage.getItem('addedTodo'));

var noTasks=todo.length;

var done=[];
if(localStorage.getItem('wchDone'))
  done=JSON.parse(localStorage.getItem('wchDone'));

var compl=done.length;
updateList();
var input = document.getElementById("pleaseAdd");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("plus").click();
  }
});

function plusfun()
{
   var p=document.getElementById("pleaseAdd").value;
   if(p.length==0)
   return;
  todo.push({whatDo:p, currTime:new Date()});
  localStorage.setItem('addedTodo',JSON.stringify(todo));
  noTasks++;
  updateList();
  
  document.getElementById("pleaseAdd").value="";
}
function updateList()
{
   var text='<ul class="list-group" style=" background-color: #5cdb95;" >';
   if(todo.length==0 && done.length==0)    
    document.getElementById("specifyT").innerHTML='Add tasks to your List....Your List is Empty :(' ;
   
   for(var i=0;i<todo.length;i++)
   { //console.log(todo[i]);
     if(todo[i]!=undefined)
     {text+='<li class="list-group-item" style=" background-color: #5cdb95; color:  #05386b;">';
     
       text+='<button type="button"  class="float-right  btn btn-danger mr-1" onclick="dele1(' + i+')"><i class="fas fa-trash-alt"></i></button>';
      
       text+='<button type="button" class="float-left  btn btn-success" onclick="itsdone(' +i+ ')"><i class="fas fa-check-circle"></i></button>';
       text+=' <div class="d-inline px-5 font-weight-bolder" style="font-color:#05386b;">'+todo[i].whatDo+'<span class="badge badge-light float-right" style="margin-right:2em; " >'+timediff(i)+' ago </span></div>';
    
         text+='</li>';     
    }
   }
   for(var i=done.length-1;i>=0;i--)
   {  if(done[i]!=undefined)
     text+='<li class="list-group-item" style=" background-color: #5cdb95; color:  #05386b;">';
    text+='<button type="button" class="float-right  btn btn-danger mr-1" onclick="dele2(' + i+ ')"><i class="fas fa-trash-alt"></i></button>';
    text+='<button type="button" type="button" class="float-left disabled btn btn-success" ><i class="fas fa-check-circle"></i></button>';
    text+=' <div class="d-inline px-5 font-weight-bolder" style="font-color:#05386b;"><s>'+done[i].whatDo+'</s>'+
    '<span class="badge badge-light float-right" style="margin-right:2em; " > completed '+ calc(i)+' ago </span></div>';
    text+='</li>'; 
   }
   text+='</ul>';
   document.getElementById("visibleList").innerHTML=text;
   document.getElementById("specifyT").innerHTML='You have '+noTasks+' tasks to complete..You have completed  '+compl+' tasks';
}

function timediff(k)
{
  var now=moment();
  var start=moment(todo[k].currTime);
  var diff=moment.duration(now.diff(start)).humanize();
  return diff;
}
function dele1(k)
{ if(k>-1) 
  { todo.splice(k,1); 
    localStorage.setItem('addedTodo',JSON.stringify(todo));
    noTasks--;
   updateList();}
  return;
}
function dele2(k)
{ if(k>-1) 
  { done.splice(k,1); 
    localStorage.setItem('wchDone',JSON.stringify(done));
    compl--;
   updateList();}
  return;
}
function itsdone(k)
{  if(k>-1)
   { 
   done.push({"whatDo":todo[k].whatDo, currTime:new Date()});
   localStorage.setItem('wchDone',JSON.stringify(done));
   todo.splice(k,1);
   localStorage.setItem('addedTodo',JSON.stringify(todo));
   noTasks--;
   compl++;
   updateList();
   }
}
function calc(k)
{
  var now=moment();
  var start=moment(done[k].currTime);
  var diff=moment.duration(now.diff(start)).humanize();
  return diff;
}