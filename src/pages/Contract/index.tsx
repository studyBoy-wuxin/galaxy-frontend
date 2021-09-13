import {FC, useEffect, useState} from "react";
import {View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import {AtCard, AtMessage} from "taro-ui";
import request from '../../util/request'
import './index.less'


type Certificate = {
  name:string,
  startTime:string,
  endTime:string,
  type:string,
  Organization:string
}

const CertificateInfo:FC = ()=>{
  const [ExperienceArr] = useState<Certificate[]>([]);

  //根据用户id获取到相应的证书
  const getInfoByUser =async ()=>{
    try{
      //****
      const data = await request('/contract/listMine')
      console.log(data)
      // const a = data.data.experienceList.map((item)=>({
      //   name:item.experienceName,
      //   startTime:item.experienceStartTime,
      //   endTime:item.experienceEndTime,
      //   type:item.experienceDescription,
      //   Organization:item.experienceOrganization,
      // }))
      // console.log(a)
      // setExperience(a)
    }catch (e) {
      Taro.atMessage({
        'message': e,
        'type': 'error',
      })
    }
  }
  useEffect(() => {
    getInfoByUser()
  }, []);

  return (
    <View className='Experience_box'>
      <AtMessage />
        {
          ExperienceArr?.map(item=>(
          <AtCard
            className='atcard'
            // note={`数字信息:${item.info}`}
            // extra={`${item.startTime}-${item.endTime}`}
            title={item.name}
          >
            <View className='card_View'>
              <View>类型:{item.type}</View>
              <View>所属机构:{item.Organization}</View>
              <View>比赛时间:{item.startTime}-{item.endTime}</View>
            </View>
          </AtCard>

        ))
      }

    </View>
  )
}
export default CertificateInfo
