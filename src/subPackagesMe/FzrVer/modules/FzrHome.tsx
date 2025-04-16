/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:12
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-12-17 00:55:41
 * @FilePath: /zulinV3.1/src/pages/Me/modules/MyOrder.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect, useDidShow } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "../index.scss";
import { AtButton } from "taro-ui";

interface IProps {
  changeTab: (index: any) => void;
}

const FzrHome = (props: IProps) => {
  const { changeTab } = props;

  return (
    <View className="teacher-home-wrap">
      <AtButton className="teacher-home-btn" type='secondary' onClick={() => changeTab('开店检查')}>开店检查</AtButton>
      <AtButton className="teacher-home-btn" type='secondary' onClick={() => changeTab('闭店检查')}>闭店检查</AtButton>
    </View>
  );
};

export default FzrHome;
