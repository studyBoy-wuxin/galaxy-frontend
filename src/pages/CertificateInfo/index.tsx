import {FC, useEffect, useState} from "react";
import {View} from "@tarojs/components";
import {AtCard, AtMessage} from "taro-ui";
import Taro from '@tarojs/taro'
import request from '../../util/request'
import './index.less'


type Certificate = {
  name:string,
  getTime:string,
  info:string,
  score:number,
  Publisher:string,
  Reviewer:string
}
// ]
const CertificateInfo:FC = ()=>{
  const [CertificateArr,setCertificateArr] = useState<Certificate[]>([]);

  const ToTransactionPages = (item:any)=>{
    Taro.navigateTo({
      url:'/pages/TransactionPage/index?item='+JSON.stringify(item)
    })
  }

  //根据用户id获取到相应的证书
  const getInfoByUser =async ()=>{
    try{
      //****
      const data = await request('/certificate/listMine')
      console.log(data)
      const a = data.data.certificateList.map((item)=>({
        name:item.certificateType.certificateTypeName,
        getTime:item.certificatePublishTime,
        info:item.certificateSigning,
        score:item.certificateScore,
        Publisher:item.certificateType.certificateTypePublisher,
        Reviewer:item.certificateReviewer
      }))
      console.log(a)
      setCertificateArr(a)
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
    <View className='Certificate_box'>
      <AtMessage />
        {
        CertificateArr?.map(item=>(
          <AtCard
            className='atcard'
            note={`数字信息:${item.info}`}
            extra={item.getTime}
            title={item.name}
          >
            <View className='card_View' onClick={()=>{ToTransactionPages(item)}}>
              <View>分数:{item.score}</View>
              <View>颁发机构:{item.Publisher}</View>
              <View>审计人:{item.Reviewer}</View>
            </View>
          </AtCard>

        ))
      }

    </View>
  )
}
export default CertificateInfo
