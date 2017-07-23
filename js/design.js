
//获得用户选择的内容
function getSelect()
{
  if(window.getSelection)
  {
    return window.getSelection();
  }
  else
  {
    return document.selection.createRange().text;
  } 
}
//事件对象浏览器兼容
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
      },   
preventDefault:function(event){
        if(event.preventDefault){
          event.preventDefault();
        }else{
          event.returnValue=false;
        }
      }
};
//兼容IE浏览器document.getElementsByClass
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
//如果再浏览器环境下没有document.getElementsByClassName，则赋值函数
if(!document.getElementsByClassName){
  document.getElementsByClassName=byClass;
}
//令id值是content的div的高度适应浏览器高度
function set(){
  var content=document.getElementById("content");
  content.style.height=(document.documentElement.clientHeight||document.body.clientHeight)+"px";
}
//加载或者是重置浏览器窗口大小的时候，让content适应浏览器大小
window.onload=set;
window.resize=set;

//对输入字体进行处理的图片数组
var imgSrc=["bold.png","italic.png","underLine.png","createLink.png","unlink.png","cut.png","delete.png","copy.png","paste.png","selectAll.png","outdent.png","indent.png","justifyCenter.png","justifyLeft.png","justifyRight.png","fontFamily.png","fontSize.png","color.png"];
var titles=["?ó′?","D±ì?","??????","′′?¨á′?ó","ò?3yá′?ó","???D","é?3y","?′??","?3ìù","è???","í13?","????","?ó?D","×ó????","óò????","×?ì?","×?ì?′óD?","×?ì???é?"];
var operate=["bold","italic","underline","createlink","unlink","cut","delete","copy","paste","selectall","outdent","indent","justifycenter","justifyleft","justifyright","fontname","fontsize","fontcolor"];
var operation=document.getElementById("operation");
var inner="";
for(var i=0;i<imgSrc.length;i++){
  inner+="<input type=\"image\" src=\"..\/images\/icons\/"+imgSrc[i]+'\"'+'title=\"'+titles[i]+'\"'+"  index=\""+i+"\"\/>";
}
operation.innerHTML=inner;
var operationInputs=operation.children;
for(var i=0;i<operationInputs.length;i++){
  //对输入的字体进行处理的函数绑定
  eventUtil.addHandler(operationInputs[i],"click",function(event){
    var tar=event.target||event.srcElement;
    var index=tar.getAttribute("index");
    //alert(index+"/"+operate[index]);
    document.execCommand(operate[index],false,null);    
  });
}

var edit=document.getElementById("edit");
var str=edit.innerHTML;
var lis=document.getElementById("choose").children[0].children;
//工具栏的点击事件响应
eventUtil.addHandler(lis[0],"click",function(){
    document.getElementById("uploadImgs").style.display="none";
    document.getElementById("operation").style.display="block";
    document.getElementById("edit").style.display="block";
    document.getElementById("addWords").style.display="block";
});
eventUtil.addHandler(lis[1],"click",function(){
  document.getElementById("operation").style.display="none";
    document.getElementById("edit").style.display="none";
    document.getElementById("addWords").style.display="none";
  document.getElementById("uploadImgs").style.display="block";
});

eventUtil.addHandler(lis[4],"click",function(){//随机填充模板
    var uploadImgs=document.getElementById("uploadImgs").children;
    var muban=document.getElementsByClassName("newMuban")[1];
    var len=muban.children.length;
    var flag=[];
    for(var i=0;i<len;i++){
      randomNum=0;
      while(randomNum===0){
        var randomNum=Math.floor(Math.random()*(uploadImgs.length));
      }      
       
      var width=muban.children[i].offsetWidth;
      var height=muban.children[i].offsetHeight;
      var img=uploadImgs[randomNum].cloneNode();
      img.style.margin=0;
      img.style.padding=0;
      img.id="randomImg"+i;
      img.style.width=width+"px";
      img.style.height=height+"px";
     
      if(muban.children[i].children[0]===undefined){
         muban.children[i].appendChild(img);
      }else{
         muban.children[i].replaceChild(img,muban.children[i].children[0]);
      }     
    }
});

