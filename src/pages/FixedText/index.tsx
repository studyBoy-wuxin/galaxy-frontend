import {FC, useEffect, useState} from "react";
import { View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtDivider, AtIcon} from "taro-ui";
import FixTextunpass,{unpassItem} from "../../component/FixText_unpass";
import FixTextpass from "../../component/FixText_pass";
import './index.less'

const data:unpassItem[] = [
  {name:'资格证书',desc:'未包含计算机二级证书'},
  {name:'技能要求',desc:'未掌握java'},
  {name:'技能要求',desc:'后端不熟练'},
]

const FixedText:FC = ()=>{
  const [flag,setFlag] = useState<boolean>(false);
  useEffect(()=>{
    const a = Taro.getCurrentInstance().router?.params
    console.log(a?.key)
    parseInt(a?.key as string) === 8000 ? setFlag(true) : setFlag(false)
  },[])
  return (
    <View className='box'>
      <AtDivider>
        <AtIcon value='check-circle' /> 测试完成
      </AtDivider>
      {
        flag? <FixTextpass />: <FixTextunpass unpassList={data} />
      }
      <AtDivider lineColor='#f2f2f2' />

    </View>
  )
}
export default FixedText
