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
import { getTeacherVerService, getTeacurstatusmodifyService, getTeaorderlistService } from "../services";
import { showSuccessToast } from "@/utils/util";
import { order_status_map, status_map } from "../constants";
import OrderCancel from "./OrderCancel";
import OrderRend from "./OrderRend";
import OrderCon from "./OrderCon";
import OrderEnd from "./OrderEnd";

const defaultForm: { [key: string]: any } = {};

type TCon = '取消订单' | '订单续时' | '确认下课' | '项目完结' | '列表';

const TeacherOrder = () => {

  const [teacherOrder, setTeacherOrder] = useState<any>([]);
  const [showCon, setShowCon] = useState<{type: TCon, data?: any}>({ type: '列表', data:{} });
  const handleGetOrder = () => {
    const token = Taro.getStorageSync('teacherToken');
    getTeaorderlistService({ token, otype: 1, count: 999999 }).then(res => {
      // setTeacherOrder(historyOrder)

      setTeacherOrder(res.teaorderlist || [])
    })
  }

  const handleClick = (e: any, d:any) => {
    setShowCon({
      type: e,
      data: d
    })
  }

  useEffect(() => {
    if(showCon.type === '列表'){
      handleGetOrder()
    }
  }, [showCon])

  useDidShow(() => {
    handleGetOrder()
  })
  console.log('teacherOrder', teacherOrder)
  return (
    <View>
      {
        showCon.type === '列表' && <View className="tea-order-list">
          {
            teacherOrder.map(item => {
              return <View className='tea-order-item'>
                <View className='at-row at-row__justify--between tea-order-item-title'>
                  <View className='at-col'>{item.etitle} {item.ectitle} </View>
                  <View className='at-col'>状态:【{order_status_map[item.status]}】</View>
                </View>
                <View className="tea-order-item-content">时间：{item.starttime} ~ {item.endtime}</View>
                <View className="tea-order-item-content">学生：{item.nickname}</View>
                <View className="tea-order-item-content">设备：{
                  (Array.isArray(item.tools) && item.tools.length > 0) ? item.tools.map(item2 => item2.title) : ''
                }</View>
                <View className="tea-order-item-btn at-row at-row__justify--between">
                  <AtButton type='primary' size='small' onClick={() => handleClick('取消订单', item)}>取消订单</AtButton>
                  <AtButton type='primary' size='small' onClick={() => handleClick('订单续时', item)}>订单续时</AtButton>
                  <AtButton type='primary' size='small' onClick={() => handleClick('确认下课', item)}>确认下课</AtButton>
                  <AtButton type='primary' size='small' onClick={() => handleClick('项目完结', item)}>项目完结</AtButton>

                </View>
              </View>
            })
          }
        </View>
      }
      {
        showCon.type === '取消订单' && <OrderCancel cancel={() => handleClick('列表', {})} puid={showCon.data.id} />
      }
      {
        showCon.type === '订单续时' && <OrderCon cancel={() => handleClick('列表', {})} puid={showCon.data.id} />
      }
      {
        showCon.type === '确认下课' && <OrderRend cancel={() => handleClick('列表', {})} puid={showCon.data.id} />
      }
      {
        showCon.type === '项目完结' && <OrderEnd cancel={() => handleClick('列表', {})} puid={showCon.data.id} oid={showCon.data.oid} />
      }
    </View>

  );
};

export default TeacherOrder;
