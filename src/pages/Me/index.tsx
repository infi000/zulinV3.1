/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2024-02-25 11:34:20
 * @FilePath: /zulinV3.1/src/pages/Me/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import MyAvatar from './modules/MyAvatar';
import MyOrder from './modules/MyOrder';
import MySales from './modules/MySales';
import Others from './modules/Others';
import './index.scss';

const Me = () => {
  return (
    <View className='me-wrap'>
      <MyAvatar />

      <Others />
      <View className='order-sales-con'>
        <MyOrder />
        {/* <MySales /> */}
      </View>
    </View>
  );
};

export default Me;
