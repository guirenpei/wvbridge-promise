# wvbridge-promise
transform javascriptwebviewbridge to promise
# install
`npm install wvbridge-promise`
# import or require module
```
import { bridge } from 'wvbridge-promise';
or
const { bridge } = 'wvbridge-promise';
```
## how to use
```
bridge是一个promise对象/bridge is a Promise Object
/**
 * @param {String} fn 注册的方法名称/registered function name in app
 * @param {String} type 事件类型/event type for yourself define
 * @param {Object} data 向app传输的数据/ data which transform to app
 */
bridge(fn, type, data).then(res => {
  console.log(res);
})
```
