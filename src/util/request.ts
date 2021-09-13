import {axios} from 'taro-axios'
import Taro from '@tarojs/taro'
// 封装功能方法
type IMethod = 'GET'|'POST'|'DELETE'|'PATCH'

const request = (url :string, params?:{[name:string]:any}, method:IMethod = 'GET' )=> axios({
    baseURL:'http://localhost:80',
    timeout:5000,
    url,
    method,
    params,
    headers: {
      'token':Taro.getStorageSync('token')
    },
  }).then(resp=>Promise.resolve(resp.data))
    .catch(err=>Promise.reject(err.message))
export default request
