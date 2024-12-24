/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:12
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-12-17 00:55:41
 * @FilePath: /zulinV3.1/src/pages/Me/modules/MyOrder.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect, useRef, useDidShow } from "@tarojs/taro";
import { AtButton, AtInput, AtList, AtListItem, AtRadio, AtTabs, AtTabsPane } from "taro-ui";

import { View } from "@tarojs/components";
import "./index.scss";
import FormVer from "./modules/FormVer";
import TeacherStatus from "./modules/TeacherStatus";
import TeacherOrder from "./modules/TeacherOrder";
import TeacherWorkList from "./modules/TeacherWorkList";
import TeacherHome from "./modules/TeacherHome";
import TeacherHistoryOrder from "./modules/TeacherHistoryOrder";

const defaultForm: { [key: string]: any } = {};

type TConType = '认证表单' | '老师主页' | '我的订单' | '工时安排' | '我的状态' | '历史订单'
const TeacherVer = () => {
  var teacherToken = Taro.getStorageSync('teacherToken');
  const [showCon, setShowCon] = useState<TConType>('认证表单')

  const handleChange = (key: any) => {
    setShowCon(key);
  };
  useDidShow(() => {
    setShowCon(teacherToken ? '老师主页' : '认证表单')
  })
  useEffect(() => {
    setShowCon(teacherToken ? '老师主页' : '认证表单')
  }, [teacherToken])


  return (
    <View className="teacherVer-wrap">
      <View className='myvip-wrap'>
        {
          showCon === '认证表单' && <FormVer />
        }
        {
          showCon === '老师主页' && <TeacherHome changeTab={handleChange} />
        }
        {
          showCon === '我的状态' && <TeacherStatus />
        }
        {
          showCon === '工时安排' &&<TeacherWorkList />
        }
        {
          showCon === '我的订单' && <TeacherOrder />
        }
        {
          showCon === '历史订单' && <TeacherHistoryOrder />
        }
      </View>
    </View>
  );
};

export default TeacherVer;
