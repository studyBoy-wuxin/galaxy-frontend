import {FC, useEffect, useState} from "react";
import {View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import {AtCard, AtMessage} from "taro-ui";
import request from '../../util/request'
import './index.less'


type Certificate = {
  name:string,
  Time:string,
  Teacher:string,
  Description:string,
}

const CertificateInfo:FC = ()=>{
  const [CourseArr,setCourseArr] = useState<Certificate[]>([]);

  //根据用户id获取到相应的证书
  const getInfoByUser =async ()=>{
    try{
      //****
      const data = await request('/course/list')
      console.log(data)
      const a = data.data.resultMapList.map((item)=>({
        name:item.course.courseName,
        Time:item.course.courseTime,
        Teacher:item.course.courseTeacher,
        Description:item.course.courseDescription,
      }))
      console.log(a)
      setCourseArr(a)
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
          CourseArr?.map(item=>(
          <AtCard
            className='atcard'
            // note={`数字信息:${item.info}`}
            extra={`讲师:${item.Teacher}`}
            title={item.name}
          >
            <View className='card_View'>
              <View>课程时间:{item.Time}</View>
              <View>课程描述:{item.Description}</View>
            </View>
          </AtCard>

        ))
      }

    </View>
  )
}
export default CertificateInfo
