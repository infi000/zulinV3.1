/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-07 00:30:25
 * @FilePath: /zulinV3.1/src/pages/Lease/Modules/residue/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';


import './index.scss';

const Residue = (props) => {
    const [timer, setTimer] = useState('');

    useEffect(()=>{
        setTimer(props.timer);
    },[]);

    return (
        <View className={props.status}>
            <View className='Residue-money'></View>
            <View className='Residue-timer'>{timer}</View>
            <View className='Residue-name'>{props.num}</View>
        </View>
    )
}

export default Residue;