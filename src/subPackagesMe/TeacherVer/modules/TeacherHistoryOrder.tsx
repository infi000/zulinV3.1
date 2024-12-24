/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:12
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-12-17 00:55:41
 * @FilePath: /zulinV3.1/src/pages/Me/modules/MyOrder.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect, useDidShow } from "@tarojs/taro";

import { View } from "@tarojs/components";
import "../index.scss";
import { getTeaorderlistService } from "../services";
import { order_status_map } from "../constants";

const defaultForm: { [key: string]: any } = {};



const TeacherHistoryOrder = () => {

  const [teacherOrder, setTeacherOrder] = useState<any>([]);

  const handleGetOrder = () => {
    const token = Taro.getStorageSync('teacherToken');
    getTeaorderlistService({ token, otype: 2, count: 999999 }).then(res => {
      setTeacherOrder(res.teaorderlist || [])
      // setTeacherOrder(historyOrder)
    })
  }

  useEffect(() => {
    handleGetOrder()
  }, [])

  useDidShow(() => {
    handleGetOrder()
  })

  return (
    <View className="tea-order-list">
      {
        teacherOrder.map(item => {
          return <View className='tea-order-item'>
            <View className='at-row at-row__justify--between tea-order-item-title'>
              <View className='at-col'>{item.etitle} {item.ectitle} </View>
              <View className='at-col'>状态:【{order_status_map[item.status]}】</View>
            </View>
            <View className="tea-order-item-content">时间：{item.starttime} ~ {item.endtime}</View>
            <View className="tea-order-item-content">学生：{item.nickname}</View>
          </View>
        })
      }
    </View>
  );
};

export default TeacherHistoryOrder;
