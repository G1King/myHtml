/*
 * @Author: Leo 
 * @Date: 2018-07-02 14:36:28 
 * @Last Modified by: Leo
 * @Last Modified time: 2018-07-09 13:28:10
 */
window.onload = function () {
    beginBanner();
}
window.onresize = function () {
    setTimeout(function () {
        window.location.reload();
    }, 200);
}

// 首页轮播
function beginBanner() {
    var banner = document.getElementsByClassName('jd-banner')[0];
    var bannerW = banner.offsetWidth;
    var imageBox = banner.getElementsByTagName('ul')[0];
    var indictiorBox = banner.getElementsByTagName('ol')[0];
    var allPoit = indictiorBox.getElementsByTagName('li');

    var addTransiotion = function () {
        imageBox.transition = 'all .2s ease';
    }
    var removeTrnasiotion = function () {
        imageBox.style.transition = 'none';
    }
    var changeTranslateX = function (x) {
        imageBox.style.transform = 'translateX(' + x + 'px)';
    }
    var index = 0;
    var timer = null;
    timer = setInterval(scrollImage,1000);
   function scrollImage(){
          
          addTransiotion();
          
           if (index == 10) {
               index = 0;
               removeTrnasiotion();
           } 
           
           changeTranslateX(-index * bannerW);
           console.log(index);
           changeIndictior(index);
           index++;
    }

  function  changeIndictior(x){
             for (let i = 0; i < allPoit.length; i++) {
                 allPoit[i].className = '';
                 
             }
            allPoit[x].className = 'current';
   }
         
           

    
}