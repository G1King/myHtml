function Index() {
    this.dom = {
        img: $('img'),
        btn: $('.btn')
    }
    this.flag = true;
    this.bindEvent();
}
Index.prototype.bindEvent = function () {
    //绑定事件
    var self = this;
    var img = self.dom.img;
    let length = img.length;
    self.dom.btn.on('click',function () {
        if (!self.flag) {
            return;
        }
        let endNum = 0;
        self.flag = false;
         for (var i = 0; i < length; i++) {
             (function (i) {
                 setTimeout(function () {
                     self.monition(img[i], '1s', function () {
                         $(this).css({
                             'transform': 'scale(0)'
                         })
                     }, function () {
                         self.monition(this, '1s', function () {
                             $(this).css({
                                 'transform': 'scale(1)',
                                 'opacity': 0
                             })
                         }, function () {
                             endNum++;
                             if (endNum == length) {
                                 self.show();
                             }
                         })
                     })
                 }, Math.random() * 1000);
             })(i)
         }
    })
}
Index.prototype.monition = function (dom,time,doFunc,callBack) {
    var self = this;
    $(dom).css({
        'transition': time
    })
    doFunc.call(dom);
    var called = false;
    $(dom).on('transitionend', function () {
        if (!called) {
            callBack && callBack.call(dom);
            called = true;
        }
    })
    
}
Index.prototype.show = function () {
    var self = this;
     var img = self.dom.img;
     let length = img.length;
     var allEnd = 0 ;
     for (var i = 0; i < length; i++) {
         $(img[i]).css({
             'transition': '',
             'transform':'rotateY(0deg) translateY(-'+Math.random()*500+'px)'
         });
         (function (i) {
             setTimeout(function () {
                 self.monition(img[i],'2s',function () {
                     $(this).css({
                         'opacity':1,
                         'transform': 'rotateY(-360deg) translateZ(0)',
                     })
                 },function () {
                     allEnd ++;
                     if (allEnd == img.length) {
                         self.flag = true;
                     }
                 })
             },Math.random() * 1000);
         })(i)
         
     }
}
new Index();