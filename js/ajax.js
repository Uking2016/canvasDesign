// JavaScript Document
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
