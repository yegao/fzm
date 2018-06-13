import axios from 'axios';
import qs from 'qs';
import object from './../object';
let methods = ['get','post','options','delete','head','put','patch'],restfuls = {};
for(let method of methods){
  restfuls[method] = (cors,...args) => {
    let _args,data;
    let headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
    if(cors === true){ //需要跨域
      Object.assign(headers,{
        'Access-Control-Allow-Headers':'X-Requested-With,content-type'
      });
    }
    else{
      args = [cors,...args];
    }
    if(['get','delete','head','options'].indexOf(method) > -1){
      _args = [args[0],{headers,...args[1]}];
    }
    else{
      if(0<headers['Content-Type'].indexOf('x-www-form-urlencoded')){
        //不直接qs.stringify(args[1])是因为args[1]有可能是undefined {...undefined} === {}
        console.log(args[1]);
        console.log({...args[1]});
        data = qs.stringify({...args[1]});
      }
      _args = [args[0],data,{headers,...args[1]}];
    }
    return axios[method](..._args).then((res)=>{
      return new Promise((resolve)=>{
        if(!object.hasOwnProps(res.data,'code','data','message')){
          throw new Error('返回的结果不规范');
        }
        if(res.data.code!=200){
          var warn = document.createElement('div');
          Object.assign(warn.style,{
            position: 'fixed',
            top: '10px',
            right: '4px',
            padding: '24px 16px 16px 16px',
            border: '1px solid #EEEEEE',
            background: '#FFFFFF',
            zIndex: 99,
            fontSize: '14px'
          });
          warn.innerHTML = res.data.message;
          document.body.appendChild(warn);
          throw new Error(res.data.message);
        }
        resolve(res.data.data);
      });
    },(err)=>{
      throw new Error(err);
    });
  }
}

export default restfuls;
