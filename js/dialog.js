
;(function($){
    if($('.dialogs').length ==0) {
        $.fn.dialog=function(opt){
            return $(this).each(function(){
                var _default={
                        width:"400",
                        height:"auto",
                        title:"提 示",
                        titalign:'center',
                        content:"",
                        imgWidth:0,
                        imgHeight:0,
                        buttons:[],
                        mask:true,
                        border:0,
                        borderColor:'',
                        hide:"",//几秒隐藏
                        speed:500,//动画速度
                        distance:300,
                        closeBtn:true,
                        open:null,
                        animates:['fadein'],//[fadein,fadein-top,fadein-left] 动画方式
                    },
                    settings=$.extend(_default,opt);

                //整体结构
                var html="",dialog="",close="",tit="",cont="",footer="",newBtn="";

                //关闭按钮
                if(settings.closeBtn){
                    close='<span class="dialog-close"></span>';
                }else{
                    close="";
                }
                //判断是否有遮罩
                if(settings.mask){
                    mask='<div class="dialog-mask"></div>';
                }else{
                    mask = '';
                }

                //判断是否有标题
                if(settings.title!==""){
                    tit = '<div class="dialog-hd">'+close+settings.title+'</div>';
                }

                //内容
                cont = '<div class="dialog-bd">'+settings.content+'</div>';
                //iframe
                if(settings.open != null ) {
                    cont = '<div class="dialog-bd"><iframe id="myIframe" src="' + settings.open + '" scrolling="no" frameborder="0"></iframe></div>';
                }
                //底部按钮
                if(settings.buttons.length !=0){
                    for(var i=0,len=settings.buttons.length;i<len;i++){
                        newBtn +='<a  href="javascript:void(0);" class="dialog-btn" id="btn_'+i+'"">'+settings.buttons[i]+'</a>';
                    }
                    footer = '<div class="dialog-ft">'+newBtn+'<div>';
                }

                //判断是否有标题 或关闭按钮
                if(tit && tit!=""){
                    dialog="<div class='dialog'>"+tit+cont+footer+"<div>"
                }else{
                    dialog="<div class='dialog'>"+cont+footer+"<div>"
                }

                //是否自动隐藏
                if(settings.hide){
                    dialog="<div class='dialog ishide'>"+cont+footer+"<div>";
                    var timer=setTimeout(function(){
                        $('.dialog').animate({'opacity':0},settings.speed,"",function(){
                            $(".dialog-mask").remove();
                            $(".dialog").remove();
                        })
                    },settings.hide);

                }

                html=mask+dialog;
                if(!$('.mydialogs').hasClass('open') && ( $('.dialog').length == 0) ){
                    $('body').append(html);
                }else{
                    return;
                }
                var _mask = $(".dialog-mask");
                var _dialog = $(".dialog");
                //设置动画
                addAnimate('addClass');
                function addAnimate(method,obj){
                    var obj = obj || {};
            
                    for(var i=0; i<settings.animates.length;i++){
                        _dialog[method](settings.animates[i]);

                        if(obj.rm){
                            if(settings.animates[i] == 'fadein'){
                                _dialog.addClass('fadeout');
                                _mask.addClass('fadeout');
                            }
                        }

                    }

                    obj.callback && setTimeout(function(){
                        _mask.remove();
                        _dialog.remove();
                    },100);

                }

                //底部按钮事件
                settings.buttons.length != 0 && $(".dialog-ft").on("click","a",function(){
                    settings.callback && settings.callback.call(this);
                    addAnimate('removeClass',{rm:1,callback:1});
                });
                //关闭和遮罩
                if(settings.closeBtn) {
                    $('.dialog-close').bind({
                        click:function(){
                            addAnimate('removeClass',{rm:1,callback:1});
                        },
                        mouseover:function(){$(this).addClass('rotate-hover');},
                        mouseout:function(){$(this).removeClass('rotate-hover');}
                    });
                }

                if(settings.mask.clickHide){
                    _mask.on('click', function () {
                        addAnimate('removeClass',{rm:1,callback:1});
                    });
                }

                //设置初始样式样式设置
                cssStyle();
                function cssStyle(){
                    $('.dialog').css({'display':'block','width':settings.width,'height':settings.height+'px','position':'fixed','left':'0','right':'0','top':parseInt($(window).height() - $('.dialog').outerHeight()) / 2,'z-index':'10010'});
                    //显示边框
                    if(settings.border > 0){
                        $('.dialog').css({'border':settings.border+'px solid '+settings.borderColor});
                    }
                    if(settings.hide){
                        $('.dialog').css({'background':'rgba(0,0,0,.4','color':'#fff'});
                    }
                    $('.dialog-hd').css({'text-align':settings.titalign});
                    if(settings.titalign =='left'){
                        $('.dialog-hd').css('text-indent','15px');
                    }
                }
                //设置图标样式
                if(settings.content.indexOf('img') > -1){
                    if(settings.imgWidth !=0 && settings.imgHeight !=0){
                        $('.dialog-bd img').css({
                            'position':'absolute',
                            'top':'50%',
                            'left':'5%',
                            'width':settings.imgWidth+'px',
                            'height':settings.imgHeight+'px',
                            'margin-top':-settings.imgHeight/2+'px'});
                        $('.dialog-bd span').css({
                            'display':'inline-block',
                            'padding-left':settings.imgWidth+15+'px'
                        })
                    }
                }

            });
        };
    }
    $(function () {
        //dialogs
        $(".dialogs").each(function() {
            var e = $(this);
            var trigger = e.attr("data-toggle");

            if (trigger == "hover") {
                e.mouseover(function() {
                    //e.cur 定义现实状态 同一个页面必须关闭当前在打开下一个弹框
                    ($('.dialog').css('display')===undefined) && (e.cur === undefined ) && $showdialogs(e)
                })
            } else {
                if (trigger == "click") {
                    e.click(function() {
                        e.cur === undefined && $showdialogs(e);
                    })
                }
            }
        });
        $showdialogs = function(e) {
            var trigger = e.attr("data-toggle");
            var getid = e.attr("data-target");
            var data = e.attr("data-url");
            var mask = e.attr("data-mask");
            var width = e.attr("data-width");
            var textAlign = e.attr("data-align");
            var detail = "";
            var masklayout = $('<div class="dialog-mask"></div>');
            var animate    = ['fadein','fadein-top','fadein-bottom','fadein-left','bouncein'];
            var temp = "";
            if (width == null) {
                width = "80%"
            }
            if (mask == "1") {
                $("body").append(masklayout)
            }
            detail = '<div class="dialog-win" style="position:fixed;width:' + width + ';z-index:100;">';
            if (getid != null) {
                detail = detail + $(getid).html();
                temp = $(getid).detach()
            }
            if (data != null) {
                detail = detail + $.ajax({
                    url: data,
                    async: false
                }).responseText
            }
            detail = detail + "</div>";
            var win = $(detail);
            for(var i=0; i<animate.length;i++){
                if(e.hasClass(animate[i])){
                    win.find(".mydialogs").addClass("open"+" " +animate[i]);
                }else{
                    win.find(".mydialogs").addClass("open");
                }

            }
            $("body").append(win);
            function posCss() {
                var x = parseInt($(window).width() - win.outerWidth()) / 2;
                var y = parseInt($(window).height() - win.outerHeight()) / 2;
                if (y <= 10) {
                    y = 10
                }
                win.css({"left": 0, "top": y,"right":0, "margin":'auto'});
            }
            if(textAlign){ $('.dialog-hd').css('text-align',textAlign)};
            $(window).on('resize',posCss).trigger('resize');
            e.cur = 1;
            win.find(".dialog-close,.dialog-cancel,.btn-ok").each(function () {
                $(this).click(function () {
                    win.remove();
                    $(".dialog-mask").remove();
                    $("body").prepend(temp);
                    e.cur = undefined;
                });
            });
            masklayout.click(function () {
                win.remove();
                $(this).remove();
                $("body").prepend(temp);
                e.cur = undefined;
            });
        };

        //tips

    });
})(jQuery)

