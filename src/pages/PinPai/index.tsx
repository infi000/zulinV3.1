/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-12-02 20:24:37
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-07 02:08:32
 * @FilePath: /zulinv2/src/subPackages/Paidui/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect,useDidShow } from '@tarojs/taro';
import { View, ScrollView, Image } from '@tarojs/components';
import { AtList, AtListItem, AtCard } from 'taro-ui'
import { HOST } from '@/config/api';
import './index.scss';

const PinPai = () => {


    return (
        <View className='Paidui-warp'>
            <Image style={{ width: '100%'}}  src={HOST + '/Public/static/images/shuoming/001.png'} mode="widthFix" />
            <Image style={{ width: '100%'}}  src={HOST + '/Public/static/images/shuoming/002.png'} mode="widthFix" />
            <Image style={{ width: '100%'}}  src={HOST + '/Public/static/images/shuoming/003.png'} mode="widthFix" />
            <Image style={{ width: '100%'}}  src={HOST + '/Public/static/images/shuoming/004.png'} mode="widthFix" />
            <Image style={{ width: '100%'}}  src={HOST + '/Public/static/images/shuoming/005.png'} mode="widthFix" />
            <Image style={{ width: '100%'}}  src={HOST + '/Public/static/images/shuoming/006.png'} mode="widthFix" />
            <Image style={{ width: '100%'}}  src={HOST + '/Public/static/images/shuoming/007.png'} mode="widthFix" />
     
        </View>
    );
}

export default PinPai;