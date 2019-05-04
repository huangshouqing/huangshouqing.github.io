(function (){
//动态获取可视区的宽度
var design=750;
setRem(750);
function setRem(design){
  var width=window.innerWidth;
  if(width<320){
    width=320;
  }else if(width>750){
    width=750;
  }
  
  document.querySelector('html').style.fontSize=width/design*100+"px";
  console.log(width);
}

window.onresize=function(){
  setRem(design);
  
}

})()