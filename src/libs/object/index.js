function hasOwnProps(obj, ...props) {
  if (Object.prototype.toString.call(obj) != "[object Object]") {
    throw new Error('the first augument of hasOwnProps must be a object!')
  }
  for (const prop of props) {
    if(obj instanceof Object){
      if (!obj.hasOwnProperty(prop)) {
        return false
      }
    }
    else if(!obj.prop){
      return false
    }
  }
  return true
}

function isPlain(obj) {
  return Object.getPrototypeOf(obj) === null || Object === obj.constructor
}

function pick(obj, key, value, returnkey) {
  for (let k in obj) {
    let one = obj[k];
    if (one[key] === value) {
      if (returnkey) {
        return [k, one]
      }
      else {
        return one;
      }
    }
  }
  return false;
}

function sort(obj, key) {
  let list = [];
  for (let k in obj) {
    list.push(obj[k][key])
  }
  list.sort(function (a, b) {
    return a - b;
  });
  let res = {};
  for (let j of list) {
    let temp = pick(obj, key, j, true);
    res[temp[0]] = temp[1];
  }
  return res;
}

function concat(object) {
  let temp = [];
  for (let k in object) {
    temp = temp.concat(object[k])
  }
  return temp;
}

export default {
  hasOwnProps,
  isPlain,
  pick,
  sort,
  concat
}
