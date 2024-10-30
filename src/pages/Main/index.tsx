/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-08-24 23:03:03
 * @FilePath: /zulin/src/pages/Main/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useShareAppMessage } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { getWindowHeight } from '@/utils/app';
import Tabbar from '@/components/Tabbar';
import Me from '@/pages/Me';
import PinPai from '@/pages/PinPai';
import Shipin from '@/pages/Shipin';
import ShequList from '@/pages/Community';
import Reserve from '@/pages/Reserve';
import LeaseListV2 from '@/pages/LeaseListV2';
import ShowYe from '@/pages/Index';
import { ROUTER_NAME_MAP } from '@/constants/index';
import './index.scss';

const Main = (props) => {
  const { nav, currentNavIndex } = useSelector((state) => state.tabbar);
  useShareAppMessage(res => {
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(res.target)
    // }
    return {
      title: '追光少年科学探索',
      path: '/pages/Main/index'
    }
  })

  return (
    <View className='page-wrap'>
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.me && <Me />}
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.index && <ShowYe />}
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.community && <ShequList />}
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.reserve && <LeaseListV2 />}
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.pinpai && <PinPai />}
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.shipin && <Shipin />}

      <Tabbar />
    </View>
  );
};

export default Main;
