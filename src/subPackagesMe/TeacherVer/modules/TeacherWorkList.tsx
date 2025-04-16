/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:12
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-12-17 00:55:41
 * @FilePath: /zulinV3.1/src/pages/Me/modules/MyOrder.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect, useRef, useDidShow } from "@tarojs/taro";
import { AtButton, AtCalendar, AtInput, AtList, AtListItem, AtRadio, AtTag } from "taro-ui";

import { Picker, View } from "@tarojs/components";
import "../index.scss";
import { getTeacherVerService, getTeacurstatusmodifyService, getTeaworklistService } from "../services";
import { showSuccessToast } from "@/utils/util";
import { status_map } from "../constants";
import { tea_wstatus } from "@/constants/index";

const defaultForm: { [key: string]: any } = {};



const TeacherWork = () => {

  const [teacherWork, setTeacherWork] = useState<any>([]);
  const [selectInfo, setSelectInfo] = useState<any>({});
  const handleGetOrder = () => {
    const token = Taro.getStorageSync('teacherToken');
    getTeaworklistService({ token, count: 999999 }).then(res => {
      if (Array.isArray(res.teaworklist) && res.teaworklist.length > 0) {
        setTeacherWork(res.teaworklist || [])
        return
      }
      setTeacherWork([])
    })
  }

  const handleSelect = (e: any) => {
    console.log(e)
    const { value } = e;
    const res = teacherWork.find(item => item.cdate === value);
    if (res) {
      setSelectInfo(res)
    } else {
      setSelectInfo({ cdate: e.value, status: 0 })
    }
  }

  useEffect(() => {
    console.log('useEffect')
    handleGetOrder()
  }, [])

  return (
    <View className="tea-work-wrap">
      <AtCalendar marks={teacherWork.map(item => ({ ...item, value: item.cdate }))} onDayClick={handleSelect} />
      {
        selectInfo.cdate && (
          <View className="tea-work-info">
            <View className="tea-work-time"> {selectInfo.cdate}: </View>
            <View className={selectInfo.status == 0 ? "tea-work-tag" : "tea-work-tag tea-work-tag-red"}>{tea_wstatus[selectInfo.status || 0]}</View>
          </View>
        )
      }
    </View>
  );
};

export default TeacherWork;
