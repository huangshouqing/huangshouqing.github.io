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
    // 轮播图定时器函数
    function setinterval() {

      index++;//更新index的值
      ul.style.transition = 'transform 0.5s';
      ul.style.transform = 'translateX(' + (-index) * width + 'px)';
    }
    var ul = document.querySelector('.jd-banner ul');
    var lis = document.querySelectorAll('.jd-banner ul li');
    var width = lis[0].offsetWidth;
    //获取小圆点
    var curcels = document.querySelectorAll('.jd-banner ol li');
    var index = 1;//默认显示第一张，真正的第一张，但是位置是第二个，所以，索引值也得更改
    if (timeid) {
      clearInterval(timeid);
    }
    var timeid = setInterval(setinterval, 2000)
    // 动态监听每次ul的动画完成之后，当前index的值的变化
    ul.addEventListener('transitionend', function () {
      if (index >= lis.length - 1) {
        // 当索引值在最后一张动画完成后更新大于8后
        index = 1;//将index的值改为1
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + (-index) * lis[0].offsetWidth + 'px)';
      }
      if (index <= 0) {
        index = 8;
        //去掉过渡
        ul.style.transition = 'none';
        //ul瞬移到真正的第一张图片,进行重合实现无缝
        ul.style.transform = 'translateX(' + (-index * width) + 'px)';
      }
      //让对应下标的小圆点高亮
      curcels.forEach(function (v, i) {
        v.classList.remove('current');
      })
      curcels[index - 1].className = 'current';
    })


    var startx = 0;
    var targetx = 0;
    var distancex = 0;
    ul.addEventListener('touchstart', function (e) {
      // 先清除定时器
      clearInterval(timeid);
      ul.style.transition = "none";
      startx = e.targetTouches[0].pageX;
    })
    ul.addEventListener('touchmove', function (e) {
      targetx = e.targetTouches[0].pageX;
      distancex = targetx - startx;
      console.log(distancex);
      //滑动，让ul跟上手指滑动
      ul.style.transform = 'translateX(' + (-index * width + distancex) + 'px)';


    })
    ul.addEventListener('touchend', function (e) {
      ul.style.transition = "transform 0.5s";
      if (Math.abs(distancex) > width / 3) {
        if (distancex > 0) {
          index--;
          //  ul.style.transform = 'translateX(' + (-index * width) + 'px)';
        } else if (distancex < 0) {
          index++;
          // ul.style.transform = 'translateX(' + (-index * width) + 'px)';
        }
      }
      ul.style.transform = 'translateX(' + (-index * width) + 'px)';
      startx = 0;
      targetx = 0;
      distancex = 0;
      timeid = setInterval(setinterval, 2000);
    })
  }


})();