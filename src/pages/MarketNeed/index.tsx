import {FC, useEffect, useState} from "react";
import {View, ScrollView, Text, Canvas} from "@tarojs/components";
import {AtIcon, AtMessage} from "taro-ui";
import Taro from "@tarojs/taro";
import './index.less'
import Charts from "../../util/wxcharts-min";
import request from "../../util/request";


//岗位，地点，薪水，描述
const scrollTop = 0
const Threshold = 20
const nameList = ['会计师','金融师','IT工程师','教师']
const colorList = ['rgb(194,209,254)','rgb(190,239,240)','rgb(246,202,202)','rgb(255,210,186)']
type JobInfoType = {certificateTypeList:any[],jobCompany:any,skillList:any}
type InfoListType = {
  name:string,
  smallName:string,
  someList:string[],
  JobInfo:JobInfoType
}

const xTitleList:string[] = ['财务','审计','税法','咨询']
const MarketNeed:FC = ()=>{
  const [InfoList,setInfoList] = useState<InfoListType[]>();

  const toMarketInfo = (data:JobInfoType)=>{
    console.log(data)
    Taro.navigateTo({
      url:'/pages/MarketInfo/index?JobInfo='+JSON.stringify(data)
    })
  }

  const getData =async ()=>{
    try{
      const data = await request('/jobCompany/list')
      const info = data.data.resultMapList.map(item=>({
        name:item.jobCompany.company.companyName,
        someList:[
          item.jobCompany.company.companyAddress,
          item.jobCompany.job.jobName,
          item.skillList[0].skillName,
          item.jobCompany.jobCompanySalary
        ],
        JobInfo:item
      }))
      console.log(info)
      setInfoList(info)
    }catch (e) {
      Taro.atMessage({
        'message': e,
        'type': 'error',
      })
    }
  }
  //初始化时给第一个元素加高亮
  useEffect(()=>{
    getData()

    //初始化图表
    new Charts({
      canvasId: 'canvas1',
      type: 'column',
      title:'bbb',
      categories: xTitleList,
      //放数据，多少个对象就有多少个列
      series: [{
        name: '数量',
        data: [15, 20, 45, 37],
        color:'rgb(236,209,164)'
      }],
      //y轴配置项
      yAxis: {
        format: (val)=>val + '万',
        title:'数量',
        min:0
      },
      //图标宽高
      width: 300,
      height: 200
    })
    const nameClassList =Array.from(document.getElementsByClassName('name'))
    nameClassList[0].classList.add('active')
  },[])
  //添加点击高亮的效果
  const handleClassName = (i:number)=>{
    const nameClassList =Array.from(document.getElementsByClassName('name'))
    nameClassList.forEach(item=> item.classList.remove('active') )
    nameClassList[i].classList.add('active')
  }


  return (
    <View className='marketNeed_box'>
      <AtMessage/>
      {/*头部导航栏*/}
      <ScrollView
        className='scrollView_View'
        scrollX
        enableFlex
        scrollWithAnimation
        scrollTop={scrollTop}
        lowerThreshold={Threshold}
        upperThreshold={Threshold}
        onScrollToUpper={()=>{}}
        onScroll={()=>{}}
      >
        {
          nameList.map((item,index)=>(
            <View className='name' onClick={()=>{handleClassName(index)}}>{item}</View>
          ))
        }
      </ScrollView>
      {/*图表区域*/}
      <View className='chart_box'>
        <Canvas className='canvas' canvas-id='canvas1'></Canvas>
        <View className='more'>
          更多
          <AtIcon value='chevron-right' size='15' color='black'></AtIcon>
        </View>
      </View>

      {/*公司信息*/}
      {
        InfoList?.map(item=>(
          <View className='track_box' onClick={()=>{toMarketInfo(item.JobInfo)}}>
            <View className='left'>
              <Text>{item.name}</Text>
              <Text>{item.smallName}</Text>
            </View>
            <View className='right'>
              {
                item.someList.map((value,i)=>(
                  <View style={{backgroundColor:colorList[i]}}>{value}</View>
                ))
              }
            </View>
            <View className='more'>
              <Text>更多</Text>
              <AtIcon value='chevron-right' size='15' color='black'></AtIcon>
            </View>
          </View>
        ))
      }

    </View>
  )
}
export default MarketNeed
