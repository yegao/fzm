const format = function(rule, stamp){
  var date = stamp && new Date(parseInt(stamp) * 1000) || new Date();
  var FORMAT = {
    Y(){
      return date.getFullYear()
    },
    M(){
      return date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    },
    D(){
      return date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    },
    h(){
      return date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    },
    m(){
      return date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    },
    s(){
      return date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    }
  }
  for (var i in FORMAT) {
    if (rule.indexOf(i) != -1) {
      rule = rule.replace(i, FORMAT[i]);
    }
  }
  return rule;
}
export default {
  format
}
