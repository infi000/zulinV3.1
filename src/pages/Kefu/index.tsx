/*
 * @Author: infi000_at_home 113079767@qq.com
 * @Date: 2024-05-22 22:25:06
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-09-06 00:26:51
 * @FilePath: \zulinV3.1\src\pages\Kefu\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';

import { kefu, } from '@/static/images/index';
import './index.scss';
const Kefu = () => {
  return (
    <View className="photo-wrap">
      <Image src={kefu} style={{ 'width': '100%','marginTop':'20%' }} mode="widthFix" />
      {/* <Image src={kefu1} style={{ 'width': '100%','marginTop':'20%' }} mode="aspectFit" /> */}
      {/* <Image src={kefu2} style={{ 'width': '100%','marginTop':'20%' }} mode="aspectFit" /> */}
    </View>
  );
};

export default Kefu;
