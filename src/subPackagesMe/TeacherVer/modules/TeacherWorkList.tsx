/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:12
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-12-17 00:55:41
 * @FilePath: /zulinV3.1/src/pages/Me/modules/MyOrder.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect, useRef, useDidShow } from "@tarojs/taro";
import { AtButton, AtInput, AtList, AtListItem, AtRadio } from "taro-ui";

import { Picker, View } from "@tarojs/components";
import "../index.scss";
import { getTeacherVerService, getTeacurstatusmodifyService, getTeaworklistService } from "../services";
import { showSuccessToast } from "@/utils/util";
import { status_map } from "../constants";
import { tea_wstatus } from "@/constants/index";

const defaultForm: { [key: string]: any } = {};



const TeacherWork = () => {

  const [teacherWork, setTeacherWork] = useState<any>({});

  const handleGetOrder = () => {
    const token = Taro.getStorageSync('teacherToken');
    getTeaworklistService({ token, count: 999999 }).then(res => {
      setTeacherWork(res.teaworklist || [])
    })
  }

  useEffect(() => {
    handleGetOrder()
  }, [])

  useDidShow(() => {
    handleGetOrder()
  })

  return (
    <View>

      <View className='at-row'>
        <View className='at-col'>实验室</View>
        <View className='at-col'>学生姓名</View>
        <View className='at-col'>状态</View>
        <View className='at-col'>日期</View>
      </View>
      {
        teacherWork.map((item: any, index: number) => {
         return <View className='at-row'>

          <View className='at-col'>{tea_wstatus[item.status]}</View>
          <View className='at-col'>{item.cdate}</View>
        </View>
        })
      }

    </View>
  );
};

export default TeacherWork;
