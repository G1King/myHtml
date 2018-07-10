window.mjd = {};
mjd.transitionEnd =function (obj,callBack) {
    if (typeof obj != 'object') {
        return;
    }
    obj.addEventListener('transitionEnd', function (e) {
          callBack && callBack(e);        
    })
      obj.addEventListener('webkitTransitionEnd', function (e) {
          callBack && callBack(e);
      })
}