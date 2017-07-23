
var eventUtil={
getTarget:function(event){
  return event.target||event.srcElement;
},
addHandler:function(ele,type,func){
		   if(typeof document.addEventListener != "undefined"){
			   ele.addEventListener(type,func,false);   
		   }else{
			   ele.attachEvent("on"+type,func);	
		   }
	   },
removeHandler:function(ele,type,func){

           if(ele.removeEventListener){
			   ele.removeEventListener(type,func,false);   
		   }else{
			   ele.detachEvent("on"+type,func);	
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


var addMuban=document.getElementById("addMuban");
var bilis=document.getElementsByClassName("bili");
var mainDesign=document.getElementById("mainDesign");

eventUtil.addHandler(addMuban,"click",function(){
	var bili1=bilis[0].value;
	var bili2=bilis[1].value;
  document.getElementById("save").disabled="";
	var mainDesignWidth=mainDesign.offsetWidth-20;
	var mainDesignHeight=mainDesign.offsetHeight-20;
	if(bili1!==""&& bili2!==""){
	   var muban=document.createElement("div");
	   muban.id="muban"; 
	   if(mainDesign.children.length==0){
       mainDesign.appendChild(muban);
     }  
       
       if(mainDesignWidth<=mainDesignHeight*bili1/bili2){
          for(var height=mainDesignHeight;height>=0;height--){
          	 if(mainDesignWidth>=mainDesignHeight*bili1/bili2){
          	 	muban.style.width=mainDesignHeight*bili1/bili2+"px";
          	 	muban.style.height=height+"px"; 
                break;
          	 }
          }
       }else{
       	      muban.style.width=mainDesignHeight*bili1/bili2+"px";
          	 	muban.style.height=mainDesignHeight+"px"; 
       }
       muban.style.left=(mainDesignWidth+20-muban.offsetWidth)/2+"px";
       muban.style.top=(mainDesignHeight+20-muban.offsetHeight)/2+"px";
       addBox.className="add";//addBox的className由add disable改为add
	}   
});
var addBox=document.getElementById("addBox");
eventUtil.addHandler(addBox,"click",function(){
	var muban=document.getElementById("muban");	
	if(muban){
	  var div=document.createElement("div");
	  div.className="box";
	  var divInnerClassNames=["W","E","N","S","WN","EN","WS","ES","center","line"];//W是西，E是东，N是北，S是南
	  var divInnerPosition=[[0,5],[145,5],[5,0],[5,145],[0,0],[145,0],[0,145],[145,145],[60,-40],[70,-22]];
	  var divInnerSize=[[5,140],[5,140],[140,5],[140,5],[5,5],[5,5],[5,5],[5,5],[20,20],[0,20]];
	  var divInnerHTML="";
	  for(var i=0;i<10;i++){         
	      if(i==8){
	      divInnerHTML+="\<div class=\""+divInnerClassNames[i]+"\" style=\"width:"+divInnerSize[i][0]+"px;height:"+divInnerSize[i][1]+"px;left:"+divInnerPosition[i][0]+"px;top:"+divInnerPosition[i][1]+"px\"\>\<img src=\"..\/images\/icons\/iconfont-xuanzhuan.png\"\>\<\/div\>";	
	    }else{
	  	  divInnerHTML+="\<div class=\""+divInnerClassNames[i]+"\" style=\"width:"+divInnerSize[i][0]+"px;height:"+divInnerSize[i][1]+"px;left:"+divInnerPosition[i][0]+"px;top:"+divInnerPosition[i][1]+"px\"\>\<\/div\>";
	    }
	  }
	  div.innerHTML=divInnerHTML;
      muban.appendChild(div);
      div.style.left=(muban.offsetWidth-div.offsetWidth)/2+"px";
      div.style.top=(muban.offsetHeight-div.offsetHeight)/2-60+"px";//-60是减去头部信息的60px，让div居中显示
	 }
});
eventUtil.addHandler(mainDesign,"mouseover",function(event){
   var tar=eventUtil.getTarget(event);
   var tar=tar.parentNode;
   var className=tar.className;
   if(className=="center"){
   	 tar.style.cursor="pointer";
   }
});
eventUtil.addHandler(mainDesign,"mousedown",function(event){
   var tar=eventUtil.getTarget(event);
    var className=tar.className;
    if(className==""){
     tar=tar.parentNode;
     className=tar.className;
    }    
   switch(className){
   	case "center":
   	       eventUtil.addHandler(tar,"mousedown",rotate);
   	       break;
   case "box": 
           eventUtil.addHandler(tar,"mousedown",move);
   	       break;
    case "W":tar.onmousedown=resize(event,true,false,false,false);break;
    case "E":tar.onmousedown=resize(event,false,true,false,false);break;
    case "N":tar.onmousedown=resize(event,false,false,true,false);break;
    case "S":tar.onmousedown=resize(event,true,false,false,true);break;
    case "WN":tar.onmousedown=resize(event,true,false,true,false);break;
    case "EN":tar.onmousedown=resize(event,false,true,true,false);break;
    case "WS":tar.onmousedown=resize(event,true,false,false,true);break;
    case "ES":tar.onmousedown=resize(event,false,true,false,true);break;
    }             
});

function rotate(event){
   var tar=eventUtil.getTarget(event).parentNode;
   if(tar.className==="center"){
            var drag=tar.parentNode;      
            var centerX=event.clientX;
            var centerY=event.clientY+drag.offsetHeight/2;
              var x=event.clientX-centerX;
              var y=event.clientY-centerY;
            tar.onmousemove=function(event){
                var nowX=event.clientX-centerX;
                var nowY=event.clientY-centerY;        
                var a=Math.sqrt(x*x+y*y);//结合旋转中心（这里是rotate的中心），用户移动到的点，用户刚开始onmousedown的点
                var b=Math.sqrt(nowX*nowX+nowY*nowY);
                var c=Math.sqrt((x-nowX)*(x-nowX)+(y-nowY)*(y-nowY));           
                var reg=Math.acos((a*a+b*b-c*c)/(2*a*b));
                reg=(180/Math.PI)*reg;//弧度转化为度数
                if(event.clientX<centerX){//结合实际情况，判断用户往左边还是右边旋转
                  reg=(-1)*reg;
                }
                
                drag.style.transform="rotate("+reg+"deg)";   
                document.onmouseup=function(event){                     
                     tar.onmousemove=null;
                     document.onmouseup=null;
                }                
            }
          }
}
function move(event){
	var tar=eventUtil.getTarget(event);
    var toLeft=event.clientX-tar.offsetLeft;//用户按下的点到drag盒子的相对距离
    var toTop=event.clientY-tar.offsetTop;
  tar.onmousemove=function(event){
    	var _tar= eventUtil.getTarget(event);  
    	var muban=_tar.parentNode;
        var left= event.clientX-toLeft;
        var top=event.clientY-toTop;

        var maxLeft=muban.offsetWidth-_tar.offsetWidth;
        var maxTop=muban.offsetHeight-_tar.offsetHeight;
        if(left<0){
        	left=0;
        }else if(left>maxLeft){
        	left=maxLeft;
        }

        if(top<0){
        	top=0;
        }else if(top>maxTop){
        	top=maxTop;
        }
        
        _tar.style.left=left+"px";
        _tar.style.top=top+"px";
        document.onmouseup=function(event){        
            tar.onmousemove=null;
            document.onmouseup=null;
        }
       }
}

var main=document.getElementById("main");
function resize(event,isW,isE,isN,isS){//isE为true表示需要调整东边
  var  tar=eventUtil.getTarget(event);	
  var drag=tar.parentNode;
  var muban=document.getElementById("muban");
  var main=document.getElementById("main");
 // alert(mainDesign.offsetLeft+" "+mainDesign.offsetTop);
  var dragLeft=event.clientX-tar.offsetLeft;
  var dragTop=event.clientY-tar.offsetTop;
  var left=drag.offsetLeft;
  var top=drag.offsetTop;
  var dragWidth=drag.offsetWidth;
  var dragHeight=drag.offsetHeight;
    tar.onmousemove=function(event){
   	  var _tar=eventUtil.getTarget(event);
      var muban=document.getElementById("muban");
   	  var widthDiff=event.clientX-dragLeft;
   	  var heightDiff=event.clientY-dragTop;
     
   	  var width=widthDiff;
      var height=heightDiff;
   	  var muban=_tar.parentNode.parentNode;
   	  var drag=_tar.parentNode;   	    	        
   	  if(isW===true){

         width=dragWidth-widthDiff;
         drag.style.left=left+widthDiff+"px";

      }
   	  if(isN===true){
         height=dragHeight-heightDiff;//这种情况heightDiff是负数
         drag.style.top=top+heightDiff+"px";
   	  }
       if(drag.offsetLeft>0){
          var maxWidth=muban.offsetWidth-drag.offsetLeft;
       }else{
         document.onmousemove=null;
       }
        if(drag.offsetTop>0){
          var maxHeight=muban.offsetHeight-drag.offsetTop;
       }else{
         document.onmousemove=null;
       }
       if(width>=maxWidth){
         width=maxWidth;
       }
       if(height>=maxHeight){
        height=maxHeight;
       }
   	  if(isE===true||isW===true){ 	
   	    drag.style.width=width+"px";
   	  }
   	  if(isN===true||isS===true){
        drag.style.height=height+"px";
       }

      setInsideBox(drag);
      document.onmouseup=function(event){
        	 tar.onmousemove=null;
           document.onmouseup=null;
      }
   }
}
function setInsideBox(box){

  var left=box.offsetLeft;
  var top=box.offsetTop;
  var width=box.offsetWidth;
  var height=box.offsetHeight;
  var boxChildren=box.children;
  var info=[];
  info.push(5,height-10,0,5);
  info.push(5,height-10,width-5,5);
  info.push(width-10,5,5,0);
  info.push(width-10,5,5,height-5);
  info.push(5,5,0,0);
  info.push(5,5,width-5,0);
  info.push(5,5,0,height-5);
  info.push(5,5,width-5,height-5);
  info.push(20,20,width/2-10,-40);
  info.push(0,20,width/2,-22);

  for(var i=0;i<boxChildren.length;i++){
    boxChildren[i].style.width=info[i*4]+"px";
    boxChildren[i].style.height=info[i*4+1]+"px";
    boxChildren[i].style.left=info[i*4+2]+"px";
    boxChildren[i].style.top=info[i*4+3]+"px";
  }
}
var save=document.getElementById("save");//点击保存

eventUtil.addHandler(save,"click",function(){
  var muban=document.getElementById("muban");
   var mubanInfo=[];
   var mubanChildren=muban.children;

   var mubanWidth=muban.offsetWidth;
   var mubanHeight=muban.offsetHeight;
   var mubanLeft=muban.offsetLeft;
   var mubanTop=muban.offsetTop;
 
   var len=mubanChildren.length;
   var flag=len-1;
   for(var i=0;i<len;i++){   
     var oneboxInfo=[];
     if(mubanChildren[i].className!=="uploadImg"){
     oneboxInfo.push(mubanChildren[i].offsetWidth*(1.0)/mubanWidth);//width是百分比
     oneboxInfo.push(mubanChildren[i].offsetHeight*(1.0)/mubanHeight);//height是百分比
     oneboxInfo.push(mubanChildren[i].offsetLeft*(1.0)/mubanWidth);
     oneboxInfo.push(mubanChildren[i].offsetTop*(1.0)/mubanHeight);
     oneboxInfo.push(mubanChildren[i].style.transform);
     mubanInfo.push(oneboxInfo);
     }else{
       flag=i;
     }
   }
  // mubanInfo.push("../images/ads/"+mubanChildren[flag].src);
 // mubanInfo.push(getFullPath(mubanChildren[flag]));
 mubanInfo.push(mubanChildren[flag].src);
   //var url="";
   //ajax(url,mubanInfo,null);//用ajax发送一个数组到url,url是你的php文件相对于我js的路径

function createNewMuban(parentNode,width,height,left,top){
  var newmuban=document.createElement("div");
  parentNode.appendChild(newmuban);
   newmuban.style.position="absolute";
   newmuban.style.width=width+"px";
   newmuban.style.height=height+"px";
   newmuban.style.left=left+"px";
   newmuban.style.top=top+"px";
   newmuban.id="newmuban";
   newmuban.style.border="1px solid";
   var divInnerHTML="";  
   var flag=-1;
   for(var i=0;i<len;i++){ 
    if(mubanInfo[i].className!=="uploadImg"){
    divInnerHTML+="\<div style=\"width:"+mubanInfo[i][0]*newmuban.offsetWidth+"px;height:"+mubanInfo[i][1]*newmuban.offsetHeight+"px;left:"+mubanInfo[i][2]*newmuban.offsetWidth+"px;top:"+mubanInfo[i][3]*newmuban.offsetHeight+"px;transform:"+mubanInfo[i][4]+";position:absolute;background-color:gray\"\>\<\/div\>";        
    }else{
      flag=i;
    }
   }
    newmuban.innerHTML=divInnerHTML; 

    if(flag!=-1){
      var img=document.createElement(img);;
      img.src=mubanInfo[flag];
      img.style.width=newMuban.offsetWidth+"px";
      img.style.height=newMuban.offsetHeight+"px";
      newmuban.appendChild(img);
   }
}
var mainDesign=document.getElementById("mainDesign");
var preview=document.getElementById("preview");
var muban=document.getElementById("muban");

var width=mainDesign.offsetWidth;
var height=mainDesign.offsetHeight;
var left=mainDesign.offsetLeft;
var top=mainDesign.offsetTop;
preview.style.position="absolute";
preview.style.width=width+"px";
preview.style.height=height+"px";
preview.style.left=left+"px";
preview.style.top=top+"px";
var mubanWidth=muban.offsetWidth;
var mubanHeight=muban.offsetHeight;
var mubanLeft=parseInt(muban.style.left);
var mubanTop=parseInt(muban.style.top);

mainDesign.style.display="none";
//preview.style.display="inline-block";
preview.style.display="inline-block";
createNewMuban(preview,mubanWidth,mubanHeight,mubanLeft,mubanTop);   //测试渲染一个模板
save.disabled="disabled";
alert("保存成功！");

});
var choose=document.getElementById("choose");
var ul=choose.children[0];
var li1=ul.children[0];
var li2=ul.children[1];
eventUtil.addHandler(li1,"click",function(){
  document.getElementById("uploadPicture").style.display="none";
  var edit=document.getElementById("edit");
  var operation=document.getElementById("operation");
  edit.style.display="block";
  operation.style.display="block";
});
eventUtil.addHandler(li2,"click",function(){
  var edit=document.getElementById("edit");
  var operation=document.getElementById("operation");
  edit.style.display="none";
  operation.style.display="none";
  document.getElementById("uploadPicture").style.display="block";
});

var upPicInput=document.getElementById("upPicInput");
var uploadPicture=document.getElementById("uploadPicture");
eventUtil.addHandler(upPicInput,"change",function(event){
  //var upPicUrl=upPicInput.value;
  var img=document.createElement("img");
 
  img.className="uploadImg"; 
  var imgWidth=uploadPicture.offsetWidth-50;
  img.style.width=imgWidth+"px";
  img.style.height=imgWidth+"px";
  img.style.zIndex="1";
  uploadPicture.appendChild(img);
  var _tar=event.target||event.srcElement;
  var file = _tar.files[0];  
  var reader = new FileReader();  
  reader.readAsDataURL(file);  
  reader.onload = function(e){  
      img.src=this.result;  
  }
});
eventUtil.addHandler(uploadPicture,"dblclick",function(event){
  
   var tar=eventUtil.getTarget(event);
   var img=tar.cloneNode();
   //先保存模板再上传背景图片
/*
   newmuban=document.getElementById("newmuban");
   if(newmuban){
   img.style.width=newmuban.offsetWidth+"px";
   img.style.height=newmuban.offsetHeight+"px";
   var className=tar.className;
   if(className==="uploadImg"){
    newmuban.appendChild(img);
   }
 }
 */

var muban=document.getElementById("muban");
if(muban){
   img.style.width=muban.offsetWidth+"px";
   img.style.height=muban.offsetHeight+"px";
   var className=tar.className;
   muban.appendChild(img);
   }
});