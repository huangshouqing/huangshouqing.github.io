; (function () {
left();
function left(){
  var left = document.querySelector('.cate-content .content-left');
  var leftul = document.querySelector('.cate-content .content-left ul');
  var starty = 0;
  var targety = 0;
  var distancey = 0;
  var currenty=0;//记录当前位置；
  var maxtop=0;
  var mintop=left.offsetHeight-leftul.offsetHeight;

  //给ul注册事件
  left.addEventListener("touchstart", function (e) {
    leftul.style.transition="none";
    starty = e.targetTouches[0].pageY;
    // console.log(starty);
  })
  left.addEventListener("touchmove", function (e) {
    targety = e.targetTouches[0].pageY;
    distancey = targety - starty;
    // console.log(distancey);
    leftul.style.transition = 'none';
    leftul.style.transform='translateY('+(currenty+distancey)+'px)';
    
    
  })
  left.addEventListener("touchend", function (e) {
   currenty+=distancey;//更新当前位置，原本位置加上手指移动的距离
  //判断当前位置距离顶部的值
    if(currenty>maxtop){
    currenty=maxtop;
    }
    else if(Math.abs(currenty)>Math.abs(mintop)){
    currenty=mintop;
    }
    leftul.style.transition="transform 0.5s";
    leftul.style.transform='translateY('+currenty+'px)';
    console.log(currenty);

    starty = 0;
    targety = 0;
    distancey = 0;
  })
}

right();
function right(){
  var right = document.querySelector('.cate-content .content-right');
  var rightul = document.querySelector('.cate-content .content-right .right-in');
  var starty = 0;
  var targety = 0;
  var distancey = 0;
  var currenty=0;//记录当前位置；
  var maxtop=0;
  var mintop=right.offsetHeight-rightul.offsetHeight;

  //给ul注册事件
  right.addEventListener("touchstart", function (e) {
    rightul.style.transition="none";
    starty = e.targetTouches[0].pageY;
 
  })
  right.addEventListener("touchmove", function (e) {
    targety = e.targetTouches[0].pageY;
    distancey = targety - starty;

    rightul.style.transition = 'none';
    rightul.style.transform='translateY('+(currenty+distancey)+'px)';
    
    
  })
  right.addEventListener("touchend", function (e) {
   currenty+=distancey;//更新当前位置，原本位置加上手指移动的距离
  //判断当前位置距离顶部的值
    if(currenty>maxtop){
    currenty=maxtop;
    }
    else if(Math.abs(currenty)>Math.abs(mintop)){
    currenty=mintop;
    }
    rightul.style.transition="transform 0.5s";
    rightul.style.transform='translateY('+currenty+'px)';
    console.log(currenty);

    starty = 0;
    targety = 0;
    distancey = 0;
  })
}

})()