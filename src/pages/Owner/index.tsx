import {FC, useEffect, useState} from "react";
import {View, Text} from '@tarojs/components'
import Taro from '@tarojs/taro'
import {AtAvatar, AtList, AtListItem, AtMessage, AtModal} from "taro-ui";
import request from "../../util/request";
import './index.less'

type contentItem = {imgUrl:string,desc:string,color:string}
type UserType = {
  userOpenid:string,
  userNickName:string,
  userAvatarUrl:string,
  userCity:string,
  userGender:string
  userProvince:string,
  userSchool:string,
  userRealName:string,
  userMajor:string
}
const initUser:UserType = {
  userOpenid:'',
  userNickName:'游客',
  userAvatarUrl:'',
  userCity:'',
  userGender:'',
  userProvince:'',
  userSchool:'无',
  userRealName:'无名氏',
  userMajor:'无',
}
const Owner:FC = ()=>{
  const ToPages = (type:string)=>{
    type === 'icon-heyueguanli' &&Taro.navigateTo({url:'/pages/CertificateInfo/index'})
    type === 'icon-geren6' &&Taro.navigateTo({url:'/pages/Experience/index'})
    type === 'icon-kechengguanli' &&Taro.navigateTo({url:'/pages/CourseInfo/index'})
    type === 'icon-huojiang' &&Taro.navigateTo({url:'/pages/CertificateInfo/index'})
  }

  const contentItemInfo:contentItem[] = [
    {imgUrl:'icon-huojiang',desc:'证书信息',color:'rgb(90,115,215)'},
    {imgUrl:'icon-kechengguanli',desc:'课程记录',color:'rgb(118,202,209)'},
    {imgUrl:'icon-geren6',desc:'个人经历',color:'rgb(247,162,162)'},
    {imgUrl:'icon-heyueguanli',desc:'合约管理',color:'rgb(241,183,114)'},
  ]
  const footerItemInfo:contentItem[] = [
    {imgUrl:'clock',desc:'数据审查',color:''},
    {imgUrl:'phone',desc:'权限信息',color:''},
    {imgUrl:'mail',desc:'个人信用信息',color:''},
    {imgUrl:'map-pin',desc:'审计/访问记录',color:''},
  ]

  const [contentItem] = useState<contentItem[]>(contentItemInfo);
  const [footerItem] = useState<contentItem[]>(footerItemInfo);
  const [isOpened,setIsOpen] = useState(false)
  const [userInfo,setUserInfo] = useState<UserType>(initUser);

  useEffect(()=>{
    Taro.login({
      success:async (res) =>{
        try{
          const result =await request('/user/login',{code:res.code},'POST')
          const {token,user} = result.data.resultMap
          console.log(result)
          //如果用户头像不存在，说明在数据库没记录,展开模态窗口点击确认按钮
          //有新的的话，把信息渲染出来
          if(user.userAvatarUrl) setUserInfo(user)
          //将用户信息存到本地
          Taro.setStorage({
            key:'userInfo',
            data:user
          })
          //将token存到本地
          Taro.setStorage({
            key:"token",
            data:token
          })

        }catch (e) {
          console.log(e)
          Taro.atMessage({
            'message': e,
            'type': 'error',
          })
        }
      }
    })
  },[])

  const login = ()=>setIsOpen(true)
  //用户点击模态框的确认之后，获取用户的信息
  const ModalConfirm = ()=>{
    Taro.getUserProfile({
      success:async resp =>{
        /*  成功获取到用户信息后
        *   1、将用户信息发送到后端存储
        *   2、将用户信息存到storage中
        * */
        console.log(resp)
        try{
          const user = Taro.getStorageSync('userInfo')
          user.userAvatarUrl = resp.userInfo.avatarUrl
          user.userNickName = resp.userInfo.nickName
          user.userCity = resp.userInfo.city
          user.userGender = resp.userInfo.gender
          user.userProvince = resp.userInfo.province
          console.log(user)
          //存到内存中
          Taro.setStorage({
            key:"userInfo",
            data:user
          })
          setUserInfo(user)
          const result = await request('/user/save',user,'POST')
          console.log(result)
        }catch (e) {
          Taro.atMessage({
            'message': e,
            'type': 'error',
          })
        }

      },
      fail:err => Taro.atMessage({
        'message': err.errMsg,
        'type': 'error',
      }),
      desc:'获取你的昵称、头像、地区及性别'
    })
    setIsOpen(false)
  }
  const ModalCancel = ()=>{
    Taro.atMessage({
      'message': '需要登录才能使用小程序',
      'type': 'error',
    })
  }
  return (
    <View className='Owner_box'>
      <AtMessage />
      <AtModal
        isOpened={isOpened}
        onConfirm={ModalConfirm}
        onCancel={ModalCancel}
        cancelText='取消'
        confirmText='确认'
        content='将获取你的昵称、头像、地区及性别'
        title='温馨提示'
      />

      <View className='Owner_header'>
        <View className='top'>
          <View className='avatar_box'>
            <View className='avatar' onClick={login}>
                <AtAvatar circle text='登录' image={userInfo.userAvatarUrl===''?undefined:userInfo.userAvatarUrl} />
            </View>
            <View className='stuInfo'>
              <View className='stuInfo_View1'>
                <Text>姓名: {userInfo.userRealName}</Text>
                <Text>学校: {userInfo.userSchool}</Text>
                <Text>专业: {userInfo.userMajor}</Text>
              </View>
            </View>
          </View>
          <View className='update_box'>
            <View className='update'>
              完善信息
            </View>
          </View>
        </View>
        <View className='bottom'>
          <View>职业能力评分</View>
        </View>
      </View>
      <View className='Owner_middle'>
        {
          contentItem?.map(item=>(
            <View className='contentItem' key={item.desc} onClick={()=>ToPages(item.imgUrl)}>
              <View className={`iconfont ${item.imgUrl}`} style={`font-size:30PX;color:${item.color};`} />
              <View className='item_desc'>{item.desc}</View>
            </View>
          ))
        }
      </View>
      <View className='Owner_footer'>

        <AtList>
          {
            footerItem.map(item=>(
              <AtListItem
                title={item.desc}
                note='描述信息'
                arrow='right'
                iconInfo={{ size: 25, color: '#78A4FA', value: item.imgUrl, }}
              />
            ))
          }
        </AtList>
      </View>
    </View>
  )
}
export default Owner