eventUtil.addHandler(lis[5],"click",function(){
  var muban=document.getElementsByClassName("newMuban")[1];
  var canvas=document.createElement("canvas");
  document.body.appendChild(canvas);
  canvas.width=muban.offsetWidth;
  canvas.height=muban.offsetHeight;
 // canvas.style.visibility="hidden";
  if(canvas.getContext){
    var context=canvas.getContext("2d");
  }
  var len=muban.children.length;

  for(var i=0;i<len;i++){
     if(muban.children[i].className=="words"){
      context.textAlign="start";
      context.testBaseline="top";
      context.font="16px Arial";
      context.fillText(muban.children[i].innerHTML,muban.children[i].offsetLeft+10,muban.children[i].offsetTop+24);
     }
    if(muban.children[i].children.length>0){
      var img=muban.children[i].children[0];
      var mubanBox=muban.children[i];
     // alert(mubanBox.offsetLeft+" "+mubanBox.offsetTop+" "+mubanBox.offsetWidth+" "+mubanBox.offsetHeight);
      context.drawImage(img,mubanBox.offsetLeft,mubanBox.offsetTop,mubanBox.offsetWidth,mubanBox.offsetHeight);
    }
  }
  var imgSrc=canvas.toDataURL("image/png");
  var img=document.createElement("img");
  img.src=imgSrc;
  //var div=document.createElement("div");
  
  document.body.appendChild(img);
 // div.appendChild(document.createTextNode("我设计的作品"));
 // div.appendChild(img);

  /*
  ajax("相应当前请求的php文件相对当前js文件的路径",imgSrc,null);
   */
  alert("保存成功！");
});
var addWords=document.getElementById("addWords");
/*
var mubanInfo=ajax("这是要填写的url,php文件相对于当前js文件的地址",null,function(xhr){
    return xhr.responseText;
});
*/
//下面是模拟模板,真正的模板应该是后台返回的
//var mubanInfo=[[50*(1.0)/530,50*(1.0)/460,5*(1.0)/530,0],[50*(1.0)/530,50*(1.0)/460,60*(1.0)/530,0],[50*(1.0)/530,50*(1.0)/460,380*(1.0)/530,0],[50*(1.0)/530,50*(1.0)/460,435*(1.0)/530,0],[50*(1.0)/530,50*(1.0)/460,5*(1.0)/530,55*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,60*(1.0)/530,55*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,115*(1.0)/530,55*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,170*(1.0)/530,55*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,170*(1.0)/530,55*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,325*(1.0)/530,55*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,380*(1.0)/530,55*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,435*(1.0)/530,55*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,490*(1.0)/530,55*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,60*(1.0)/530,110*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,205*(1.0)/530,110*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,350*(1.0)/530,110*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,490*(1.0)/530,110*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,95*(1.0)/530,255*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,150*(1.0)/530,255*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,350*(1.0)/530,255*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,405*(1.0)/530,255*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,150*(1.0)/530,310*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,350*(1.0)/530,310*(1.0)/460],[50*(1.0)/530,50*(1.0)/460,250*(1.0)/530,400*(1.0)/460],[140*(1.0)/530,140*(1.0)/460,60,110],[140*(1.0)/530,140*(1.0)/460,205*(1.0)/530,110*(1.0)/460],[140*(1.0)/530,140*(1.0)/460,350*(1.0)/530,110*(1.0)/460],[140*(1.0)/530,140*(1.0)/460,205*(1.0)/530,255*(1.0)/460]];
var mubanInfo=[
[50*(1.0)/545,50*(1.0)/460,60*(1.0)/545,0],
[50*(1.0)/545,50*(1.0)/460,115*(1.0)/545,0],
[50*(1.0)/545,50*(1.0)/460,380*(1.0)/545,0],
[50*(1.0)/545,50*(1.0)/460,435*(1.0)/545,0],
[50*(1.0)/545,50*(1.0)/460,5*(1.0)/545,55*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,60*(1.0)/545,55*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,115*(1.0)/545,55*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,170*(1.0)/545,55*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,170*(1.0)/545,55*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,330*(1.0)/545,55*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,385*(1.0)/545,55*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,440*(1.0)/545,55*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,495*(1.0)/545,55*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,5*(1.0)/545,110*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,5*(1.0)/545,110*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,495*(1.0)/545,110*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,495*(1.0)/545,110*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,95*(1.0)/545,255*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,150*(1.0)/545,255*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,350*(1.0)/545,255*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,405*(1.0)/545,255*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,150*(1.0)/545,310*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,350*(1.0)/545,310*(1.0)/460],
[50*(1.0)/545,50*(1.0)/460,250*(1.0)/545,400*(1.0)/460],
[140*(1.0)/545,140*(1.0)/460,60*(1.0)/545,110*(1.0)/460],
[140*(1.0)/545,140*(1.0)/460,205*(1.0)/545,110*(1.0)/460],
[140*(1.0)/545,140*(1.0)/460,350*(1.0)/545,110*(1.0)/460],
[140*(1.0)/545,140*(1.0)/460,205*(1.0)/545,255*(1.0)/460]];
for(var i=0;i<mubanInfo.length;i++){
  var len=mubanInfo[i].length;
  mubanInfo[i].push(0);
}
//setMuban函数主要是根据mubanInfo数组渲染一个模板
function setMuban(mubanInfo,newMubanWidth,newMubanHeight,parentNodeId){
    
  var parentNode=document.getElementById(parentNodeId);
  
    var newMuban=document.createElement("div");
    parentNode.appendChild(newMuban);
    newMuban.className="newMuban";
    newMuban.style.width=newMubanWidth+"px";
    newMuban.style.height=newMubanHeight+"px";
    newMuban.style.left=(parentNode.offsetWidth-newMubanWidth)/2+"px";
    newMuban.style.top=(parentNode.offsetHeight-newMubanHeight)/2+"px";
    for(var i=0;i<mubanInfo.length;i++){
    var box=document.createElement("div");
    newMuban.appendChild(box);
    box.className="mubanBox";
    box.style.width=mubanInfo[i][0]*newMubanWidth+"px";
    box.style.height=mubanInfo[i][1]*newMubanHeight+"px";
    box.style.left=mubanInfo[i][2]*newMubanWidth+"px";
    box.style.top=mubanInfo[i][3]*newMubanHeight+"px";  
    box.style.backgroundColor="#373f42";  
    }
  
    if(parentNodeId=="mainDesign"){//如果再mainDesign里面渲染一个模板
    eventUtil.addHandler(newMuban,"dragenter",function(event){//那么用事件代理，把模板的子元素的事件代理到父元素上，这里是js的原生拖放
      var tar=eventUtil.getTarget(event);
      if(tar.className=="mubanBox"||tar.parentNode.className=="mubanBox"){
        event.dataTransfer.dropEffect="copy";  
      }
      
    });
    eventUtil.addHandler(newMuban,"dragover",function(event){
      var tar=eventUtil.getTarget(event);
      if(tar.className=="mubanBox"||tar.parentNode.className=="mubanBox"){
        eventUtil.preventDefault(event);
      }
    });
    
    
    eventUtil.addHandler(newMuban,"drop",function(event){//js原生拖放
      var tar=eventUtil.getTarget(event);
      if(tar.className=="mubanBox"){
        eventUtil.preventDefault(event);
        var id=event.dataTransfer.getData("tarId");
        var imgDrag=document.getElementById(id);
        imgDrag=imgDrag.cloneNode();
        imgDrag.id="img"+imgIndex;
        imgIndex++;
        imgDrag.style.width=tar.offsetWidth+"px";
        imgDrag.style.height=tar.offsetHeight+"px";
        imgDrag.style.margin=0+"px";
        if(tar.children.length<=0){
          tar.appendChild(imgDrag);
        }else{
          tar.replaceChild(imgDrag,tar.children[0]);  
        }
       
      }else if(tar.parentNode.className=="mubanBox"){//如果在最右边渲染模板
        eventUtil.preventDefault(event);
        var id=event.dataTransfer.getData("tarId");
        var imgDrag=document.getElementById(id);
        imgDrag=imgDrag.cloneNode();
        imgDrag.id="img"+imgIndex;
        imgIndex++;
        imgDrag.style.width=tar.offsetWidth+"px";
        imgDrag.style.height=tar.offsetHeight+"px"; 
        imgDrag.style.margin=0+"px";    
        tar.parentNode.replaceChild(imgDrag,tar);       
      }
    });   
  }
}
var mubanchoose=document.getElementById("mubanchoose");
setMuban(mubanInfo,mubanchoose.offsetWidth,mubanchoose.offsetWidth*(460*(1.0)/540),"mubanchoose");
var mainDesign=document.getElementById("mainDesign");
var mainDesignWidth=mainDesign.offsetWidth;
var mainDesignHeight=mainDesign.offsetHeight;
setMuban(mubanInfo,545,460,"mainDesign");

