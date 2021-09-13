import {FC, useEffect, useState} from "react";
import {View} from "@tarojs/components";
import {AtAccordion, AtList, AtListItem} from "taro-ui";
import Taro from "@tarojs/taro";
import './index.less'


type courseType = {
  name:string,
  teacher:string,
  desc:string,
  time:string
}
const StudyPlan:FC = ()=>{
  const [open, setOpen] = useState<boolean>(true);
  const [open1, setOpen1] = useState<boolean>(true);
  const [open2, setOpen2] = useState<boolean>(true);
  const [AllCourseList,setAllCourse] = useState<courseType[]>([])
  const [StudyCourseList,setStudyCourseList] = useState<courseType[]>([])
  const [FinishedCourseList,setFinishedCourseList] = useState<courseType[]>([])

  useEffect(()=>{
    const a:any = Taro.getCurrentInstance().router?.params
    const data = JSON.parse(a.courseList)
    console.log(data)
    const AllCourse:courseType[] = data.map(item=>({
      name:item.course.courseName,
      teacher:item.course.courseTeacher,
      desc:item.course.courseDescription,
      time:item.course.courseTime
    }))
    setAllCourse(AllCourse)
    const FinishedCourse:courseType[] = data.filter(item=>item.courseUserProgress ===100.0).map(item=>({
      name:item.course.courseName,
      teacher:item.course.courseTeacher,
      desc:item.course.courseDescription,
      time:item.course.courseTime
    }))
    setFinishedCourseList(FinishedCourse)
    const setStudyCourse = data.filter(item=>item.courseUserProgress !==100.0).map(item=>({
      name:item.course.courseName,
      teacher:item.course.courseTeacher,
      desc:item.course.courseDescription,
      time:item.course.courseTime
    }))
    setStudyCourseList(setStudyCourse)
  },[])

  return (
    <View className='Studyplan_box'>
      <View>
        目标岗位:华为财务会计师
      </View>
      <View className='content'>
        <AtAccordion
          open={open}
          onClick={()=>setOpen(!open)}
          title='课程安排计划'
        >
          <AtList hasBorder={false}>
            {
              AllCourseList.map(item=>(
                <AtListItem
                  title={`${item.name}`}
                  extraText={`讲师:${item.teacher}`}
                  note={item.time}
                  arrow='right'
                />
              ))
            }
          </AtList>
        </AtAccordion>
      </View>

      <View className='content'>

        <AtAccordion
          open={open1}
          onClick={()=>setOpen1(!open1)}
          title='在学课程'
        >
          <AtList hasBorder={false}>
            {
              StudyCourseList.map(item=>(
                <AtListItem
                  title={`${item.name}`}
                  extraText={`讲师:${item.teacher}`}
                  note={item.time}
                  arrow='right'
                />
              ))
            }
          </AtList>
        </AtAccordion>
      </View>

      <View className='content'>

        <AtAccordion
          open={open2}
          onClick={()=>setOpen2(!open2)}
          title='已完成课程'
        >
          <AtList hasBorder={false}>
            {
              FinishedCourseList.map(item=>(
                <AtListItem
                  title={`${item.name}`}
                  extraText={`讲师:${item.teacher}`}
                  note={item.time}
                  arrow='right'
                />
              ))
            }
          </AtList>
        </AtAccordion>
      </View>
    </View>
  )
}
export default StudyPlan
