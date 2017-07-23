//这里是控制内容显示位置
var eventUtil={
target:this.srcElement||this.target,
addHandler:function(ele,type,func){
		   if(ele.addEventListener){
			   ele.addEventListener(type,func,false);   
		   }else{
			   ele.attachEvent("on"+type,func);	
		   }
	   }	   
}
window.onresize=set;
window.onload=set;
function delRow(str,rowNum){
  	var div=document.createElement("div");
	div.className="alert";
	div.style.width=window.screen.width+"px";
	div.style.height=window.screen.height+"px";
	div.innerHTML="<div class=\"alertInner\"><div class=\"alertHeader\"><\/div><div class=\"innerText\"><span class=\"alertText\">"+str+"<\/span><input class=\"alertForSure\"    type=\"button\" value=\"确定\"><input class=\"alertForCancel\" type=\"button\" value=\"取消\"><\/div><\/div>";
	document.body.appendChild(div);	 
	eventUtil.addHandler(div,"click",function(event){
	     var tar=event.target||event.srcElement; 
		 var flag;
		 var clsName=tar.className;		
		 switch(clsName){
		   case "alertForSure":document.body.removeChild(div);tbody.removeChild(rowNum);break;
		   case "alertForCancel":document.body.removeChild(div);break;
		 }
	});	
 }
function changeRow(rowNum){	
   	var div=document.createElement("div");
	div.className="changeAlert";
	div.style.width=window.screen.width+"px";
	div.style.height=window.screen.height+"px";
	var row=tbl.rows[rowNum];
	var inputHTML="";
	for(var i=0;i<row.cells.length-2;i++){
	   inputHTML+="<span class=\"changRowInputName\">"+"当前列的名字:"+"<\/span><input type=\"text\" class=\"changRowText\">";
	   inputHTML+="<span class=\"changRowInputName\">"+"这是模拟的:"+"<\/span><input type=\"text\" class=\"changRowText\">";
	}
	
	div.innerHTML="<div class=\"changeInner\"><div class=\"alertHeader\"><\/div><div class=\"innerText\">"+inputHTML+"<input class=\"alertForSure\" type=\"button\" value=\"确定\"><input class=\"alertForCancel\" type=\"button\" value=\"取消\"><\/div><\/div>";
	document.body.appendChild(div);	
   	eventUtil.addHandler(div,"click",function(event){
	     var tar=event.target||event.srcElement; 
		 var flag;
		 var clsName=tar.className;		
		 switch(clsName){
		   case "alertForSure":document.body.removeChild(div);tbody.removeChild(rowNum);break;
		   case "alertForCancel":document.body.removeChild(div);break;
		 }
	});
}
var contentListChildren=document.getElementById("contentList").children;
var insert=document.getElementById("insert");
var uploadButton=document.getElementById("uploadButton");
var uploadExcel=document.getElementById("uploadExcel");

eventUtil.addHandler(contentListChildren[0],"click",function(event){											
    var contentboxs=document.getElementsByClassName("contentbox");
	for(var i=0;i<contentboxs.length;i++){
	  contentboxs[i].style.display="none";	
	}
	contentboxs[0].style.display="block";
});
eventUtil.addHandler(contentListChildren[1],"click",function(event){											
    var contentboxs=document.getElementsByClassName("contentbox");
	for(var i=0;i<contentboxs.length;i++){
	  contentboxs[i].style.display="none";	
	}
	contentboxs[1].style.display="block";
});
eventUtil.addHandler(contentListChildren[2],"click",function(event){											
    var contentboxs=document.getElementsByClassName("contentbox");
	for(var i=0;i<contentboxs.length;i++){
	  contentboxs[i].style.display="none";	
	}
	contentboxs[2].style.display="block";
});

eventUtil.addHandler(uploadButton,"click",function(){
   	 uploadExcel.click();											   
});
function set(){//用来调整·id是content的div盒子的左边距！！在加载和改变窗口大小时触发
   var content=document.getElementById("content");	
   var w=document.documentElement.clientWidth;
   var contentWidth=content.offsetWidth;
   content.style.left=(w-contentWidth)/2+"px";
}




var searchText=document.getElementById("searchText");
var searchButton=document.getElementById("searchButton");
eventUtil.addHandler(searchButton,"click",function(event){
  var value=searchText.value;
  ajax("",value,jsonAddTable);	//!!!嘉铭！！！第一个参数是你的php文件名,我发送给你的是用户在搜索框输入的内容										   
});
var content=document.getElementById("content");
eventUtil.addHandler(content,"click",function(event){
   var tar=event.target||event.srcElement;
   var clsName=tar.className;
   switch(clsName){
	 case "del":delRow("确定要删除吗？",tar.parentNode.parentNode);break;
	 case "change":changeRow(tar.index);break;
  }
});
jsonAddTable();
function jsonAddTable(){//用返回的json数据填充table,你要返回一个json数组给我
//var jsonToObject=xhr.responseText;
//下面注释的我用来测试的
var jsonToObject=[{
	 name:"a",
	 age:18,
	 event:"nothing",
	 	 name:"a",
	 age:18,
	 event:"nothing",
	 	 name:"a",
	 age:18,
	 event:"nothing",
	 	 name:"a",
	 age:18,
	 event:"nothing"
	 },{
	 name:"a",
	 age:18,
	 event:"nothing",
	 	 name:"a",
	 age:18,
	 event:"nothing",
	 	 name:"a",
	 age:18,
	 event:"nothing"
	 }];

 var tbl=document.getElementById("tbl");
 var tbody=document.getElementById("tbody");
for(var i=0;i<jsonToObject.length;i++){
	
	var value=jsonToObject[i];
	
	tbody.insertRow(i);
	j=0;
 	for(var attr in value){
	   	tbody.rows[i].insertCell(j);	
		tbody.rows[i].cells[j].appendChild(document.createTextNode(value[attr]));
		j++;
	}
	var del=document.createElement("input");
	del.index=i;
	del.type="button";
	del.value="删除";
	del.className="del";
	var change=document.createElement("input");
	change.type="button";
	change.value="修改";
	change.className="change";
	tbody.rows[i].insertCell(j);
	tbody.rows[i].cells[j].appendChild(del);
	j++;
	change.index=i;
	tbody.rows[i].insertCell(j);
	tbody.rows[i].cells[j].appendChild(change);
} 
tbl.style.border="1px solid";


}


function ajax(url,str,func){//发送异步请求
  var xhr=createXHR();	
  xhr.open("post",url,true);
  xhr.onreadystatechange=function(){
	if(xhr.readyState==4 && xhr.status==200){
	   func(xhr);
	}  
  }
  xhr.send(str);
}

function createXHR(){//创建XHR对象
  if(typeof XMLHttpRequest !="undefined"){
	  return new XMLHttpRequest();  
  }else if(typeof ActiveXObject !="undefined"){
	  if(typeof arguments.callee.activeXString!="string"){
		 var versions=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"];  
		 var i,len=versions.length;
		 for(i=0;i<len;i++){
		    try{
			  new ActiveXObjext(versions[i]);
			  arguments.callee.activeXString=versions[i];
			  break;
			}catch(ex){}
		 }
	  }  
	  return new ActiveXObject(arguments.callee.activeXString);
  }else{
	  throw new Error("no XHR object available");  
  }
}