var uploadImgs=document.getElementById("uploadImgs");
var imgIndex=0;//设置全局变量，上传的图片数
eventUtil.addHandler(mainDesign,"dblclick",function(event){//用户双击模板里面的小盒子上传图片
     
  var tar=eventUtil.getTarget(event);
  if(tar.className==="mubanBox"){//如果双击模板盒子，那么和点击上传是一样的      
   mainDesignUpload.click();
  }
    mainDesignUpload.onchange=function(event){
    var _tar=eventUtil.getTarget(event);
    var img=document.createElement("img");
    img.style.width=tar.offsetWidth+"px";
    img.style.height=tar.offsetHeight+"px";
   // img.src="../images/ads/"+_tar.value;
    
    //img.src=getFullPath(_tar);
    //  alert(img.src);
    img.id="img"+imgIndex;
    imgIndex++;

    if(tar.children.length<=0){
      img=img.cloneNode();
      imgIndex++;
      img.id="img"+imgIndex;
      imgIndex++;
      tar.appendChild(img);
    }else{
      img=img.cloneNode();
      imgIndex++;
      img.id="img"+imgIndex;
      imgIndex++;
      tar.replaceChild(img,tar.children[0]);
    }
    
    
    img=img.cloneNode();
    imgIndex++;
    img.id="img"+imgIndex;
    imgIndex++;
    uploadImgs.appendChild(img);
    var file = _tar.files[0];  
    var reader = new FileReader();  
    reader.readAsDataURL(file);  
    reader.onload = function(e){  
            img.src=this.result;  
    } 
    img.draggable=true;
    img.ondragstart=function(event){
      var tar=eventUtil.getTarget(event);
      event.dataTransfer.setData("tarId",tar.id); 
      event.dataTransfer.effectAllowed="all";
    }    
    img.style.width=150+"px";
    img.style.height=150+"px";
    img.style.margin=5+"px";
  }
    
});
  var mainDesignUpload=document.getElementById("mainDesignUpload");
  upload.onchange=function(event){//这里是触发了一个隐藏的type为file类型的input
    var _tar=eventUtil.getTarget(event);
     
    var img=document.createElement("img");
    //img.src="../images/ads/"+_tar.value;
     
    //img.src=getFullPath(_tar);
    img.id="img"+imgIndex;
    imgIndex++;
    uploadImgs.appendChild(img);
    var file = _tar.files[0];  
    var reader = new FileReader();  
    reader.readAsDataURL(file);  
    reader.onload = function(e){  
            img.src=this.result;  
    }
    var file = _tar.files[0];  
    var reader = new FileReader();  
    reader.readAsDataURL(file);  
    reader.onload = function(e){  
            img.src=this.result;  
    }
    img.draggable=true;   
    img.ondragstart=function(event){
      var tar=eventUtil.getTarget(event);
      event.dataTransfer.setData("tarId",tar.id); 
      event.dataTransfer.effectAllowed="all";
    }
    
  }
  
  eventUtil.addHandler(addWords,"click",function(event){//添加文字按钮
    var wordsDiv=document.createElement("div");
    wordsDiv.innerHTML=edit.innerHTML;
    mainDesign.children[1].appendChild(wordsDiv);
    wordsDiv.className="words";
    eventUtil.addHandler(wordsDiv,"mousedown",move);
    eventUtil.addHandler(wordsDiv,"click",function(event){
      var tar=eventUtil.getTarget(event);
      if(tar.className==="deleteDiv"){
        tar.parentNode.parentNode.removeChild(tar.parentNode);
      }
    });
    eventUtil.addHandler(wordsDiv,"dblclick",function(event){//双击模板里的字体框，文字变成可编辑的
      var tar=eventUtil.getTarget(event);
      var input=document.createElement("input");
      tar.appendChild(input);
      input.style.width=tar.offsetWidth+"px";
      input.style.height=tar.offsetHeight+"px";
      input.style.position="absolute";
      input.style.left=0;
      input.style.top=0;     
      input.onblur=function(event){
        var _tar=eventUtil.getTarget(event);
        var value=_tar.value;
        _tar.parentNode.innerHTML=value;
        _tar.parentNode.removeChild(_tar);
      }
    });
  });

  function move(event){//用户可以移动文字框
    var tar=eventUtil.getTarget(event);
    var toLeft=event.clientX-tar.offsetLeft;//用户按下的点到drag盒子的相对距离
    var toTop=event.clientY-tar.offsetTop;
    if(tar.className==="words"){
      if(event.button==2){
        var div=document.createElement("div");
        div.innerHTML="删除";
        div.style.border="1px solid";
        tar.appendChild(div);
        div.style.position="relative";
        div.style.width=50+"px";
        div.style.left=150+"px";
        div.style.top=-84+"px";
        div.className="deleteDiv";
        div.id="deleteDiv";
      }else{
          tar.onmousemove=function(event){
          var _tar= eventUtil.getTarget(event);  
          var left= event.clientX-toLeft;
          var top=event.clientY-toTop;
          var muban=_tar.parentNode;
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
    }
}

  
