// JavaScript Document

window.onresize=set;
window.onload=set;
function set(){
	var w=document.documentElement.clientWidth;
	var left=(w-1000)/2+"px";
	document.getElementById("content").style.left=left;
	var searchDiv=document.getElementById("searchDiv");
	searchDiv.style.position="absolute";
	searchDiv.style.left=left;
	var inputDiv=document.getElementById("inputDiv");
	inputDiv.style.right=left;
	var logoDiv=document.getElementById("logoDiv");
	logoDiv.style.position="absolute";
	logoDiv.style.left=left;
	
	var headL=document.getElementById("left");
	var headR=document.getElementById("right");
	headL.style.left=left;
	headR.style.right=left;
}
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


function byClass(str){
	var eles=document.getElementsByTagName("*");
	var res=[];
    for(var i=0;i<eles.length;i++){
		if(eles[i].className===str){
			res.push(eles[i]);
		}
    }
    return res;
}
if(!document.getElementsByClassName){
	document.getElementsByClassName=byClass;
}

var sortLi=document.getElementById("sortLi");
eventUtil.addHandler(sortLi,"click",function(){
	var updownImg=sortLi.children[0];
	if(updownImg.src.match("xia.png")){
		document.getElementById("sortList").style.display="none";	
		updownImg.src="images/icons/iconfont-jiantoushang.png";
	}else{
		document.getElementById("sortList").style.display="block";	
		updownImg.src="images/icons/iconfont-iconfontxia.png";  
	}
});