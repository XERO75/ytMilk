export default {
  install(Vue,options)
  {
    Vue.prototype.getNowFormatDate = function() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    };
  }
  // extend (a, b) {
  //   for (var i in b) {
  //     if (b.hasOwnProperty(i) && b[i]) {
  //       a[i] = b[i]
  //     }
  //   }
  // },
  // isParent (children, parent) {
  //   if (!parent) return false
  //   while (children) {
  //     if (children === parent) return true
  //     children = children.parentNode
  //   }
  //   return false
  // }
}
