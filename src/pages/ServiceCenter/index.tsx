import {FC, useState} from "react";
import {View, Swiper, SwiperItem, Image,Text} from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'
import picture from "../../accects/images/picture.jpg";
import huawei from "../../accects/images/huawei.png";
import p1 from '../../accects/images/p1.jpg'
import videoPic from '../../accects/images/videoPic.png'


const swiperListInfo = [picture,huawei]
const serviceListInfo = [
  {name:'市场需求',color:'rgb(172,185,248)',fontName:'icon-daohang-shichangbeifen-x'},
  {name:'资格证书',color:'rgb(108,197,206)',fontName:'icon-zigezhengshu'},
  {name:'赛事指引',color:'rgb(239,164,152)',fontName:'icon-saishi'},
]
const articleListInfo = [
  {title:'在华为云上做开发?这个大赛拿出30万寻找开源的你',imageurl:picture},
  {title:'使用Dash在 Python中开发数据可视化界面',imageurl:p1},
  {title:'Spring5学习笔记(七)JdbcTemplate全套CRUD详解',imageurl:huawei},
]
const ServiceCenter:FC = ()=>{
  const [swiperList] = useState(swiperListInfo);
  const [serviceList] = useState(serviceListInfo);
  const [articleList] = useState(articleListInfo);

  const toPage = ()=>{
    Taro.navigateTo({
      url:'/pages/MarketNeed/index'
    })
  }
  return(
    <View className='service_box'>
      <View className='swiper_box'>
        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          {
            swiperList.map(item=>(
              <SwiperItem className='swiper_item'>
                <Image src={item} className='image' />
              </SwiperItem>
            ))
          }
        </Swiper>
      </View>
      <View className='middle_service'>
        <View className='middle_service_view'>
          {
            serviceList.map(item=>(
                <View className='middle_service_item' style={{backgroundColor:item.color}} onClick={toPage}>
                  <View className={`iconfont ${item.fontName}`} style={{fontSize:30}} />
                  {item.name}
                </View>
            ))
          }
        </View>
      </View>

      <View className='daliyInfo'>

        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
        >
            <SwiperItem className='SwiperItem'>
              {/*<Video*/}
              {/*  id='video'*/}
              {/*  src='https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'*/}
              {/*  poster='https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'*/}
              {/*  initialTime={0}*/}
              {/*  controls*/}
              {/*  autoplay={false}*/}
              {/*  loop={false}*/}
              {/*  muted={false}*/}
              {/*/>*/}
              <Image id='video' src={videoPic} />
            </SwiperItem>
          <SwiperItem>B</SwiperItem>
          <SwiperItem>C</SwiperItem>
        </Swiper>
      </View>

      <View className='bottom'>
        {
          articleList.map(item=>(
            <View className='article'>
              <View className='left'>
                <Text className='title'>{item.title}</Text>
              </View>
              <View className='right'>
                <Image src={item.imageurl} />
              </View>
            </View>
          ))
        }
      </View>

    </View>
  )
}
export default ServiceCenter
