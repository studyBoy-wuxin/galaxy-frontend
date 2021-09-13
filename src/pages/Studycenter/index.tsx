import {FC, useEffect, useState} from "react";
import {Image, ScrollView, Text, View} from "@tarojs/components";
import {AtCard, AtDivider, AtIcon, AtRate} from 'taro-ui'
import Taro from "@tarojs/taro";
import './index.less'
import A01 from "../../accects/images/pic.jpg";
import request from "../../util/request";


interface courseType{
  name:string,

}
const courseListInfo:courseType[] = [
  {name:'python数据可视化分析'},
  {name:'python数据可视化分析'},
  {name:'python数据可视化分析'},
  {name:'python数据可视化分析'},
  {name:'python数据可视化分析'},
  {name:'python数据可视化分析'},
  {name:'python数据可视化分析'},

]
type ItemType = {Imgsrc:string,title:string,content:string,price:number,rate:number}

const ItemListInfo:ItemType[]= [
  {Imgsrc:A01,title:'大数据哈多普和火花开发人员',content:'大数据哈杜普认证培训旨在让您使用哈多普和火花深入了解大数据框架。在这个动手的 Hadoop',price:23.13,rate:4.0},
  {Imgsrc:A01,title:'数据科学',content:'了解数据科学、机器学习和数据分析的基本知识，了解本数据科学硕士课程。这12个自定步调模块由',price:23.13,rate:4.0},
  {Imgsrc:A01,title:'领导才能/员工保留-招聘合适的人才',content:'市视力量理论，了解届项的五个特点,从四个方面建立优势对任何话况的信心,运用策略来管理劣势',price:23.13,rate:4.0},
]
const colorList = ['rgb(197,238,240)','rgb(188,201,247)','rgb(240,124,121)','rgb(252,208,178)']
const Studycenter:FC = ()=>{

  const [courseList,setCourseList] = useState<courseType[]>(courseListInfo)
  const [courseData,setCourseData] = useState()

  const ToStudyPlan = (data:any)=>{
    Taro.navigateTo({
      url:'/pages/StudyPlan/index?courseList='+JSON.stringify(data)
    })
  }

  const getData =async ()=>{
    const data = await request('/courseUser/listMine')
    Taro.setStorage({
      key:'data',
      data
    })

    const a:any = []
    //可以做一个课程详情的
    const courseInfo = data.data.resultMapList.map(item=>{
      a.push(item.courseUser)
      return {
        name:item.courseUser.course.courseName
      }
    })
    setCourseData(a)
    setCourseList(courseInfo)
  }

  useEffect(()=>{
    getData()
  },[])
  return (
    <View className='studycenter_box'>
      <View className='header' onClick={()=>{ToStudyPlan(courseData)}} >
        <View className='studyplan'>
          学习计划
        </View>
        <View className='scroll_box'>

          <ScrollView
            scrollY
            enableFlex
            className='course'
          >
            {
              courseList.map((item,i)=>(
                <View className='item' style={{backgroundColor:colorList[i]}}>
                  {item.name}
                  <AtIcon value='chevron-right' size='20' color='black'></AtIcon>
                </View>
              ))
            }
          </ScrollView>

        </View>
      </View>
      <AtDivider lineColor='#f2f2f2' />
      <View className='recommendContainer'>
        <View className='top'>
          <Text className='font2'>为您精心推荐</Text>
          <Text className='font3'>查看更多</Text>
        </View>
        <View className='atcard_box'>
          {
            ItemListInfo.map(item=>(
              <AtCard
                className='atCard'
              >
                <View className='scroll_item'>
                  <Image className='image' src={item.Imgsrc} />
                  <View className='desc'>
                    <View className='title'>
                      {item.title}
                    </View>
                    <View className='content'>
                      {item.content}
                    </View>
                  </View>
                  <View className='other'>
                    <Text className='price'>{item.price}</Text>
                    <View className='rate_box'>
                      <AtRate className='rate' size={10} value={item.rate} />
                      ({item.rate}评分)
                    </View>
                    <Text className='moreDesc'>
                      详
                    </Text>
                  </View>
                </View>
              </AtCard>
            ))
          }
        </View>
      </View>
    </View>
  )
}
export default Studycenter
