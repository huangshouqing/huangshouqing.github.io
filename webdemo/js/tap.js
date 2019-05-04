// 封装一个tap事件函数
// itcast={
//   tap:function(box,callback){
// //函数体
// //index传入一个dom对象，
// // callback传入一个回调函数
// var starttime;
// var startx=0;
// var starty=0;
// var movex=0;
// var movey=0;
// var endtime;
// var datatime=0;
// var distancex=0;
// var distancey=0;
// var flag=true;//默认没有移动
// box.addEventListener('touchstart',function(e){
//   console.log("触屏开始");
//   starttime=+new Date();
// startx=e.targetTouches[0].pageX;
// starty=e.targetTouches[0].pageY;
// })
// box.addEventListener('touchmove',function(e){
//   movex=e.targetTouches[0].pageX;
//   movey=e.targetTouches[0].pageY;
//   distancex=movex-startx;
//   distancey=movey-starty;
//   if(distancex!=0&&distancey!=0){
//     flag=false;
//   }else{
//     flag=true;
//   }
// })
// box.addEventListener('touchend',function(e){
//   endtime=+new Date();
//   datatime=endtime-starttime;
//   if(parseInt(datatime)<150&&flag){
//     //表示为点击事件
//     console.log("这是点击事件");
//     callback(e);
//   }
//   else{
//     console.log("这是触屏事件"); 
//   }
// })

//   }
// }


itcast = {
  tap: function (box, callback) {
    //函数体
    //index传入一个dom对象，
    // callback传入一个回调函数
    // 判断点击还是触屏事件需要同时判读两个因素： 
    // 1 触屏时间小于150ms，为了优化
    // 2.没有移动过
    var starttime;
    var endtime;
    var datatime = 0;
    var flag = true;//默认触屏时没有移动
    box.addEventListener('touchstart', function (e) {
      console.log("触屏开始");
      starttime = +new Date();
    })
    box.addEventListener('touchmove', function (e) {
      flag = false;
    })
    box.addEventListener('touchend', function (e) {
      endtime = +new Date();
      datatime = parseInt(endtime - starttime);
      console.log(datatime)
      if (flag && datatime < 150) {
        //表示为点击事件
        callback&&callback(e);
      }
      else {
        console.log("这是触屏事件");
      }
      flag = true;
    })
  }
}