function set(name, value) {
  let Days = 30;
  let exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function get(name) {
  let arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}

function remove(name) {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let cval = get(name);
  if (cval != null){
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
}

export default {
  set,
  get,
  remove
}
