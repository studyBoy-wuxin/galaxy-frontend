import {FC, useEffect, useState} from "react";
import {View} from "@tarojs/components";
import {AtAccordion, AtList, AtListItem } from "taro-ui"
import Taro from '@tarojs/taro'

type InfoType = {
  name:string,
  time:string,
  desc:string,
  hash:string
}
const TransactionPage:FC = ()=>{
  const [Info,setInfo] = useState<InfoType>({name:'',time:'',desc:'',hash:''})
  const [open,setOpen] = useState<boolean>(true)
  const [realName,setRealName] = useState('无名氏')

  useEffect(()=>{
    const a:any = Taro.getCurrentInstance().router?.params
    const data = JSON.parse(a.item);
    const b:InfoType={name:'',time:'',desc:'',hash:''};
    b.name = data.Publisher
    b.time = data.getTime
    b.desc = data.name
    b.hash = data.info
    setInfo(b)
    setRealName(Taro.getStorageSync('userInfo').userRealName)
  },[])

  return (
    <View className='Transaction_box'>
      <AtList>
        <AtAccordion
          open={open}
          onClick={()=>setOpen(!open)}
          title='交易对象'
        >
          <AtList hasBorder={false}>
            <AtListItem
              note={Info.name}
            />
            <AtListItem
              note={realName}
            />
          </AtList>
        </AtAccordion>
        <AtAccordion
          open={open}
          onClick={()=>setOpen(!open)}
          title='交易时间'
        >
          <AtList hasBorder={false}>
            <AtListItem
              note={Info.time}
            />
          </AtList>
        </AtAccordion>
        <AtAccordion
          open={open}
          onClick={()=>setOpen(!open)}
          title='交易事项'
        >
          <AtList hasBorder={false}>
            <AtListItem
              note={`${Info.desc}证书发放`}
            />
          </AtList>
        </AtAccordion>
        <AtAccordion
          open={open}
          onClick={()=>setOpen(!open)}
          title='HASH编码'
        >
          <AtList hasBorder={false}>
            <AtListItem
              note={Info.hash}
            />
          </AtList>
        </AtAccordion>
      </AtList>
    </View>
  )
}
export default TransactionPage
