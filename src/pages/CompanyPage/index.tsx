import {FC, useEffect} from "react";
import { Canvas, View} from "@tarojs/components";
import {AtIcon, AtCard, AtList, AtListItem} from "taro-ui";
import Taro from '@tarojs/taro'
import Charts from "../../util/wxcharts-min";
import './index.less'

type InfoType = {name:string,job:string,time:string}
const xTitleList:string[] = ['总投递','通过数','不符合']
const Info:InfoType[] = [
  {name:'肖宇翔',job:'高级架构师',time:'2021-09-05'},
  {name:'肖晓娟',job:'初级架构师',time:'2021-09-06'},
  {name:'莉莉',job:'会计',time:'2021-09-07'},
]
const CompanyPage:FC = ()=>{

  const toPage = ()=>{
    Taro.navigateTo({
      url:'/pages/CertificateInfo/index'
    })
  }
  useEffect(()=>{
    new Charts({
      canvasId: 'canvas1',
      type: 'column',
      title:'bbb',
      categories: xTitleList,
      //放数据，多少个对象就有多少个列
      series: [{
        name: '数量',
        data: [100,20,80],
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
  },[])

  return(
    <View className='company_box'>
      <View className='chart_box'>
        <Canvas className='canvas' canvas-id='canvas1'></Canvas>
        <View className='more'>
          更多
          <AtIcon value='chevron-right' size='15' color='black'></AtIcon>
        </View>
      </View>

      {
        Info.map(item=>(
          <View className='send_box'  onClick={toPage}>
            <AtCard
              className='atcard'
              note='小Tips'
              extra='详细信息'
              title='契合度80%'
              thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
            >
              <AtList>
                <AtListItem
                  title='姓名'
                  note={item.name}
                  iconInfo={{ size: 20, color: '#78A4FA', value: 'user', }}
                />
                <AtListItem
                  title='应聘岗位'
                  note={item.job}
                  iconInfo={{ size: 20, color: '#78A4FA', value: 'file-generic', }}
                />
                <AtListItem
                  title='投递时间'
                  note={item.time}
                  iconInfo={{ size: 20, color: '#78A4FA', value: 'calendar', }}
                />
              </AtList>

            </AtCard>
          </View>
        ))
      }


    </View>
  )
}
export default CompanyPage
