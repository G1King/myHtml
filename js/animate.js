$(function () {
       let current = 0;
       let timer = setInterval(function () {
           $('.bar').css('width', current + '%');
           current++;
           if (current > 100) {
               $('.pageLoading').addClass('complete')
               clearInterval(timer);
           }
       }, 30)
})