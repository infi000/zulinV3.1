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
import { AtButton } from "taro-ui";

interface IProps {
  changeTab: (index: any) => void;
}

const TeacherHome = (props: IProps) => {
  const { changeTab } = props;

  return (
    <View>
      <AtButton type='primary' onClick={() => changeTab('我的状态')}>我的状态</AtButton>
      <View style={{ height: "20px" }}></View>
      <AtButton type='primary' onClick={() => changeTab('我的订单')}>我的订单</AtButton>
      <View style={{ height: "20px" }}></View>
      <AtButton type='primary' onClick={() => changeTab('历史订单')}>历史订单</AtButton>
      <View style={{ height: "20px" }}></View>
      <AtButton type='primary' onClick={() => changeTab('工时排班')}>工时排班</AtButton>
    </View>
  );
};

export default TeacherHome;
