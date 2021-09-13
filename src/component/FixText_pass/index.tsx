import {FC, useState} from "react";
import {Text, View,Button} from "@tarojs/components";
import { AtCard, AtToast} from "taro-ui";
import Taro from '@tarojs/taro'
import './index.less'

const FixText_pass:FC = ()=>{
  const [isOpened,setOpen] = useState(false)

  const showMessage = () => {
    setOpen(true)
    setTimeout(()=>Taro.switchTab({url:'/pages/Owner/index'}),1000)
  }
  return (
    <View className='FixText_box'>
      <AtToast isOpened={isOpened} text='投递成功!' icon='check' duration={2000}></AtToast>
      <AtCard
        className='atcard'
        note='天下无难事，只怕有心人'
        title='测试结果'
        extra='测试通过'
        thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
      >
        <Text className='result'>
          您与华为公司的技术总监岗位的契合度为
          <Text style={{color:'rgb(109,215,213)'}}>80%</Text>
        </Text>
        <Button className='button' onClick={showMessage}>点击投递</Button>
      </AtCard>
    </View>
  )
}
export default FixText_pass
