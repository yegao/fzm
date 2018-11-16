# fzm
https://www.33.cn

## 安装
npm install --save fzm

### restfuls、sp_restfuls的使用
```javascript
import {restfuls,sp_restfuls} from 'fzm'; //如果接口返回规范的数据格式(详情请看后面)那么使用restfuls,如果是不规范的则使用sp_restfuls
const api = {
  getRegisterState(params){ //判断是否已注册。注意!get方式的请求params外面需要包裹一个大括号
    return restfuls.get(注册的接口地址,{ params });
  },
  login(params){ //快速登录
    return restfuls.post(快速登录的接口地址,params);
  },
  getKlineDate(params) { //获取k线数据 `这个接口返回的数据格式是不规范的,所以使用sp_restfuls`
    return sp_restfuls.get(chartOrigin + "/kdata", {params});
  },
}
```
## 想要使用restfuls方法，则必须要求接口返回的数据格式符合如下结构:
```javascript
{
  code:200,
  data:{
    ...
  },
  message:"..."
}
```

### hook的使用
```javascript
import {hook} from 'fzm';
hook.before = function(){
  console.log("I will send a request")
}
hook.after = function(){
  console.log("response sucess")
}
hook.error = function(){
  throw new Error("error")
}
```

### date的使用
```javascript
import {date} from 'fzm';
let time = date.format("Y-M-D h:m:s",new Date().getTime()); // 2018-6-20 13:12:23
```

### object的使用
```javascript
let o = {
  a:'aaa',
  b:'bbb'
}

object.hasOwnProps(o,'a','b');
```
### 同时支持以下的使用方式
```javascript
import fzm from 'fzm';
fzm.notyf.confirm("成功!")
fzm.notyf.alert("失败!")
```
## 功能完成情况
- [x] ~~object~~
- [x] ~~date~~
- [x] ~~hook~~
- [x] ~~restfuls~~
- [x] ~~sp_restfuls~~  
- [x] ~~on_restfuls~~
- [x] ~~on_sp_restfuls~~  

## 发现BUG  
