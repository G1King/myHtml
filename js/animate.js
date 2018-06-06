$(function () {
       let current = 0;
       let timer = setInterval(function () {
           $('.bar').css('width', current + '%');
           current++;
           if (current > 100) {
               $('.pageLoading').addClass('complete')
              setTimeout(() => {
                  $('.monsterText').html('WE<br>ARE<br>SQUARE<br>MONSTER');
              }, 3000);
              clearInterval(timer);
           }
           
       }, 30)
       
})