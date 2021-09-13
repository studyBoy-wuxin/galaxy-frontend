import {FC, useEffect, useState} from "react";
import { View} from "@tarojs/components";
import {AtCard, AtAccordion, AtListItem, AtList, AtToast} from "taro-ui";
import Taro from "@tarojs/taro";
import './index.less'

type workType = {name:string,value:string}
type abilityType = {title:string,value:string}

const workListInfo:workType[] = [
  {name:'工作岗位',value:'前端开发师'},
  {name:'工作地点',value:'广东工业大学龙洞校区'},
  {name:'工作薪酬',value:'100000'},
]
const abilityListInfo:abilityType[] = [
  {title:'课程绩点',value:'4.0'},
  {title:'相关证书',value:'初级会计师症'},
  {title:'相关比赛个数',value:'3'},
  {title:'相关推荐',value:'内部推荐'},

]
const MarketInfoL:FC = ()=>{
  const [workList,setWorkList] = useState<workType[]>(workListInfo);
  const [certificateList,setCertificateList] = useState<abilityType[]>(abilityListInfo);
  const [SkillList,setSkillList] = useState<abilityType[]>(abilityListInfo);
  const [open1, setOpen1] = useState<boolean>(true);
  const [open2, setOpen2] = useState<boolean>(true);
  const [tip,setTip] = useState()
  const [open3,setOpen3] = useState(false)
  useEffect(()=>{
    const a:any = Taro.getCurrentInstance().router?.params
    const data = JSON.parse(a.JobInfo)
    setTip(data.jobCompany.company.companyDescription)
    const workInfo:workType[] = [
      {name:'公司名称',value:data.jobCompany.company.companyName},
      {name:'联系方式',value:data.jobCompany.company.companyPhone},
      {name:'工作岗位',value:data.jobCompany.job.jobName},
      {name:'工作地点',value:data.jobCompany.company.companyAddress},
      {name:'工作薪酬',value:data.jobCompany.jobCompanySalary},
      {name:'工作描述',value:data.jobCompany.jobCompanyDescription},
    ]
    setWorkList(workInfo)
    const certificateInfo:abilityType[] = []
    data.certificateTypeList.forEach((item,index)=>{
      certificateInfo.push({title:`证书要求${index+1}`,value:item.certificateTypeName})
    })
    setCertificateList(certificateInfo)
    const SkillInfo:abilityType[] = []
    data.skillList.forEach((item,index)=>{
      SkillInfo.push({title:`技能要求${index+1}`,value:item.skillName})
    })
    setSkillList(SkillInfo)
    console.log(workInfo)
  },[])
  return(
    <View className='info_box'>
      <AtToast isOpened={open3} text='正在加载...' icon='loading' status='loading' />
      <View className='header'>
        <AtCard
          className='card'
          note={tip}
          extra='契合测试 >'
          title='职位描述'
          onClick={()=>{
            setOpen3(true)
            setTimeout(()=>{
              setOpen3(false)
              Taro.navigateTo({url:'/pages/FixedText/index?key='+workList[4].value})
            },2000)
          }}
        >
          <View className='card_text_box'>
            {
              workList.map((item,index)=>(
                index < 5 ? <View>{item.name}:{item.value}</View>:null
              ))
            }
            <View>
              {
                workList.map((item,index)=>(
                  index === 5 ? <View>{item.name}:{item.value}</View>:null
                ))
              }
            </View>
          </View>
        </AtCard>
      </View>
      <View className='content'>
        <AtAccordion
          open={open1}
          onClick={()=>setOpen1(!open1)}
          title='证书要求'
        >
          <AtList hasBorder={false}>
            {
              certificateList.map((item,index)=>(
                <AtListItem
                  title={`${index+1}、${item.title}`}
                  extraText={item.value}
                />
              ))
            }
          </AtList>
        </AtAccordion>
        <AtAccordion
          open={open2}
          onClick={()=>setOpen2(!open2)}
          title='技能要求'
        >
          <AtList hasBorder={false}>
            {
              SkillList.map((item,index)=>(
                <AtListItem
                  title={`${index+1}、${item.title}`}
                  extraText={item.value}
                />
              ))
            }
          </AtList>
        </AtAccordion>
      </View>
    </View>
  )
}
export default MarketInfoL
