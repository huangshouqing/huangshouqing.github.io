(function (){
  screentouch();
  function screentouch(){
    $('.carousel').carousel({
      interval: 2000
    })
    var strat=0;
    var end=0;
    var distance=0;
      $('.wjs-banner').on('touchstart',function(e){
        $('.carousel').carousel('pause');
      //  console.log(e.originalEvent.changedTouches[0].pageX);
       start=e.originalEvent.changedTouches[0].pageX;
      })
      $('.wjs-banner').on('touchend',function(e){

        // console.log(e.originalEvent.changedTouches[0].pageX);
        end=e.originalEvent.changedTouches[0].pageX;
        distance=end-strat;
        if(distance>0){
          $('.carousel').carousel('prev');

        }
        if(distance<0){
          $('.carousel').carousel('next');
        }
        $('.carousel').carousel('cycle');
       })
  }




})()