import {FC} from "react";
import {Image, Text, View} from "@tarojs/components";
import {AtList, AtListItem, AtCard, AtRate} from "taro-ui"
import './index.less'
import A01 from "../../accects/images/p1.jpg";
import videoPic from '../../accects/images/videoPic.png'
import picture from '../../accects/images/picture.jpg'

export type unpassItem = {name:string,desc:string}
interface IProps{
  unpassList:unpassItem[]
}
type ItemType = {Imgsrc:string,title:string,content:string,price:number,rate:number}

const ItemListInfo:ItemType[]= [
  {Imgsrc:A01,title:'大数据哈多普和火花开发人员',content:'大数据哈杜普认证培训旨在让您使用哈多普和火花深入了解大数据框架。在这个动手的 Hadoop',price:23.13,rate:4.0},
  {Imgsrc:videoPic,title:'数据科学',content:'了解数据科学、机器学习和数据分析的基本知识，了解本数据科学硕士课程。这12个自定步调模块由',price:23.13,rate:4.0},
  {Imgsrc:picture,title:'领导才能/员工保留-招聘合适的人才',content:'市视力量理论，了解届项的五个特点,从四个方面建立优势对任何话况的信心,运用策略来管理劣势',price:23.13,rate:4.0},
]
const FixText_unpass:FC<IProps> = (props:IProps)=>{

  return (
    <View className='unpass_box'>


      <AtCard
        extra='详细信息'
        title='不符合条件'
        thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
        note={`共${props.unpassList.length}项`}
      >
        <AtList>
          {
            props.unpassList.map(item=>(
              <AtListItem title={item.name} note={item.desc} />
            ))
          }
        </AtList>
      </AtCard>
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

export default FixText_unpass
