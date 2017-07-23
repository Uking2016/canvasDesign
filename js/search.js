// JavaScript Document
window.onload=set;
window.resize=set;
function set(){
  var searchDiv=document.getElementById("search");
  var width=document.documentElement.clientWidth||document.body.clientWidth;
  var height=document.documentElement.clientWidth||document.body.clientHeight;
  searchDiv.style.left=(width-searchDiv.offsetWidth)/2+"px";
  
  
  var content=document.getElementById("content");
  content.style.left=(width-content.offsetWidth)/2+"px";
  
}


var eventUtil={
  addHandler:function(ele,type,func){
    if(ele.addEventListener){
	  return ele.addEventListener(type,func);
	}else if(ele.attachEvent){
	  return ele.attachEvent("on"+type,func);
	}
  }
};
var searchClick=document.getElementById("searchClick");

eventUtil.addHandler(searchClick,"click",function(event){
  // ajax("",null,addTableContent);//php文件名！！！！这里搜索完之后要显示商品信息？？？
  addTableContent();
});
addTableContent();
function addTableContent(){
  var tbl=document.getElementById("tbl");
  var tb=document.getElementById("tb");
 
  //var data=xhr.responseText;
  var data=[{
    name:"af",
	aame:"af",
	bame:"fa",
	came:"af",
	dame:"af",
	age:18
  },{
    name:"af",
	aame:"af",
	bame:"fa",
	came:"af",
	dame:"af",
	age:18
 }];
 
  for(var i=0;i<data.length;i++){
     var value=data[i];
	 tb.insertRow(i);
	 var j=0;
	 for(var attr in value){
	    tb.rows[i].insertCell(j);
		tb.rows[i].cells[j].appendChild(document.createTextNode(value[attr]));
		j++;
	 }
  }
  
}
  