// 动态获取banner的高度
; (function () {
  setHight();

  newsbanner();

  dataTime();

  banner();

  //动态获取高度，设置给banner的ul
  function setHight() {
    var img = document.querySelector('.jd-banner ul img');

    var banner = document.querySelector(".jd-banner");
    var ul = document.querySelector(".jd-banner ul")
    // 获取图片的高度
    var height = img.offsetHeight;
    //将高度赋值给ul
    ul.style.height = height + "px";
    banner.style.height = height + "px";
    console.log(banner.style.height);
  }
  window.onresize = function () {
    setHight();
  }


  // 快报轮播图
  function newsbanner() {
    var ul = document.querySelector('.jd-news .new ul');
    var li = document.querySelectorAll('.jd-news .new ul li');
    var index = 0;//表示当前展示轮播图的下标
    setInterval(function () {
      ul.style.transition = "transform 0.5s";
      index++;
      ul.style.transform = 'translateY(' + (-index * li[0].offsetHeight) + 'px)';
    }, 1000)

    ul.addEventListener('transitionend', function () {
      // 界限判定
      if (index > li.length - 2) {
        index = 0;
        ul.style.transition = "none";
        ul.style.transform = 'translateY(' + (-index * li[0].offsetHeight) + 'px)';
      }
    })


  }

  //秒杀定时器
  function dataTime() {
    setInterval(function () {
      var ul = document.querySelector('.jd-scdKill .time ul ');
      var spans = ul.querySelectorAll('span');

      var nowtime = +new Date();
      var targettime = +new Date('2019-3-30');
      var t = (targettime - nowtime) / 1000;
      var h = Math.floor(t / 3600);
      var m = Math.floor(t % 3600 / 60);
      var s = Math.floor(t % 60);


      spans[0].innerText = '' + h;
      spans[2].innerText = '' + m;
      spans[4].innerText = '' + s;
      // console.log(h+"时"+m+"分"+s+"秒");
      if (h < 10) {
        spans[0].innerText = '0' + h;
      }
      if (m < 10) {
        spans[2].innerText = '0' + m;
      }
      if (s < 10) {
        spans[4].innerText = '0' + s;
      }
    }, 1000)






  }

  //banner
  function banner() {
    //获取所需元素
    var ul = document.querySelector('.jd-banner ul');
    var banner = document.querySelector('.jd-banner');
    var lis = document.querySelectorAll('.jd-banner ul li');
    var width = lis[0].offsetWidth;
    //获取小圆点
    var curcels = document.querySelectorAll('.jd-banner ol li');
    var index = 0;
    var prev = 7;
    var next = 1;
    // 1 监测index的临界值的函数
    function indexcrit() {

      // 监测index的临界值
      if (index < 0) {
        index = 7;
      } else if (index > 7) {
        index = 0;
      }

      if (index == 0) {
        prev = 7;
        next = 1;
      }
      else if (index == 7) {
        prev = 6;
        next = 0;
      }
      else {
        prev = index - 1;
        next = index + 1;

      }

    }
    //2 小圆点高亮函数
    function curcle() {
      //让对应下标的小圆点高亮
      curcels.forEach(function (v, i) {
        v.classList.remove('current');
      })
      curcels[index].className = 'current';
    }
    //3.1 当每个li做完动画后，清除动画效果
    function clearAftertTransition() {
      lis.forEach(function (v, i) {
        v.addEventListener("transitionend", function () {
          v.style.transition = 'none';
        })
      })
    }
    clearAftertTransition();
    // 所有li的动画效果等到动画结束后全部清除，只有需要用时才添加
    
    //3.2立即清除动画效果函数
    function cleartransition() {
      lis.forEach(function (v, i) { 
          v.style.transition = 'none'; 
      })
    }
    

    //4 轮播图定时器函数
    function setinterval() {

      index++;//更新index的值
      indexcrit();
      lis[next].style.transition = 'none';
      //任何一张图片都可以成为next，但是next不需要动画效果，直接飞过去，不需要过度，否则会影响轮播图
      lis[prev].style.transition = 'transform 0.5s';
      lis[index].style.transition = 'transform 0.5s';

      lis[index].style.transform = 'translateX(0px)';
      lis[prev].style.transform = 'translateX(' + -width + 'px)';
      lis[next].style.transform = 'translateX(' + width + 'px)';
      //让对应下标的小圆点高亮
      curcle();

    }
    //5 index next prev整体移动函数,
    function translatex() {
      lis[index].style.transform = 'translateX(0px)';
      lis[prev].style.transform = 'translateX(' + -width + 'px)';
      lis[next].style.transform = 'translateX(' + width + 'px)';
    }

    //初始化li，
    translatex();
    // 定时器轮播
    if (timeid) {
      clearInterval(timeid);
    }
    var timeid = setInterval(setinterval, 1000)
    // 触屏轮播
    var startx = 0;
    var targetx = 0;
    var distancex = 0;
    banner.addEventListener('touchstart', function (e) {
      // 先清除定时器
      clearInterval(timeid);
      cleartransition();
      startx = e.targetTouches[0].pageX;
    })
    banner.addEventListener('touchmove', function (e) {
      targetx = e.targetTouches[0].pageX;
      distancex = targetx - startx;
      //滑动，让三个li跟上手指滑动
      cleartransition();
      lis[index].style.transform = 'translateX(' + (distancex) + 'px)';
      lis[prev].style.transform = 'translateX(' + (-width + distancex) + 'px)';
      lis[next].style.transform = 'translateX(' + (width + distancex) + 'px)';
    })
    banner.addEventListener('touchend', function (e) {

      if (Math.abs(distancex) > width / 3) {
        if (distancex > 0) {

          index--;
          indexcrit();
          lis[next].style.transition = 'transform 0.5s';
          lis[index].style.transition = 'transform 0.5s';
          lis[prev].style.transition = 'none';
        } else if (distancex < 0) {

          index++;
          indexcrit();
          lis[next].style.transition = 'none';
          lis[prev].style.transition = 'transform 0.5s';
          lis[index].style.transition = 'transform 0.5s';
        }
      }else{
        //不切换时，回到原处也需要添加动画
        lis.forEach(function (v, i) { 
          v.style.transition = 'transform 0.5s';
      })
        
      }

      translatex();

      curcle();

      startx = 0;
      targetx = 0;
      distancex = 0;

      timeid = setInterval(setinterval, 1000);
    })
  }


})();