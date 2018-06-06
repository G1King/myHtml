(function($){
    $.fn.extend({
        'alert':function (opt) {
            var settings = $.extend({},defaultOpt,opt);
            $(this).each(function () {
                var html = "",title ='',message = '',sureButton = '',canleButton = '',footer=''
                if (settings.title != "") {
                    title = '<div><span class="alert-title">'+settings.title+'</span></div>';
                }else{
                    title = '<div><span class ="alert-title">提示</span></div>'
                }
                if (settings.message != "") {
                    message = '<div><p class = "alert-message" >'+settings.message+'</p></div>'
                }
                if (settings.sureButton) {
                    sureButton = '<div><span class = "alert-sureButton">' + settings.sureButtonTitle + '</span></div>'
                }
                
                if (settings.canleButton) {
                    canleButton = '<div><span class="alert-canleButton">' + settings.canleButtonTitle + '</span></div>'
                }
                footer = '<div class="alert-footer">' + sureButton + canleButton + '</div>'
                html = '<div class="alert-wrap">' + title + message + footer +'</div>';
               
              
                 $('body').append(html);
                  addCssStyle();
                  function addCssStyle() {
                      $('.alert-wrap').css({
                           'position': 'relative',
                           'display':'flex',
                           'flex-direction':'column',
                           'align-items':'center',
                           'padding':'10px 5px',
                           'width':'200px',
                           'background-color':'black',
                           'color': '#fff',
                           'font-size':'14px',
                           'border-radius':'5px',
                      })
                      $('.alert-footer').css({
                          'display': 'flex',
                          'flex-direction': 'row',
                          'align-self': 'auto'
                        
                      })
                      $('.alert-canleButton,.alert-sureButton').css({
                          'display': 'flex',
                          'justify-content':'center',
                          

                      })
                    
                    
                  }
                  $('.alert-sureButton').click(function(){
                      settings.callBack && settings.callBack.call(this);
                      setTimeout(function () {
                          $('.alert-wrap').remove();
                      }, 2000)
                  })
             })
        }
    });
    //默认参数
    var defaultOpt = {
        'title':"提示",
        'message':'',
        'sureButton':true,
        'canleButton':true,
        'sureButtonTitle': '确定',
        'canleButtonTitle': '取消'
    };

})(jQuery)